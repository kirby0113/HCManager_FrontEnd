import {useState} from "react";

import "./Header.css";
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {IconButton} from "material-ui";
import Navigation from "./Navigation";
const Header = () => {
    const [openNavigation,setOpenNavigation] = useState(false);

    return (
        <div>
        <Navigation open={openNavigation} setOpenNavigation={setOpenNavigation}></Navigation>
        <AppBar position="static" className="Header" onLeftIconButtonTouchTap={() => setOpenNavigation(true)}>
        <IconButton 
                color="inherit"
                aria-label="Menu"
                onClick={() => setOpenNavigation(true)}>
		        <MenuIcon className="MenuIcon"></MenuIcon>
            </IconButton>
            <Typography className="Title" variant="h3" color="inherit">
                    HelloC Manager
                </Typography>
        </AppBar>
        </div>
    )
}

export default Header;