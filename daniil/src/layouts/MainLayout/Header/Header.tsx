import React, {useEffect} from 'react';
import {Badge, Box, IconButton} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import cl from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {SelectUserItems} from "../../../redux/store/user/selector";
import {setItems} from "../../../redux/store/user/slice";

const Header = ({setModal}) => {

    const items = useSelector(SelectUserItems);

    return (
        <Box position={"relative"} marginBottom={"15px"} width={"100%"} height={"5vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            {/*<Box className={cl.btn} sx={{marginRight:"10px"}}>*/}
            {/*    Create order*/}
            {/*</Box>*/}
            {/*<Box className={cl.btn}>*/}
            {/*    Order list*/}
            {/*</Box>*/}
            <Box onClick={e=>setModal(true)} className={cl.items}>
                <IconButton>
                    <Badge badgeContent={items.items.length} color="success">
                        <ShoppingCartIcon color="action" />
                    </Badge>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;