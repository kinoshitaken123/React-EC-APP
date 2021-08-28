import { db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router'

const productsRef = db.collection('products')

export const saveProduct = (name,description,category,price) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data ={
            category: category,
            description: description,
            name: name,
            price: parseInt(price, 10), //メソッド　文字列を数字に変更して10進数で表示
            updated_at: timestamp
        }

        const ref = productsRef.doc()  //自動でidを採番する
        const id  = ref.id             //採番されたidを取得できる
        data.id   = id
        data.created_at = timestamp

        return productsRef.doc(id).set(data)
               .then(() => {
                   dispatch(push('/'))
               }).catch((error) => {  //例外処理
                   throw new Error (error)
               })

    }
}