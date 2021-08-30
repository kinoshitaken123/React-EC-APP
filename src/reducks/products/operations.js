import {db, FirebaseTimestamp} from "../../firebase";
import {push} from 'connected-react-router';
import {deleteProductAction, fetchProductsAction} from "./actions";

const productsRef = db.collection('products')

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
      productsRef.doc(id).delete()
        .then(() => {
          const prevProducts = getState().products.list
          const nextProducts = prevProducts.filter(product => product.id !== id)
          dispatch(deleteProductAction(nextProducts))
        })
    }
  }

export const fetchProducts = () => {
    return async (dispatch) => {
      productsRef.orderBy('updated_at', 'desc').get()
       .then(snapshots => {
            const productList = []
            snapshots.forEach(snapshot => {
            const product = snapshot.data();
            productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
     })
    }
}

export const orderProduct = (productsInCart, amount) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid);
        const timestamp = FirebaseTimestamp.now();

        let 
            products = {},
            soldOutProducts = [];
        
        const batch = db.batch();
        for (const product of productsInCart) {
            const snapshot = await productsRef.doc(product.productId).get();
            const stocks = snapshot.data().stocks;

        // Create a new array of the product stocks
        const updateStocks = stocks.map(stock => {    
            if (stock.stock === product.size) {
                if (stock.quantity === 0) {
                  soldOutProducts.push(product.name);
                  return stock
                }
                return {
                    stock: stock.stock,
                  quantity: stock.quantity - 1
                }
              } else {
                return stock
              }
          })
          products[product.productId] = {
            id: product.productId,
            images: product.images,
            name: product.name,
            price: product.price,
            stock: product.stock
          }

          batch.update(
              productsRef.doc(product.productId), 
              {stocks: updateStocks}
            );

          batch.delete(
            userRef.collection('cart').doc(product.cartId)
            );
        }
        if (soldOutProducts.length > 0) {
           const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
           alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため注文処理を中断しました。');
           return false
        } else {
            batch.commit()
            .then(() => {
            // 注文履歴データを作成
            const orderRef = userRef.collection('orders').doc();
            const date = timestamp.toDate();

            // 配送日を3日後に設定
            const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

            const history = {
                amount: amount,
                created_at: timestamp,
                id: orderRef.id,
                products: products,
                shipping_date: shippingDate,
                updated_at: timestamp
              };

              orderRef.set(history)
              dispatch(push('/order/complete'))
            }).catch(() =>{
             alert('注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。');
             return false  
            })
        }
    }
}

export const saveProduct = (id,name,description,category,price,images, stocks) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data ={
            category: category,
            description: description,
            images: images,
            name: name,
            price: parseInt(price, 10), //メソッド　文字列を数字に変更して10進数で表示
            stocks: stocks,
            updated_at: timestamp
        }

        if (id === "") {       
            const ref = productsRef.doc()  //自動でidを採番する
            id  = ref.id             //採番されたidを取得できる
            data.id   = id
            data.created_at = timestamp
        }

        return productsRef.doc(id).set(data, {merge: true})
               .then(() => {
                   dispatch(push('/'))
               }).catch((error) => {  //例外処理
                   throw new Error (error)
               })

    }
}