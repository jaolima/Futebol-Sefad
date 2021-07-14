import axios from 'axios'

const api = axios.create({
    baseURL: `https://api.api-futebol.com.br/v1/`
});
export default api;

export const configRequest = () => {
    return {
        headers: {
            Authorization: "Bearer live_46e56f5e2354e915884dc70895e5af"
        }
    }
}