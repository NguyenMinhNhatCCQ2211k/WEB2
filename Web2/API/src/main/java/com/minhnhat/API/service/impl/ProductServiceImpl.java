package com.minhnhat.example05.service.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.minhnhat.example05.entity.Cart;
import com.minhnhat.example05.entity.Category;
import com.minhnhat.example05.entity.Product;
import com.minhnhat.example05.exceptions.APIException;
import com.minhnhat.example05.exceptions.ResourceNotFoundException;
import com.minhnhat.example05.payloads.CartDTO;
import com.minhnhat.example05.payloads.ProductDTO;
import com.minhnhat.example05.payloads.ProductResponse;
import com.minhnhat.example05.repository.CartRepo;
import com.minhnhat.example05.repository.CategoryRepo;
import com.minhnhat.example05.repository.ProductRepo;
// THÊM: Import BrandRepo
import com.minhnhat.example05.repository.BrandRepo;
import com.minhnhat.example05.entity.Brand;
// KẾT THÚC THÊM
import com.minhnhat.example05.service.CartService;
import com.minhnhat.example05.service.FileService;
import com.minhnhat.example05.service.ProductService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryRepo categoryRepo;
 
    @Autowired
    private BrandRepo brandRepo;

    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private CartService cartService;
    @Autowired
    private FileService fileService;
    @Autowired
    private ModelMapper modelMapper;
    @Value("${project.image}")
    private String path;

    @Override
    public ProductDTO addProduct(ProductDTO productDTO) {

        Product product = new Product();
        product.setProductName(productDTO.getProductName());
        product.setDescription(productDTO.getDescription());
        product.setQuantity(productDTO.getQuantity());
        product.setPrice(productDTO.getPrice());
        product.setDiscount(productDTO.getDiscount());
        

        boolean isProductNotPresent = true;
        List<Product> existingProducts = productRepo.findAll();
        for (Product existingProduct : existingProducts) {
            if (existingProduct.getProductName().equals(product.getProductName())
                    && existingProduct.getDescription().equals(product.getDescription())) {
                isProductNotPresent = false;
                break;
            }
        }
        
        if (isProductNotPresent) {
           
            if (productDTO.getCategoryId() != null) {
                Category category = categoryRepo.findById(productDTO.getCategoryId())
                        .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", productDTO.getCategoryId()));
                product.setCategory(category);
            }
            
         
            if (productDTO.getBrandId() != null) {
                Brand brand = brandRepo.findById(productDTO.getBrandId())
                        .orElseThrow(() -> new ResourceNotFoundException("Brand", "brandId", productDTO.getBrandId()));
                product.setBrand(brand);
            }
            
          
            product.setImage("default.png");
            
            
            double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
            product.setSpecialPrice(specialPrice);
            
         
            Product savedProduct = productRepo.save(product);
            
            // Ánh xạ lại thành ProductDTO, bao gồm categoryName và brandName
            ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);
            if (savedProduct.getCategory() != null) {
                savedProductDTO.setCategoryName(savedProduct.getCategory().getCategoryName());
            }
            if (savedProduct.getBrand() != null) {
                savedProductDTO.setBrandName(savedProduct.getBrand().getBrandName());
            }
            return savedProductDTO;
        } else {
            throw new APIException("Product already exists !!!");
        }
    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> pageProducts = productRepo.findAll(pageDetails);
        List<Product> products = pageProducts.getContent();
        // THÊM: Ánh xạ brandName
        List<ProductDTO> productDTOs = products.stream().map(product -> {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            if (product.getCategory() != null) {
                productDTO.setCategoryName(product.getCategory().getCategoryName());
            }
            if (product.getBrand() != null) {
                productDTO.setBrandName(product.getBrand().getBrandName());
            }
            return productDTO;
        }).collect(Collectors.toList());
        // KẾT THÚC THÊM
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Optional<Product> productOptional = productRepo.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            // THÊM: Ánh xạ brandName
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            if (product.getCategory() != null) {
                productDTO.setCategoryName(product.getCategory().getCategoryName());
            }
            if (product.getBrand() != null) {
                productDTO.setBrandName(product.getBrand().getBrandName());
            }
            return productDTO;
            // KẾT THÚC THÊM
        } else {
            throw new ResourceNotFoundException("Product", "productId", productId);
        }
    }

    @Override
    public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> pageProducts = productRepo.findByCategoryCategoryId(categoryId, pageDetails);
        List<Product> products = pageProducts.getContent();
        // THÊM: Ánh xạ brandName
        List<ProductDTO> productDTOs = products.stream().map(product -> {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            if (product.getCategory() != null) {
                productDTO.setCategoryName(product.getCategory().getCategoryName());
            }
            if (product.getBrand() != null) {
                productDTO.setBrandName(product.getBrand().getBrandName());
            }
            return productDTO;
        }).collect(Collectors.toList());
        // KẾT THÚC THÊM
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

    // THÊM: Triển khai searchByBrand
    @Override
    public ProductResponse searchByBrand(Long brandId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> pageProducts = productRepo.findByBrandBrandId(brandId, pageDetails);
        List<Product> products = pageProducts.getContent();
        List<ProductDTO> productDTOs = products.stream().map(product -> {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            if (product.getCategory() != null) {
                productDTO.setCategoryName(product.getCategory().getCategoryName());
            }
            if (product.getBrand() != null) {
                productDTO.setBrandName(product.getBrand().getBrandName());
            }
            return productDTO;
        }).collect(Collectors.toList());
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }
    // KẾT THÚC THÊM

    @Override
    public ProductResponse searchProductByKeyword(String keyword, Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> pageProducts = productRepo.findByProductNameLike("%" + keyword + "%", pageDetails);
        List<Product> products = pageProducts.getContent();
        if (categoryId != 0 && categoryId != null) {
            products = products.stream()
                    .filter(product -> {
                        if (product.getCategory() != null && product.getCategory().getCategoryId() != null) {
                            Long productCategoryId = product.getCategory().getCategoryId();
                            return productCategoryId == categoryId;
                        }
                        return false;
                    })
                    .collect(Collectors.toList());
        }
        // THÊM: Ánh xạ brandName
        List<ProductDTO> productDTOs = products.stream().map(product -> {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            if (product.getCategory() != null) {
                productDTO.setCategoryName(product.getCategory().getCategoryName());
            }
            if (product.getBrand() != null) {
                productDTO.setBrandName(product.getBrand().getBrandName());
            }
            return productDTO;
        }).collect(Collectors.toList());
        // KẾT THÚC THÊM
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        Product productFromDB = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
    
        // Gán lại các trường không thay đổi từ DB
        productDTO.setProductId(productId);
        productDTO.setImage(productFromDB.getImage()); // giữ nguyên ảnh
    
        // Tính lại specialPrice
        double specialPrice = productDTO.getPrice() - ((productDTO.getDiscount() * 0.01) * productDTO.getPrice());
        productDTO.setSpecialPrice(specialPrice);
    
        // Chuyển DTO sang entity
        Product productToSave = modelMapper.map(productDTO, Product.class);
    
        // Gán lại brand và category từ DB (vì DTO không chứa full object)
        productToSave.setBrand(productFromDB.getBrand());
        productToSave.setCategory(productFromDB.getCategory());
    
        // Lưu sản phẩm
        Product savedProduct = productRepo.save(productToSave);
    
        // Cập nhật các giỏ hàng chứa sản phẩm này
        List<Cart> carts = cartRepo.findCartsByProductId(productId);
        List<CartDTO> cartDTOs = carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
            List<ProductDTO> products = cart.getCartItems().stream()
                    .map(p -> modelMapper.map(p.getProduct(), ProductDTO.class)).collect(Collectors.toList());
            cartDTO.setProducts(products);
            return cartDTO;
        }).collect(Collectors.toList());
    
        cartDTOs.forEach(cart -> cartService.updateProductInCarts(cart.getCartId(), productId));
    
        // Trả về DTO đã cập nhật
        ProductDTO responseDTO = modelMapper.map(savedProduct, ProductDTO.class);
        if (savedProduct.getCategory() != null) {
            responseDTO.setCategoryName(savedProduct.getCategory().getCategoryName());
        }
        if (savedProduct.getBrand() != null) {
            responseDTO.setBrandName(savedProduct.getBrand().getBrandName());
        }
    
        return responseDTO;
    }
    
    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
        Product productFromDB = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        if (productFromDB == null) {
            throw new APIException("Product not found with productId:" + productId);
        }
        String fileName = fileService.uploadImage(path, image);
        productFromDB.setImage(fileName);
        Product updatedProduct = productRepo.save(productFromDB);
        // THÊM: Ánh xạ brandName
        ProductDTO productDTO = modelMapper.map(updatedProduct, ProductDTO.class);
        if (updatedProduct.getCategory() != null) {
            productDTO.setCategoryName(updatedProduct.getCategory().getCategoryName());
        }
        if (updatedProduct.getBrand() != null) {
            productDTO.setBrandName(updatedProduct.getBrand().getBrandName());
        }
        return productDTO;
        // KẾT THÚC THÊM
    }

    @Override
    public String deleteProduct(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        List<Cart> carts = cartRepo.findCartsByProductId(productId);
        carts.forEach(cart -> cartService.deleteProductFromCart(cart.getCartId(), productId));
        productRepo.delete(product);
        return "Product with productId:" + productId + " deleted successfully !!!";
    }

    @Override
    public InputStream getProductImage(String fileName) throws FileNotFoundException {
        return fileService.getResource(path, fileName);
    }
}