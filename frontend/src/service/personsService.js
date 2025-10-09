import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons';

const useAxios = (method, obj = "") => {
    let request = "";
    if(method === "get"){
        request = axios.get(baseUrl);
    }else if (method === "post"){
        request = axios.post(baseUrl, obj);
    }else if (method === "put") {
        request = axios.put(`${baseUrl}/${obj.id}`, obj);
    }else if (method === "delete"){
        request = axios.delete(`${baseUrl}/${obj.id}`)
    }else{
        return console.error("metodo de operação do axios não definido");
    }
    return request.then(res => res.data);
}
// const getAll = () => {
//     const request = axios.get(baseUrl);
//     return request.then(res => res.data)
// };

// const create = newObject => {
//     const request = axios.post(baseUrl, newObject);
//     return request.then(res => res.data);
// };

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject);
//     return request.then(res => res.data);
// };

// export default{
//     getAll,
//     create,
//     update
// }
export default useAxios;