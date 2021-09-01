import React, {useCallback, useEffect, useState} from 'react'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {TextInput} from "../UIkit/index";
import {push} from 'connected-react-router';
import {useDispatch, useSelector} from "react-redux";
import{signOut} from "../../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 256,
            flexShrink: 0,
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256,
    },
    searchField: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 32
    }
 }),
);

const ClosableDrawer = (props) => {
    const classes = useStyles();
    const {container} = props;
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState("");

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    }, [setKeyword]);

    const selectMenu = (event, path) => {
        dispatch(push(path));
        props.onClose(event);
    };

    const menus = [
        {func: selectMenu, label: "商品登録",    icon: <AddCircleIcon/>, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴",    icon: <HistoryIcon/>,   id: "history",  value: "/order/history"},
        // {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>,    id: "profile",  value: "/user/mypage"},
    ]

    return (
        <nav className={classes.drawer}>
          <Drawer
            container={container}
            variant="temporary"
            anchor="right"
            open={props.open}
            onClose={(event) => props.onClose(event, false)}
            classes={{paper: classes.drawerPaper}}
            ModalProps={{keepMounted: true}} // Better open performance on mobile.
          >
            <div
              onClose={(event) => props.onClose(event, false)}
              onKeyDown={(event) => props.onClose(event, false)}
            >
                <div className={classes.searchField}>
                    <TextInput
                        fullWidth={false} label={"キーワードを入力"} multiline={false}
                        onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </div>   
                <Divider /> 
                <List>
                    {menus.map(menu => (
                        // ((isAdministrator && menu.id === "register") || menu.id !== "register") && (
                            <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                            // )
                        ))}
                    <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                       <ListItemIcon>
                          <ExitToAppIcon/>
                       </ListItemIcon>
                       <ListItemText primary="Logout" />
                   </ListItem>    
                </List>
            </div>
          </Drawer>
        </nav>    
    )
}

export default ClosableDrawer;