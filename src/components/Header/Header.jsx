import React, {useCallback, useState} from 'react';
import {createStyles, makeStyles}     from '@material-ui/core/styles';
import AppBar                         from '@material-ui/core/AppBar';
import Toolbar                        from '@material-ui/core/Toolbar';
import {useDispatch, useSelector}     from "react-redux";
import {getIsSignedIn}                  from "../../reducks/users/selectors";

import {HeaderMenu, ClosableDrawer}   from "./index";
import {push}                         from "connected-react-router"

const useStyles = makeStyles({
        root: {
            flexGrow: 1,
        },
        menuBar: {
            backgroundColor: "#fff",
            color: '#444',
        },
        toolbar: {
            margin: '0 auto',
            maxWidth: 1024,
            width: '100%'
        },
        iconButtons: {
            margin: '0 0 0 auto'
        }
    });

const Header = () => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
               <Toolbar className={classes.toolbar}>
               </Toolbar>
            </AppBar>
        </div>
    )
};

export default Header;