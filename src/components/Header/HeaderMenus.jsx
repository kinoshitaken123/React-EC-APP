import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";

const HeaderMenus = (props) => {
    return (
        <>
          <IconButton>
            <Badge badgeContent={3} color="secondary">
              <ShoppingCartIcon />
            </Badge>  
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton onClick={(event) => props.handleDrawerToggle(event, true)}>
            <MenuIcon />
          </IconButton>
        </>
    )
}

export default HeaderMenus;