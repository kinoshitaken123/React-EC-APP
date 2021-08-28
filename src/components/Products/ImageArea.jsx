import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    icon: {
        height:48,
        width: 48
    }
})

const ImageArea = (props) => {
    const classes = useStyles();


    return (
        <div>
            <div className= "u-text-right">
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                       <FolderSharedIcon />
                       <input className="u-display-none" type="file" type="file" id="image"/> 
                    </label>
                </IconButton>
            </div>
        </div>

    )
}

export default ImageArea