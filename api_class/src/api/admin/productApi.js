import axios from "axios";

export const getAllProductApi = (params) => axios.get("/admin/product", {params})