import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

import cl from './Authorization.module.css';
import {useDispatch} from "react-redux";
import {login} from "../../redux/store/user/slice";
import {PATH} from "../../routes";
import {useNavigate} from "react-router";

const Authorization = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginU, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
    }

    const handleChangePass = (e) => {
        setPassword(e.target.value);
    }

    const authorize = () => {
        dispatch(login({login: loginU, password: password}));
    }

    return (
        <Box className={cl.container}>
            <Box className={cl.window}>
                <Box className={cl.content}>
                    <Typography className={cl.text}>Authorization</Typography>
                    <Box className={cl.inputs__content}>
                        <TextField variant={"filled"} sx={{marginRight:"15px"}} onChange={handleChangeLogin} label={"Login"} value={loginU} placeholder={"Input your login"}/>
                        <TextField variant={"filled"} onChange={handleChangePass} label={"Password"} value={password} placeholder={"Input your password"}/>
                    </Box>
                    <Box width={"30%"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                        <Button sx={{width:"100%", background:"var(--main)", "&:hover":{background:"#5d5a73"}, fontWeight:"600"}} variant={"contained"} disabled={password.length < 1 || loginU.length < 1} onClick={authorize}>
                            Login
                        </Button>
                        <Box onClick={e=>navigate(PATH.REGISTER)} sx={{fontSize:"14px", cursor:"pointer", "&:hover":{color:"red"}}}>
                            Doesnt have account?
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Authorization;