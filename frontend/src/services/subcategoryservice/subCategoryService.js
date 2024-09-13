// categoryService.js
import api from "../../utils/api";

// Fetch all subcategories
export const getAllSubCategories = () => api.get("/subcategories");

// Fetch a single subcategory by slug
export const getOneSubCategory = (slug) => api.get(`/subcategory/${slug}`);

// Delete a subcategory by slug
export const deleteSubCategory = (slug) => api.delete(`/subcategory/${slug}`);

// Update a subcategory by slug
export const updateSubCategory = (slug, subcategory) =>
  api.put(`/subcategory/${slug}`, subcategory);

// Create a new subcategory
export const createSubCategory = (subcategory) =>
  api.post("/subcategory", subcategory, );
