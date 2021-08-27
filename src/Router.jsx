import React from 'react'
import { Switch, Route } from 'react-router'
import {Home, SignIn,SignUp} from './templates'
import Auth from './Auth'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />

            <Auth> 
                {/* ログインしたページ */}
               <Route exact path={"(/)?"} component={Home} />     {/* スラッシュがあってもなくてもHOME画面を表示させる */}
            </Auth>
        </Switch>
    )
}
export default Router