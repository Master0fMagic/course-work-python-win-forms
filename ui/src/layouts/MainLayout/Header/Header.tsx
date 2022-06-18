import React, {useEffect} from 'react';
import {Badge, Box, IconButton} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import cl from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {SelectUserItems} from "../../../redux/store/user/selector";
import {logout, setItems} from "../../../redux/store/user/slice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = ({setModal}) => {

    const items = useSelector(SelectUserItems);

    const dispatch = useDispatch();

    const logoutAct = () => {
        dispatch(logout());
    }

    return (
        <Box position={"relative"} marginBottom={"15px"} width={"100%"} height={"5vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            {/*<Box className={cl.btn} sx={{marginRight:"10px"}}>*/}
            {/*    Create order*/}
            {/*</Box>*/}
            {/*<Box className={cl.btn}>*/}
            {/*    Order list*/}
            {/*</Box>*/}
            <Box className={cl.items}>
                <IconButton  onClick={e=>setModal(true)}>
                    <Badge badgeContent={items.items.length} color="success">
                        <ShoppingCartIcon color="action" />
                    </Badge>
                </IconButton>
                <IconButton onClick={logoutAct}>
                        <ExitToAppIcon color="action"/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;