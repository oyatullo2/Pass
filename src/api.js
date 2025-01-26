import axios from "axios";

const api = axios.create({
    baseURL : 'https://m5495.myxvest.ru/zapi/register.php'
})
export default api