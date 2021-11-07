import { LOGOUT, REGISTER } from "../constants/actionTypes";
import { LOGIN } from "../constants/actionTypes";
import authService from "../services/auth.service"
import jwt  from 'jsonwebtoken';



export const RegisterUser = (model) => async (dispatch) => {
    try{
        const result = await authService.register(model);
        dispatch({type: REGISTER})
        const token = result.data.token;
        dispatch(authUser(token));
        return Promise.resolve(result);

    }
    catch(err){
        return Promise.reject(err.response.data);

    }
}
export const LoginUser = (model) => async (dispatch) => {
    try{
        const result = await authService.login(model);
        const token = result.data.token;
        dispatch(authUser(token));

        return Promise.resolve(result);

    }
    catch(err){
        return Promise.reject(err.response.data);

    }
}

export const authUser = (token) => (dispatch) => {
  
    var user = jwt.decode(token);
    dispatch ({type: LOGIN, payload: user});
}

export const logout = () => (dispatch) => {
    dispatch
    (
        {
            type: LOGOUT
        }
    );
}