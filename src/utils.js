export default function checkAuth(history) {
    if (!localStorage.getItem('jwt')) {
        history.push('/login')
    }
}
