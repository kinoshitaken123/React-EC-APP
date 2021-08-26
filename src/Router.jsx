import React from 'react'
import { Switch, Route } from 'react-router'
import {Home, SignIn,SignUp} from './templates'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"(/)?"} component={Home} />     {/* スラッシュがあってもなくてもHOME画面を表示させる */}
        </Switch>
    )
}
export default Router