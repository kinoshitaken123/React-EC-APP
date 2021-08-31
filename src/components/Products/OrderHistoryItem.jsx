import React from 'react';
import Divider from "@material-ui/core/Divider";
import {OrderedProducts} from "./index";
// import {datetimeToString, dateToString} from "../../function/common";
import {TextDetail} from "../UIkit";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";

// const useStyles = makeStyles((theme) => ({
//     orderList: {
//         background: theme.palette.grey["100"],
//         margin: '0 auto',
//         padding: 32,
//         [theme.breakpoints.down('md')]: {
//             width: '100%'
//         },
//         [theme.breakpoints.up('md')]: {
//             width: 768
//         }    
//     }
// }));

const datetimeToString = (date) => {
    return date.getFullYear() + '-'
    + ('00' + (date.getMonth()+1)).slice(-2) + "-"
    + ('00' + date.getDate()).slice(-2)+ " "
    + ('00' + date.getHours()).slice(-2) + ":"
    + ('00' + date.getMinutes()).slice(-2) + ":"
    + ('00' + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
    return date.getFullYear() + '-'
        + ('00' + (date.getMonth()+1)).slice(-2) + "-"
        + ('00' +  date.getDate()).slice(-2)
}

const OrderHistoryItem = (props) => {
    const order = props.order;
    const orderedDatetime = datetimeToString(order.updated_at.toDate())
    const shippingDate = dateToString(props.order.shipping_date.toDate())
    const Price = "¥" + order.amount.toLocaleString()
    const products = props.order.products

    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"注文ID"} value={order.id} />
            <TextDetail label={"注文日時"} value={orderedDatetime} />
            <TextDetail label={"発送予定日"} value={shippingDate} />
            <TextDetail label={"注文金額"} value={Price}/>
            {/* {Object.keys(products).length > 0 && (
                <OrderedProducts products={products} />
            )} */}
            <div className="module-spacer--extra-extra-small" />
            <Divider />
        </div>
    );
};

export default OrderHistoryItem;