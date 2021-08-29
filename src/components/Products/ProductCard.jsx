import React, {useState} from 'react';
import {push} from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import {useDispatch, useSelector} from "react-redux";
import {getUserRole} from "../../reducks/users/selectors";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteProduct} from "../../reducks/products/operations";

// materialuiのthemeを指定することができる
const useStyles = makeStyles((theme) => ({
    root: {
        //sm スマホ
        [theme.breakpoints.down('sm')]: {
            margin: 8,
             //スマホ画面で２画面にしたい
            width: 'calc(50% - 16px)'
        },
        //sm スマホ以上
        [theme.breakpoints.up('md')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        }
    },
        content: {
            display: 'flex',
            padding: '16 8',
            textAlign: 'left',
            //sm 擬似要素
            '&:last-child': {
                paddingBottom: 16
            }
        },
        icon: {
            marginRight: 0,
            marginLeft: 'auto'
        },
        media: {
            height: 0,
            paddingTop: '100%'
        },
        price: {
            color: theme.palette.secondary.blue,
            fontSize: 16
        },
    //     productName: {
    //         boxOrient: 'vertical',
    //         display: '-webkit-box',
    //         fontSize: 14,
    //         lineHeight: '18px',
    //         overflow: 'hidden',
    //         [theme.breakpoints.down('sm')]: {
    //             height: 36,
    //             lineClamp: 2,
    //         },
    //         [theme.breakpoints.up('md')]: {
    //             height: 18,
    //             lineClamp: 1,
    //         }
    // }    
}));

const ProductCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    // const selector = useSelector(state => state);
    // const userRole = getUserRole(selector)
    // const isAdministrator = (userRole === "administrator");

    const images = (props.images.length > 0) ? props.images : [{path: NoImage}];
    // 三桁区切りをするメソッド　toLocaleString
    const price = props.price.toLocaleString();
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.images[0].path}
                // clickしたら詳細画面に遷移
                title=""
                onClick={() => dispatch(push('/product/'+ props.id))}
            />
            <CardContent className={classes.content}>
                <div onClick={() => dispatch(push('/product/'+ props.id))}>
                    <Typography color="textSecondary" component="p">
                        {props.name}
                    </Typography>
                    <Typography className={classes.price} component="p">
                        ¥{price}
                    </Typography>
                </div>
                {/* {isAdministrator && (
                    <> */}
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            // id="menu-appbar"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    dispatch(push('/product/edit/'+props.id))
                                    handleClose()
                                }}
                            >
                                編集する
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    dispatch(deleteProduct(props.id))
                                    handleClose()
                                }}
                            >
                                削除する
                            </MenuItem>
                        </Menu>
                    {/* </>
                )} */}
            </CardContent>
        </Card>
    );
}

export default ProductCard