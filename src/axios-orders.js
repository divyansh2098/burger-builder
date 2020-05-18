import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://my-burger-builder-8fbea.firebaseio.com/'
})

export default instance;