import React from 'react'
import { Switch, Route } from 'react-router'
import { LoginContainer } from './containers'
import {Login, Home} from'./templates'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/login"} component={LoginContainer} />
            <Route exact path={"(/)?"} component={Home} />     {/* スラッシュがあってもなくてもHOME画面を表示させる */}
        </Switch>
    )
}
export default Router