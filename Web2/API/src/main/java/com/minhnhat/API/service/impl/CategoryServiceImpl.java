package com.minhnhat.example05.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.minhnhat.example05.entity.Category;
import com.minhnhat.example05.entity.Product;
import com.minhnhat.example05.exceptions.APIException;
import com.minhnhat.example05.exceptions.ResourceNotFoundException;
import com.minhnhat.example05.payloads.CategoryDTO;
import com.minhnhat.example05.payloads.CategoryResponse;
import com.minhnhat.example05.repository.CategoryRepo;
import com.minhnhat.example05.service.CategoryService;
import com.minhnhat.example05.service.ProductService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class CategoryServiceImpl implements CategoryService {
  @Autowired
  private CategoryRepo categoryRepo;
  @Autowired
  @Lazy
  private ProductService productService;
  @Autowired
  private ModelMapper modelMapper;
  @Override
    public CategoryDTO getCategoryById(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepo.findById(categoryId);

        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            return modelMapper.map(category, CategoryDTO.class);
        } else {
            throw new ResourceNotFoundException("Category", "categoryId", categoryId);
        }
    }

  @Override
  public CategoryDTO createCategory(CategoryDTO categoryDTO) {
    Category existingCategory = categoryRepo.findByCategoryName(categoryDTO.getCategoryName());
    if (existingCategory != null) {
        throw new APIException("Category with the name '" + categoryDTO.getCategoryName() + "' already exists !!!");
    }


    Category category = modelMapper.map(categoryDTO, Category.class);

 
    Category savedCategory = categoryRepo.save(category);

    return modelMapper.map(savedCategory, CategoryDTO.class);
}


  @Override
  public CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
    Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
        : Sort.by(sortBy).descending();
    Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
    Page<Category> pageCategories = categoryRepo.findAll(pageDetails);
    List<Category> categories = pageCategories.getContent();
    if (categories.size() == 0) {
      throw new APIException("No category is created till now");
    }
    List<CategoryDTO> categoryDTOs = categories.stream()
        .map(category -> modelMapper.map(category, CategoryDTO.class)).collect(Collectors.toList());
    CategoryResponse categoryResponse = new CategoryResponse();
    categoryResponse.setContent(categoryDTOs);
    categoryResponse.setPageNumber(pageCategories.getNumber());
    categoryResponse.setPageSize(pageCategories.getSize());
    categoryResponse.setTotalElements(pageCategories.getTotalElements());
    categoryResponse.setTotalPages(pageCategories.getTotalPages());
    categoryResponse.setLastPage(pageCategories.isLast());
    return categoryResponse;
  }

  @Override
  public CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId) {
    Category savedCategory = categoryRepo.findById(categoryId)
        .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
    // Cập nhật các trường từ CategoryDTO
    savedCategory.setCategoryName(categoryDTO.getCategoryName());
    savedCategory.setDescription(categoryDTO.getDescription());
    // Lưu danh mục đã cập nhật
    savedCategory = categoryRepo.save(savedCategory);
    return modelMapper.map(savedCategory, CategoryDTO.class);
  }

  @Override
  public String deleteCategory(Long categoryId) {
    Category category = categoryRepo.findById(categoryId)
        .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
    List<Product> products = category.getProducts();
    products.forEach(product -> {
      productService.deleteProduct(product.getProductId());
    });
    categoryRepo.delete(category);
    return "Category with categoryId:" + categoryId + "deleted successfully !!!";
  }
  
}