import axios from 'axios'
import { LOCAL_ROOT_URL } from '../const'

export const CREATE_USER = 'create_user'
export const LOGIN_USER_SUCCESS = 'login_user_success'
export const LOGIN_USER_FAILURE = 'login_user_failure'


export async function createUser(values) {
    const res = await axios.post(`${LOCAL_ROOT_URL}/users/`, values)
    return {
        type: CREATE_USER, 
        payload: res.data
    }
}

export async function loginUser(values) {
    const res = await axios.post(`${LOCAL_ROOT_URL}/login/`, values)
    console.log(res.data)
    return {
        type: LOGIN_USER_SUCCESS, 
        payload: res.data
    }
}