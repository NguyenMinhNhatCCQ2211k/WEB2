package com.minhnhat.example05.service;

import com.minhnhat.example05.entity.Category;
import com.minhnhat.example05.payloads.CategoryDTO;
import com.minhnhat.example05.payloads.CategoryResponse;

public interface CategoryService {
  CategoryDTO createCategory(CategoryDTO categoryDTO);

  CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

  CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId);

  String deleteCategory(Long categoryId);

  CategoryDTO getCategoryById(Long categoryId);

}