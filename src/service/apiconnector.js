import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
    return axiosInstance({
        method,
        url,
        data: bodyData,
        headers,
        params,
    })
}

export default axiosInstance