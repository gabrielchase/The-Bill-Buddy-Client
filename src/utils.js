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

export const checkJWTExpiration = () => {
    if (localStorage.getItem('jwt')) {
        let now = new Date()
        let expiration = new Date(localStorage.getItem('jwt_expiration') * 1000)
        
        if (now > expiration) {
            localStorage.removeItem('user_id')
            localStorage.removeItem('jwt')
            localStorage.removeItem('jwt_creation')
            localStorage.removeItem('jwt_expiration')
        }
    }
}
