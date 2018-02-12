import { ROOT_URL } from './const'
import axios from 'axios'


export default function checkAuth(history) {
    if (!localStorage.getItem('jwt')) {
        history.push('/login')
    }
}

export default function callAPI() {
    axios.get(ROOT_URL)
}
