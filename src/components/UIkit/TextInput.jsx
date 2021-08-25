import React from 'react';
import TextField from "@material-ui/core"

const TextInput = (props) => {
    return (
        <TextField 
        fullWidth={props.fullWidth} //booleanでtrue,falseによってwidthを変更することができる
        label={props.label}
        margin="dense"
        multiline={props.multiline}
        required={props.required}
        rows={props.required}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        />
    )
}

export default TextInput;