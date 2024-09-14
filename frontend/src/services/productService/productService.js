import api from "../../utils/api";

export const getAllProducts = () => api.get("/products");

export const getOneProduct = (slug) => api.get(`/product/${slug}`);

export const deleteProduct = (slug) => api.delete(`/product/${slug}`);

export const updateProduct = (slug, product) =>
  api.put(`/product/${slug}`, product);

export const createProduct = (product) => api.post("/product", product);
