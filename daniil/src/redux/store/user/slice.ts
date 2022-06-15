import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetMenu, GetOrder, PostLogin} from "../../../api/Api";

export enum Statuses {
    none = "none",
    waiting = "waiting",
    success = "success",
    error = "error"
}

export interface ItemsState{
    items: GetMenu[]
    idShop: number
}

export interface UserState {
    isAuth: boolean,
    account: User
    errorMsg: string,
    items: ItemsState,
    orders: GetOrder[]
}

const INITIAL_STATE = {
    account: {} as User,
    isAuth: false,
    errorMsg: "",
    items: {idShop: null, items: []} as ItemsState,
    orders: []
};

interface User{
    login: string,
    password: string
}

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        login(state, action:PayloadAction<PostLogin>) {
            state.account = {} as User;
            state.isAuth = false;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action) => {
            state.account = action.payload;
        },
        setItems: (state, action: PayloadAction<ItemsState>) => {
            state.items = action.payload;
        },
        setOrders: (state, action: PayloadAction<GetOrder[]>) => {
            state.orders = action.payload;
        },
    }
})

export default userSlice.reducer;
export const { setUser, setAuth, login, setItems, setOrders } = userSlice.actions;
