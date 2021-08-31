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