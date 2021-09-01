import axios from 'axios'

export const setAuthHeader = token => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
}

export const removeAuthHeader = () => {
    delete axios.defaults.headers.common['Authorization']
}