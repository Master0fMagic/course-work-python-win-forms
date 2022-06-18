import React, {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<CircularProgress/>}>
            <Component {...props} />
        </Suspense>
    );

const Authorization = Loader(lazy(() => import('./pages/Auth/Authorization')))
const Registration = Loader(lazy(() => import('./pages/Register/Registration')))
const Content = Loader(lazy(() => import('./pages/Content/Content')))
const Layout = Loader(lazy(() => import('./layouts/MainLayout/Index')))

export const PATH = {
    AUTHORIZATION: "/auth",
    REGISTER: "/register",
    CREATE: "/main/create"
}

const routes = [
    [
        {
            path: "*",
            element: <Navigate to={"/register"}/>
        },
        {
            path: "auth",
            element: <Authorization/>
        },
        {
            path: "register",
            element: <Registration/>
        },
    ],
    [
        {
            path: "main",
            element: <Navigate to={"/main/create"}/>
        },
        {
            path: "main",
            element: <Layout/>,
            children:[
                {
                    path: "create",
                    element: <Content/>
                },
            ]
        },
        {
            path: "*",
            element: <Navigate to={"/main/create"}/>
        },
    ]


]

export default routes;
