import axios from "axios";

const url= 'http://localhost:8080/api/users';

export const createuser=(formData)=>axios.post(url,{"email":formData.email,"name":formData.names,"password":formData.password});

export const getalluser=()=>axios.get(url);