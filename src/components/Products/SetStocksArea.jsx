import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})

const SetStocksArea = (props) => {
    const classes = useStyles();

    const [index, setIndex] = useState(0),
          [stock, setStock] = useState(""),
          [quantity, setQuantity] = useState(0);

    const inputStock = useCallback((event) => {
        setStock(event.target.value)
    }, [setStock]);

    const inputQuantity = useCallback((event) => {
        setQuantity(event.target.value)
    }, [setQuantity]);

    const addStock = (index, stock, quantity) => {
        if (stock === "" || quantity === 0) {
            // Required input is blank
            return false
        } else {
            if (index === props.stocks.length) {
                props.setStocks(prevState => [...prevState, {stock: stock, quantity: quantity}]);
                setIndex(index + 1);
                setStock("");
                setQuantity(0)
            } else {
                const newStocks = props.stocks;
                newStocks[index] = {stock: stock, quantity: quantity};
                props.setStocks(newStocks);
                setIndex(newStocks.length);
                setStock("");
                setQuantity(0);
            }
        }
    }
    // 編集
    const editSize = (index, stock, quantity) => {
        setIndex(index)
        setStock(stock)
        setQuantity(quantity)
    }
 　　// 削除
    const deleteStock = (deleteIndex) => {
        const newStocks = props.stocks.filter((item, index) => index !== deleteIndex)
        props.setStocks(newStocks);
    }

    useEffect(() => {
        setIndex(props.stocks.length)
    },[props.stocks.length])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>在庫</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.stocks.length > 0 && (
                            props.stocks.map((item, index) => (
                                <TableRow key={item.size}>  
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className={classes.iconCell}>
                                    <IconButton className={classes.iconCell} onClick={() => editSize(index, item.stock, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => deleteStock(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={"在庫"} multiline={false} required={true}
                        onChange={inputStock} rows={1} value={stock} type={"text"}
                    />
                    <TextInput
                        fullWidth={false} label={"数量"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} value={quantity} type={"number"}
                    />
                </div>
                <IconButton className={classes.iconCell} onClick={() => addStock(index, stock, quantity)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
            <div className="module-spacer--small"/>
        </div>
    );
};

export default SetStocksArea;
