import axios from 'axios'

const api = axios.create({
    baseURL: `https://api.api-futebol.com.br/v1/`
});
export default api;

export const configRequest = () => {
    return {
        headers: {
            Authorization: "Bearer test_e2c713b92860cb7ad8fd82a279c827"
        }
    }
}