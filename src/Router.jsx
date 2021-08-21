import React from 'react'
import { Switch, Router } from 'react-router'
import {Login, Home} from'./template'

const Router = () => {
    return (
        <switch>
            <Router exact path={"/login"} component={Login} />
            <Router exact path={"(/)?"} component={Home} />     {/* スラッシュがあってもなくてもHOME画面を表示させる */}
        </switch>
    )
}
export default Router