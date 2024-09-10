// categoryService.js
import api from "../../utils/api";

// Fetch all categories
export const getAllSubCategories = () => api.get("/subcategories");

// Fetch a single category by slug
export const getOneSubCategory = (slug) => api.get(`/subcategory/${slug}`);

// Delete a category by slug
export const deleteSubCategory = (slug) => api.delete(`/subcategory/${slug}`);

// Update a category by slug
export const updateSubCategory = (slug, subcategory) =>
  api.put(`/subcategory/${slug}`, subcategory);

// Create a new category
export const createSubCategory = (subcategory) =>
  api.post("/subcategory", subcategory);
