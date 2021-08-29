import React from 'react'
import { Switch, Route } from 'react-router'
import {Productlist, ProductEdit, Reset, SignIn, SignUp} from './templates'
import Auth from './Auth'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signin/reset"} component={Reset} />

            <Auth> 
                {/* ログインしたページ */}
               <Route exact path={"(/)?"} component={Productlist} />  {/* スラッシュがあってもなくてもHOME画面を表示させる */}
                {/* 正規表現 */}
               <Route path="/product/edit(/:id)?" component={ProductEdit} />
            </Auth>
        </Switch>
    )
}
export default Router