import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    "button": {
        backgroundColor: "#4dd0e1",
        color: '#000',
        fontSize: 16,
        height: 48,
        marginBottom: 16,
        width: 256,
    }
})

const PrimaryButton = (props)=> {
    const classes = useStyles();

    return(
        <button className={classes.button}variant="contained" onClick={()=> props.onClick()}>
            {props.label}
        </button>
    )
}

export default PrimaryButton;