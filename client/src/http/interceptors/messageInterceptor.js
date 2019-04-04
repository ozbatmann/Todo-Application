export default (axiosInstance) => {
    axiosInstance.interceptors.response.use(function (response) {
        if(response.data.value){
            instance.$snotify.success(response.data.message);
            return response
        }
        else {
            instance.$snotify.error(response.data.message);
            return Promise.reject(response.data.message)
        }
    });
}