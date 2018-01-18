import axios from 'axios'
import { LOCAL_ROOT_URL } from '../const'

export const LOGIN_USER_SUCCESS = 'login_user_success'
export const LOGIN_USER_FAILURE = 'login_user_failure'

export const CREATE_USER = 'create_user'
export const FETCH_USER = 'fetch_user'

export const FETCH_BILLS = 'fetch_bills'


export function getHeaders(jwt) {
    return {
        headers: {
            'Authorization': `JWT ${jwt}`,
            'Content-Type' : 'application/json'
        }
    }
}

export async function createUser(values) {
    const res = await axios.post(`${LOCAL_ROOT_URL}/users/`, values)
    return {
        type: CREATE_USER, 
        payload: res.data
    }
}

export async function fetchUser() {
    let user_id = localStorage.getItem('user_id')
    let jwt = localStorage.getItem('jwt')
    let headers = getHeaders(jwt)
    const res = await axios.get(`${LOCAL_ROOT_URL}/users/${user_id}/`, headers)
    return {
        type: FETCH_USER, 
        payload: res.data
    }
}

export async function loginUser(values) {
    const res = await axios.post(`${LOCAL_ROOT_URL}/login/`, values)
    await localStorage.setItem('user_id', res.data.user_id)
    await localStorage.setItem('jwt', res.data.token)
    return {
        type: LOGIN_USER_SUCCESS, 
        payload: res.data
    }
}

export async function fetchBills(service_name=null) {
    console.log(`fetchBills action: ${service_name}`)
    let jwt = localStorage.getItem('jwt')
    let headers = getHeaders(jwt)
    let api_url = `${LOCAL_ROOT_URL}/bills/`
    if (service_name) {
        api_url += `?service=${service_name}`
    } 
    console.log(api_url)
    const res = await axios.get(api_url, headers)
    return {
        type: FETCH_BILLS, 
        payload: res.data
    }
}
