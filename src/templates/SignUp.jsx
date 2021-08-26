import React,{useState,useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {PrimaryButton,TextInput} from '../components/UIkit';
import {signUp} from "../reducks/users/operations";

const SignUp = () => {
    
    const dispatch = useDispatch()

    const [username, setUsername] = useState(""), //const宣言　複数行可能
          [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [confirmPassword,setConfirmPassword] = useState("");

    const inputUsername = useCallback((event)=>{
        setUsername(event.target.value)

    },[setUsername]);    
    
    const inputEmail = useCallback((event)=>{
        setEmail(event.target.value)

    },[setEmail]);     

    const inputPassword = useCallback((event)=>{
        setPassword(event.target.value)

    },[setPassword]);     

    const inputConfirmPassword  = useCallback((event)=>{
        setConfirmPassword(event.target.value)

    },[setConfirmPassword]);     

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">アカウント登録</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={1} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード（半角英数字で6文字以上）"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={"パスワードの再確認"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"アカウントを登録する"}
                    onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
                />
            </div>
        </div>
    );
};

export default SignUp;