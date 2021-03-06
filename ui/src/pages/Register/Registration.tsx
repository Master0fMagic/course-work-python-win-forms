import React, {useState} from 'react';
import {Alert, AlertProps, Box, Button, Grid, IconButton, TextField, Typography} from "@mui/material";

import cl from './Registration.module.css';
import {useDispatch} from "react-redux";
import {login, setOrders} from "../../redux/store/user/slice";
import {useNavigate} from "react-router";
import {PATH} from "../../routes";
import {Api, Register} from "../../api/Api";
import CloseIcon from "@mui/icons-material/Close";

const Registration = () => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [messageHandler, setMessageHandler] = useState({type: "" as AlertProps["severity"], message: ""});

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
        const body = {email: email, first_name: firstName, last_name: lastName, password: password, repeated_password: password, phone: phoneNumber} as Register
        const promises = [];
        const api = new Api();
        const promise1 = new Promise((resolve, reject) => {
            api.register(body).then(res => {
                setMessageHandler({type: "success", message: "Registered."})
                resolve(true);
            }).catch(err => {
                setMessageHandler({type: "error", message: err})
                reject(err);
            });
        })

        promises.push(promise1);

        Promise.all(promises).then().catch();
    }

    return (
        <Box className={cl.container}>
            <Grid sx={{marginBottom: "30px"}} item xs={12}>
                {messageHandler.message.length > 0 && <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setMessageHandler({...messageHandler, message: ""})
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    severity={messageHandler.type}>{messageHandler.message}
                </Alert>}
            </Grid>
            <Box className={cl.window}>
                <Box className={cl.content}>
                    <Typography className={cl.text}>Реєстрація</Typography>
                    <Box className={cl.inputs__content}>
                        <TextField variant={"filled"} onChange={handleChangeFirst} label={"Ім'я"} value={firstName} placeholder={"Введіть ім'я"}/>
                        <TextField variant={"filled"} onChange={handleChangeLast} label={"Прізвище"} value={lastName} placeholder={"Введіть прізвище"}/>
                        <TextField variant={"filled"} onChange={handleChangeEmail} label={"Email"} value={email} placeholder={"Введіть електронну пошту"}/>
                        <TextField variant={"filled"} onChange={handleChangePass} label={"Пароль"} value={password} placeholder={"Введіть пароль"}/>
                        <TextField variant={"filled"} onChange={handleChangePhone} label={"Номер телефону"} value={phoneNumber} placeholder={"Введіть номер телефону"}/>
                    </Box>
                    <Box width={"30%"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                        <Button sx={{width:"100%", background:"var(--main)", "&:hover":{background:"#5d5a73"}, fontWeight:"600"}} variant={"contained"} disabled={password.length < 1 || lastName.length < 1 || firstName.length < 1 || phoneNumber.length < 1} onClick={register}>
                            Зареєструватися
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