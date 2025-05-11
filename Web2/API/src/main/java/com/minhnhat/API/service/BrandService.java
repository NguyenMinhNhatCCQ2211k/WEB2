package com.minhnhat.example05.service;

import com.minhnhat.example05.payloads.BrandDTO;
import com.minhnhat.example05.payloads.BrandResponse;

public interface BrandService {
    BrandDTO createBrand(BrandDTO brandDTO);
    BrandResponse getBrands(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    BrandDTO getBrandById(Long brandId);
    BrandDTO updateBrand(BrandDTO brandDTO, Long brandId);
    String deleteBrand(Long brandId);
}