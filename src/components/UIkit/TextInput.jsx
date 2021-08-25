import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";

const TextInput = (props) => {
    return (
        <TextField 
        fullWidth={props.fullWidth}
        label={props.label}
        margin="dense"
        multiline={props.multiline}
        required={props.required}
        rows={props.rows}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        />
    )
}

export default TextInput;