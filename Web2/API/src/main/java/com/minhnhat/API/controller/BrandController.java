package com.minhnhat.example05.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.minhnhat.example05.config.AppConstants;
import com.minhnhat.example05.payloads.BrandDTO;
import com.minhnhat.example05.payloads.BrandResponse;
import com.minhnhat.example05.service.BrandService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")
@CrossOrigin(origins = "*")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @PostMapping("/admin/brands")
    public ResponseEntity<BrandDTO> createBrand(@Valid @RequestBody BrandDTO brandDTO) {
        BrandDTO savedBrandDTO = brandService.createBrand(brandDTO);
        return new ResponseEntity<BrandDTO>(savedBrandDTO, HttpStatus.CREATED);
    }

    @GetMapping("/public/brands")
    public ResponseEntity<BrandResponse> getBrands(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_BRAND_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        BrandResponse brandResponse = brandService.getBrands(pageNumber == 0 ? pageNumber : pageNumber - 1, pageSize, "id".equals(sortBy) ? "brandId" : sortBy, sortOrder);
        return new ResponseEntity<BrandResponse>(brandResponse, HttpStatus.OK);
    }

    @GetMapping("/public/brands/{brandId}")
    public ResponseEntity<BrandDTO> getOneBrand(@PathVariable Long brandId) {
        BrandDTO brandDTO = brandService.getBrandById(brandId);
        return new ResponseEntity<>(brandDTO, HttpStatus.OK);
    }

    @PutMapping("/admin/brands/{brandId}")
    public ResponseEntity<BrandDTO> updateBrand(@Valid @RequestBody BrandDTO brandDTO, @PathVariable Long brandId) {
        BrandDTO updatedBrandDTO = brandService.updateBrand(brandDTO, brandId);
        return new ResponseEntity<BrandDTO>(updatedBrandDTO, HttpStatus.OK);
    }

    @DeleteMapping("/admin/brands/{brandId}")
    public ResponseEntity<String> deleteBrand(@PathVariable Long brandId) {
        String status = brandService.deleteBrand(brandId);
        return new ResponseEntity<String>(status, HttpStatus.OK);
    }
}