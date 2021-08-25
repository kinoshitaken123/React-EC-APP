import {signInAction} from "./actions";
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase/index'

export const signIn = () => {
    return async (dispatch, getState) => {
        const state = getState()  //メソッドを呼び出す際はカッコが必要
        const IsSignedIn = state.users.IsSignedIn //store   isSignedInのデータを取得している

        if (!IsSignedIn) {
            const url ='https://api.github.com/users/kinoshitaken123'

            const response = await fetch(url)
                                 .then(res => res.json())
                                 .catch(() => null)
            const username = response.login
            
            dispatch(signInAction({
                IsSignedIn: true,
                uid: "00001",
                username: username
            }))
            dispatch(push('/'))
        }
    }
}

export const signUp = (username,email,password,confirmPassword) => {
    return async (dispath) => {
    // Validation
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("必須項目が見入力です")
        return false
     }
     if (password !== confirmPassword) {
         alert("パスワードが一致しません。もう一度お試しください。")
         return false
     }
     return auth.createUserWithEmailAndPassword(email, password)
     .then(result =>{
         const user = result.user

         if (user) {
             const uid = user.uid
             const timestamp = FirebaseTimestamp.now()

             const userInitialData ={
                 created_at: timestamp,
                 email: email,
                 role: "customer",
                 uid: uid,
                 updated_at: timestamp,
                 username: username
             }
         }

         db.collection('user').doc(uid).set(userInitialData)
           .then(() => {
               dispath(push(push ('/')))
           })
     })
    }
}