import React from 'react'
import { Switch, Route } from 'react-router'
import {Login, Home} from'./templates'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"(/)?"} component={Home} />     {/* スラッシュがあってもなくてもHOME画面を表示させる */}
        </Switch>
    )
}
export default Router