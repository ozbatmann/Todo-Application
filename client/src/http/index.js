import axios from 'axios'
import config from '@/config'
import interceptor from "./interceptors/messageInterceptor"

let axiosInstance = axios.create(config.http);

interceptor(axiosInstance)

export default axiosInstance;