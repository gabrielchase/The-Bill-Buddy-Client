import { ROOT_URL } from './const'
import axios from 'axios'


export const checkAuth = (history) => {
    if (!localStorage.getItem('jwt')) {
        history.push('/login')
    }
}

export const callAPI = () => {
    console.log('calling API')
    axios.get(ROOT_URL)
}
