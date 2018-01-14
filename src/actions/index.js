import axios from 'axios'
import { LOCAL_ROOT_URL } from '../const'

export const CREATE_USER = 'create_user'


export async function createUser(values) {
    const res = await axios.post(`${LOCAL_ROOT_URL}/users/`, values)
    return {
        type: CREATE_USER, 
        payload: res.data
    }
}