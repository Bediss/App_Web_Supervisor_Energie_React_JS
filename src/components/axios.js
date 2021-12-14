import axios from 'axios';

// axios.defaults.baseURL = window.apiUrl
axios.interceptors.request.use(config => {
    const {token} = localStorage.getItem('token') ? { 'token': localStorage.getItem('token') } : {};
    if (token)
        config.headers.token = token
    return config
}
,error => {
    //console.log("fffffffff",error)
    Promise.reject(error)
}
)

export default axios