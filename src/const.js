export const HOSTNAME = window && window.location && window.location.hostname

export const LOCAL_ROOT_URL = 'http://localhost:8000/api'
export const PROD_ROOT_URL = 'https://thebillbuddyapi.herokuapp.com/api'

function get_root_url() {
    return HOSTNAME === 'localhost' ? LOCAL_ROOT_URL : PROD_ROOT_URL
}

export const ROOT_URL = get_root_url()

export const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000', '#FFFF00', '#008080', '#800080',
    '#FF00FF', '#000080', '#000080', '#808000', '#633974', '#D35400', '#145A32', '#F5B7B1'
]

export const MONTHS = [
    {id: 1, name: 'January'}, 
    {id: 2, name: 'February'}, 
    {id: 3, name: 'March'}, 
    {id: 4, name: 'April'}, 
    {id: 5, name: 'May'}, 
    {id: 6, name: 'June'}, 
    {id: 7, name: 'July'}, 
    {id: 8, name: 'August'}, 
    {id: 9, name: 'September'}, 
    {id: 10, name: 'October'}, 
    {id: 11, name: 'November'}, 
    {id: 12, name: 'December'}, 
]

export const DAYS = Array.apply(null, Array(31)).map(function (_, i) {return {'id': i+1, 'name': i+1} })
