import {call, put, takeLatest, select, takeEvery} from 'redux-saga/effects';
import {AnyAction} from "redux";
import {PayloadAction} from "@reduxjs/toolkit";
import {login, setAuth, setUser, Statuses} from "./slice";
import {PostLogin} from "../../../api/Api";

import {Api} from "../../../api/Api";

function* loginAction({payload}: PayloadAction<PostLogin>) {
    try {
        const api = new Api();
        const result = yield call(
            api.login,
            payload
        );
        if(!result.data)
            throw new Error(result.message)

        localStorage.setItem('userShop', JSON.stringify(payload));
        yield put(setUser(payload));
        yield put(setAuth(true))
    } catch (err) {
        console.log(err.message)
    }
}

export default function* watchUser() {
    yield takeLatest(login.type, loginAction);
}
