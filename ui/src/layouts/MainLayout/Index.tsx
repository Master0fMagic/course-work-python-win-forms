import {Outlet, useLocation} from "react-router-dom";
import {
    Alert,
    AlertProps,
    Box,
    Button,
    Grid,
    IconButton,
    Modal,
    Paper,
    Table, TableBody, TableCell, TableContainer,
    TableHead,
    TableRow, Tooltip
} from "@mui/material";
import Header from "./Header/Header";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import cl from './Layout.module.css';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SelectUserItems} from "../../redux/store/user/selector";
import {setItems, setOrders} from "../../redux/store/user/slice";
import {useNavigate} from "react-router";
import {PATH} from "../../routes";
import {Api, PostFood, PostOrder} from "../../api/Api";
import CloseIcon from "@mui/icons-material/Close";

const Layout = () => {

    const [modal, setModal] = useState(false);

    const cont = useSelector(SelectUserItems);
    const items = cont.items;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageHandler, setMessageHandler] = useState({type: "" as AlertProps["severity"], message: ""});

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const makeOrder = () => {
        const api = new Api();

        const order = getGroups();

        const modifiedOrder = order.map(x => {
            return {
                food_id: x.id,
                count: x.count
            } as PostFood
        })

        api.createOrder({place_id: cont.idShop, items: modifiedOrder} as PostOrder).then(res => {
            api.getHistory().then(res => {
                dispatch(setOrders(res.data.history));
                setMessageHandler({type: "success", message: "Заказ успішно сформовано!"});
                clear();
            }).catch(err => {
                setMessageHandler({type: "success", message: err});
            });
        }).catch(err => {
            setMessageHandler({type: "success", message: err});
            console.log(err);
        })
    }

    const clear = () => {
        dispatch(setItems({idShop: null, items: []}));
    }

    const goToCreate = () => {
        setModal(false);
        navigate(PATH.CREATE);
    }

    useEffect(()=>{
        if(messageHandler.message.length > 0)
        {
            setTimeout(()=>{
                setMessageHandler({...messageHandler, message: ""})
            }, 3000)
        }
    }, [messageHandler.message])

    const getGroups = () => {
        const uniqueItems = [...new Set(items.map(x => x.name))];

        return uniqueItems.map(i => {
            const numbs = items.filter(x => x.name === i).length;
            const item = items.filter(x => x.name === i)[0];
            return {id: item.id, name: i, description: item.description, price: item.price, count: numbs};
        })
    }

    return (
        <Box className={`${cl.container}`}>
            <Modal
                open={modal}
                onClose={e => setModal(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{
                    ...style,
                    minHeight: "600px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: 800
                }}>
                    <Grid sx={{marginBottom: "30px", display: messageHandler.message.length > 0 ? "flex" : "none"}} item
                          xs={12}>
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
                    <h2 id="parent-modal-title">Ваше замовлення</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{maxHeight:"500px", overflowY:"auto"}} size={"medium"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Продукт</TableCell>
                                    <TableCell>Ціна за од.</TableCell>
                                    <TableCell>Кількість</TableCell>
                                    <TableCell>Сума</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.length > 0 ? getGroups().map(g => (
                                        <TableRow key={g.id}>
                                            <TableCell>{g.name} {g.description.length > 0 && <Tooltip title={g.description}><IconButton><InfoOutlinedIcon/></IconButton></Tooltip>}</TableCell>
                                            <TableCell>{g.price}грн</TableCell>
                                            <TableCell>{g.count}</TableCell>
                                            <TableCell>{g.count * g.price}грн</TableCell>
                                        </TableRow>)) :
                                    <TableRow><TableCell colSpan={4}>
                                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                            <h2 id="parent-modal-title">Пусто.</h2>
                                            <Button onClick={goToCreate} variant={"contained"}>Зробити замовлення</Button>
                                        </Box></TableCell></TableRow>}
                            </TableBody>
                        </Table>
                        <Box display={"flex"} justifyContent={"flex-end"} marginRight={"10px"} padding={"10px 0px"}>
                            Сума: {getGroups().reduce((a, b) => a + b.count*b.price, 0)} грн
                        </Box>
                    </TableContainer>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Button disabled={items.length < 1} variant={"contained"} sx={{marginRight: "15px"}}
                                onClick={makeOrder}>Створити</Button>
                        <Button disabled={items.length < 1} variant={"contained"} onClick={clear}>Очистити</Button>
                    </Box>
                </Box>
            </Modal>
            <Header setModal={setModal}/>
            <Box className={cl.content}>
                <Outlet/>
            </Box>
        </Box>
    );
};

export default Layout;