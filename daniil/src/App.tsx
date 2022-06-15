import React from 'react';
import './App.css';
import {Box} from "@mui/material";
import {SelectUserAuth} from "./redux/store/user/selector";
import {useDispatch, useSelector} from "react-redux";
import {setAuth, setUser} from "./redux/store/user/slice";
import {useRoutes} from "react-router";
import routes from "./routes";

function App() {
  const auth = useSelector(SelectUserAuth);
  const dispatch = useDispatch();
  if(localStorage.getItem('userShop'))
  {
    const item = JSON.parse(localStorage.getItem('userShop'));
    dispatch(setUser(item));
    dispatch(setAuth(true));
  }

  const content = useRoutes(routes[!auth ? 0 : 1]);

  return (
    <Box>
      {content}
    </Box>
  );
}

export default App;
