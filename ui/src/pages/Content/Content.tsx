import React, {useEffect, useState} from 'react';
import {
    Alert, AlertProps,
    Box, Button,
    CircularProgress,
    FormControl, Grid,
    IconButton,
    InputLabel,
    MenuItem, Modal, Paper,
    Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Tooltip
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import cl from './Content.module.css'
import {Api, GetMenu, GetOrder, GetPlaces} from "../../api/Api";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useDispatch, useSelector} from "react-redux";
import {SelectUserItems, SelectUserOrders} from "../../redux/store/user/selector";
import {setItems, setOrders} from "../../redux/store/user/slice";
import moment from "moment";

const min = 1;
const max = 100;

const Content = () => {

    const [places, setPlaces] = useState<GetPlaces[]>([]);
    const [items, setItemsLocal] = useState<GetMenu[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedItem, setSelectedItem] = useState(0);
    const [value, setValue] = useState<number>(1);
    const [modal, setModal] = useState(false);
    const history = useSelector(SelectUserOrders);

    const [messageHandler, setMessageHandler] = useState({type: "" as AlertProps["severity"], message: ""});
    const reduxItems = useSelector(SelectUserItems);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedPlace(value);
        setSelectedItem(null);
        getItems(value);
    }

    const handleChangeItem = (e) => {
        const value = e.target.value;
        setValue(1);
        setSelectedItem(value);
    }

    useEffect(() => {
        const api = new Api();
        try {
            const promises = [];

            const promise1 = new Promise((resolve, reject) => {
                api.getPlaces().then(res => {
                    setPlaces(res.data.places);
                    resolve(true);
                }).catch(err => {
                    reject(err);
                });
            })

            promises.push(promise1);

            const promise2 = new Promise((resolve, reject) => {
                api.getHistory().then(res => {
                    setOrders(res.data.history);
                    resolve(true);
                }).catch(err => {
                    reject(err);
                });
            })

            promises.push(promise2);

            Promise.all(promises).then(e => setLoading(false)).catch(e => setLoading(false));

        } catch (e) {
            console.log(e)
        }
    }, [])

    const getItems = (value) => {
        const api = new Api();
        try {
            api.getItems(value).then(res => {
                setItemsLocal(res.data.menu);
            }).catch(err => {
                console.log(err);
            });
        } catch (e) {
            console.log(e)
        }
    }

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
        borderRadius: "10px"
    };

    const addToCart = () => {
        const canToAdd = reduxItems.idShop === parseInt(selectedPlace) ? true : reduxItems.idShop === null;
        if (canToAdd) {
            const order = Array.from({length: value}, () => items.filter(x => x.id === selectedItem)[0]);
            dispatch(setItems({idShop: parseInt(selectedPlace), items: [...reduxItems.items, ...order]}))
        } else {
            setMessageHandler({type: "error", message: "Можна створити заказ лише з одного закладу"})
        }
    }

    useEffect(()=>{
        if(messageHandler.message.length > 0)
        {
            setTimeout(()=>{
                setMessageHandler({...messageHandler, message: ""})
            }, 3000)
        }
    }, [messageHandler.message])

    return (
        <Box className={cl.container}>
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
                    width: 500
                }}>
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
                    <h2 id="parent-modal-title">Create new order</h2>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={"100%"}
                         maxHeight={"600px"} sx={{"overflowY": "auto"}}>
                        <Box className={cl.content}>
                            <FormControl sx={{minWidth: "200px", marginBottom: "10px"}}>
                                <InputLabel id="demo-simple-select-label">Places</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedPlace}
                                    placeholder={"Оберіть заклад"}
                                    label="Places"
                                    onChange={handleChange}
                                >
                                    {places && places.map(p => (
                                        <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl disabled={!selectedPlace} sx={{minWidth: "200px", marginBottom: "10px"}}>
                                <InputLabel id="demo-simple-select-label">Items</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedItem}
                                    placeholder={"Оберіть заклад"}
                                    label="Places"
                                    onChange={handleChangeItem}
                                >
                                    {items && items.map(i => (
                                        <MenuItem key={i.id} value={i.id}>
                                            <Tooltip sx={{"&:hover": {cursor: "pointer"}}}
                                                     title={i.description} placement={"right"}>
                                                <Box width="100%">
                                                    {i.name} ({i.price}грн)
                                                </Box>
                                            </Tooltip>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box display={selectedItem ? "flex" : "none"} alignItems={"center"}
                                 justifyContent={"flex-start"}>
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 100, min: 1
                                        }
                                    }}
                                    value={value}
                                    onChange={(e) => {
                                        var valueTemp = parseInt(e.target.value, 10);

                                        if (valueTemp > max) valueTemp = max;
                                        if (valueTemp < min) valueTemp = min;

                                        if (isNaN(valueTemp))
                                            setValue(0);
                                        else
                                            setValue(valueTemp);
                                    }}
                                    label="Кількість"
                                />
                                <IconButton
                                    onClick={addToCart}>
                                    <AddShoppingCartIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            {loading ? <CircularProgress/> :
                <Box display={"flex"} width={"100%"} flexDirection={"column"} alignItems={"center"}>
                    <Button sx={{marginBottom:"15px"}} variant={"contained"} onClick={e => setModal(true)}>Create new order</Button>
                    <TableContainer sx={{width:"50%"}} component={Paper}>
                        <Table size={"medium"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Sum</TableCell>
                                    <TableCell>Is Delivered</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.length > 0 ? history.map(h => (
                                        <TableRow key={h.id}>
                                            <TableCell>{h.id}</TableCell>
                                            <TableCell>{moment.unix(h.created_time).format("MM-DD-YYYY")}</TableCell>
                                            <TableCell>{h.place}</TableCell>
                                            <TableCell>{h.sum}</TableCell>
                                            <TableCell>{h.is_delivered ? "Виконано" : "В процесі"}</TableCell>
                                        </TableRow>)) :
                                    <TableRow><TableCell align={"center"} colSpan={5}>No data found!</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>}
        </Box>
    );
};

export default Content;