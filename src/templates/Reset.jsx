import React,{useState,useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {PrimaryButton,TextInput} from '../components/UIkit';
import {resetPassword} from "../reducks/users/operations";
import {push} from "connected-react-router"

const Reset = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

    const inputEmail = useCallback((event)=>{
        setEmail(event.target.value)

    },[setEmail]);     
  
    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">パスワードのリセット</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"Reset Password"}
                    onClick={() => dispatch(resetPassword(email))}
                />
                <div className="module-spacer--medium" />
                <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
            </div>
        </div>
    );
}

export default Reset;