// categoryService.js
import api from "../../utils/api";

// Fetch all categories
export const getAllCategories = () => api.get("/categories");

// Fetch a single category by slug
export const getOneCategory = (slug) => api.get(`/category/${slug}`);

// Delete a category by slug
export const deleteCategory = (slug) => api.delete(`/category/${slug}`);

// Update a category by slug
export const updateCategory = (slug, category) =>
  api.put(`/category/${slug}`, category);

// Create a new category
export const createCategory = (category) => api.post("/category", category);

// get all sub-categories for category using category id
export const getCategorySubs = (_id) => api.get(`/category/subs/${_id}`);
