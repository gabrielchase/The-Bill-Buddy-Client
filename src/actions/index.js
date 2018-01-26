import axios from 'axios'
import { LOCAL_ROOT_URL } from '../const'

export const LOGIN_USER_SUCCESS = 'login_user_success'
export const LOGIN_USER_FAILURE = 'login_user_failure'

export const CREATE_USER = 'create_user'
export const FETCH_USER = 'fetch_user'

export const FETCH_BILLS = 'fetch_bills'
export const FETCH_CURRENT_BILL = 'fetch_current_bill'
export const CREATE_BILL = 'create_bill'
export const UPDATE_BILL = 'update_bill'

export const CREATE_PAYMENT = 'create_payment'

export const FETCH_SERVICES = 'fetch_services'


export function getHeaders() {
    return {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('jwt')}`,
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
    let headers = getHeaders()
    const res = await axios.get(`${LOCAL_ROOT_URL}/users/${user_id}/`, headers)
    return {
        type: FETCH_USER, 
        payload: res.data
    }
}

export async function updateUser(values) {
    let user_id = localStorage.getItem('user_id')
    let headers = getHeaders()
    const res = await axios.put(`${LOCAL_ROOT_URL}/users/${user_id}/`, values, headers)
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
    let headers = getHeaders()
    let api_url = `${LOCAL_ROOT_URL}/bills/`
    if (service_name) {
        api_url += `?service=${service_name}`
    } 
    const res = await axios.get(api_url, headers)
    return {
        type: FETCH_BILLS, 
        payload: res.data
    }
}

export async function fetchCurrentBill(bill_id=null) {
    let headers = getHeaders()
    const res = await axios.get(`${LOCAL_ROOT_URL}/bills/${bill_id}/`, headers)
    return {
        type: FETCH_CURRENT_BILL,
        payload: res.data
    }
}

export async function updateBill(bill_id, values) {
    let headers = getHeaders()
    const res = await axios.put(`${LOCAL_ROOT_URL}/bills/${bill_id}/`, values, headers)
    return {
        type: UPDATE_BILL,
        payload: res.data
    }
}

export async function createBill(values) {
    let headers = getHeaders()
    const res = await axios.post(`${LOCAL_ROOT_URL}/bills/`, values, headers)
    return {
        type: CREATE_BILL, 
        payload: res.data
    }
}

export async function createPayment(values) {
    let headers = getHeaders()
    const res = await axios.post(`${LOCAL_ROOT_URL}/payments/`, values, headers)
    return {
        type: CREATE_PAYMENT, 
        payload: res.data
    }
}

export async function fetchServices() {
    let headers = getHeaders()
    let api_url = `${LOCAL_ROOT_URL}/services/`
    const res = await axios.get(api_url, headers)
    return {
        type: FETCH_SERVICES, 
        payload: res.data
    }
}
