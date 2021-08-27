import {signInAction} from "./actions";
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase/index'

export const listenAuthState = () => {
    return async (dispath) => {
        return auth.onAuthStateChanged( user => {
            if (user) {
            const uid = user.uid;

            db.collection('users').doc(uid).get()
            .then( snapshort => {
                const data = snapshort.data()
      
                dispath(signInAction({
                    isSignedIn: true,
                    role: data.role,
                    uid: uid,
                    username: data.username
                })) 
        
                dispath(push('/'))
               })
            } else {
                dispath (push('/signin'))
            }
        })
    }
}

export const signIn = (email,password) => {
    return async (dispatch) => {
        if (email === "" || password === "" ) {
            alert("必須項目が未入力です")
            return false
         }

         auth.signInWithEmailAndPassword(email, password)
             .then(result => {
                 const user = result.user

                 if (user) {
                     const uid = user.uid
                     db.collection('users').doc(uid).get()
                       .then(snapshot => {
                           const data = snapshot.data()

                           dispatch(signInAction({
                               isSignedIn: true,
                               role: data.role,
                               uid: uid,
                               username: data.username
                           }))
                           dispatch(push('/'))
                       })
                 }
             })
    }
}

export const signUp = (username,email,password,confirmPassword) => {
    return async (dispath) => {
    // Validation
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("必須項目が未入力です")
        return false
     }
     if (password !== confirmPassword) {
         alert("パスワードが一致しません。もう一度お試しください。")
         return false
     }

     return auth.createUserWithEmailAndPassword(email, password)
     .then(result => {
         const user = result.user;

         if (user) {
             const uid = user.uid;
             const timestamp = FirebaseTimestamp.now();

             const userInitialData = {
                 created_at: timestamp,
                 email: email,
                 role: "customer",
                 uid: uid,
                 updated_at: timestamp,
                 username: username
             }
             db.collection('users').doc(uid).set(userInitialData)
             .then(() => {
              dispath(push(push ('/')))
          })
         }      
     })
    }
}