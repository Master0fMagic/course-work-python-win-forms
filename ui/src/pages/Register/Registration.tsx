import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

import cl from './Registration.module.css';
import {useDispatch} from "react-redux";
import {login} from "../../redux/store/user/slice";
import {useNavigate} from "react-router";
import {PATH} from "../../routes";

const Registration = () => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

    const handleChangeFirst = (e) => {
        setFirstName(e.target.value);
    }

    const handleChangeLast = (e) => {
        setLastName(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePhone = (e) => {
        setPhoneNumber(e.target.value);
    }


    const handleChangePass = (e) => {
        setPassword(e.target.value);
    }

    const register = () => {
        console.log("register")
    }

    return (
        <Box className={cl.container}>
            <Box className={cl.window}>
                <Box className={cl.content}>
                    <Typography className={cl.text}>Registration</Typography>
                    <Box className={cl.inputs__content}>
                        <TextField variant={"filled"} onChange={handleChangeFirst} label={"FirstName"} value={firstName} placeholder={"Введіть ім'я"}/>
                        <TextField variant={"filled"} onChange={handleChangeLast} label={"LastName"} value={lastName} placeholder={"Введіть прізвище"}/>
                        <TextField variant={"filled"} onChange={handleChangeEmail} label={"Email"} value={email} placeholder={"Введіть електронну пошту"}/>
                        <TextField variant={"filled"} onChange={handleChangePass} label={"Password"} value={password} placeholder={"Введіть пароль"}/>
                        <TextField variant={"filled"} onChange={handleChangePhone} label={"Phone"} value={phoneNumber} placeholder={"Введіть номер телефону"}/>
                    </Box>
                    <Box width={"30%"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                        <Button sx={{width:"100%", background:"var(--main)", "&:hover":{background:"#5d5a73"}, fontWeight:"600"}} variant={"contained"} disabled={password.length < 1 || lastName.length < 1 || firstName.length < 1 || phoneNumber.length < 1} onClick={register}>
                            Sign-up
                        </Button>
                        <Box onClick={e=>navigate(PATH.AUTHORIZATION)} sx={{fontSize:"14px", cursor:"pointer", "&:hover":{color:"red"}}}>
                            Вже маєте акаунт?
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Registration;