import axios, {AxiosResponse} from "axios";

const baseURL = "http://localhost:5000/";

const instance = axios.create({
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
})

instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export type Response = {
    data: any,
    message?: string
}

export type GetPlaces = {
    address: string,
    id: number,
    name: string
}

export type GetMenu = {
    description: string,
    id: number,
    name: string,
    price: number
}

export type GetOrder = {
    created_time: number,
    id: number,
    is_delivered: boolean,
    place: string,
    sum: number
}

export type PostFood = {
    food_id: number,
    count: number
}

export type PostOrder = {
    place_id: number,
    items: PostFood[]
}

export type PostLogin = {
    login: string,
    password: string
}

export type Register = {
    email: string,
    password: string,
    repeated_password: string,
    first_name: string,
    last_name: string,
    phone: string
}

export type OrderDesc = {
    amount: number,
    product: string,
    product_price: number
}

const places = "order/places";
const menu = "order/menu/";
const login = "login";
const register = "sing-up";
const logout = "logout";
const history = "order/history";
const createOrder = "order/create";
const compliteOrder = "order/complete/"

instance.defaults.baseURL = baseURL;

export class Api {
    login = async (acc: PostLogin): Promise<Response> => {
        try {
            const result: AxiosResponse = await instance.post(login, acc);
            return {data: result};
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
    register = async (acc: Register): Promise<Response> => {
        try {
            return await instance.post(register, acc).then(res => {
                return {data: res.data};
            }).catch(err => {
                return {data: null, message: err}
            });
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
    logout = async (): Promise<Response> => {
        try {
            const result: AxiosResponse = await instance.get(logout);
            return {data: result};
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
    getPlaces = async (): Promise<Response> => {
        try {
            return await instance.get(places).then(res => {
                return {data: res.data};
            }).catch(err => {
                return {data: null, message: err}
            });
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
    getItems = async (id:number): Promise<Response> => {
        try {
            return await instance.get(menu+id).then(res => {
                return {data: res.data};
            }).catch(err => {
                return {data: null, message: err}
            });
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
    getHistory = async (): Promise<Response> => {
        try {
            return await instance.get(history).then(res => {
                return {data: res.data};
            }).catch(err => {
                return {data: null, message: err}
            });
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
    createOrder = async (order: PostOrder): Promise<Response> => {
        try {
            return await instance.post(createOrder, order).then(res => {
                return {data: res.data};
            }).catch(err => {
                return {data: null, message: err}
            });
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
    compliteOrder = async (id: number): Promise<Response> => {
        try {
            return await instance.post(compliteOrder + id).then(res => {
                return {data: res.data};
            }).catch(err => {
                return {data: null, message: err}
            });
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
    getDescOrder = async (id: number): Promise<Response> => {
        try {
            return await instance.get(history + "/" + id).then(res => {
                return {data: res.data};
            }).catch(err => {
                return {data: null, message: err}
            });
        } catch (err) {
            console.log(err)
            return {data: null, message: err.message};
        }
    }
}