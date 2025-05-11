package com.minhnhat.example05.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long productId;

  @NotBlank
  @Size(min = 3, message = "Product name must contain at least 3 characters")
  private String productName;
  
  private String image;

  @NotBlank
  @Size(min = 6, message = "Product description must contain at least 6 characters")
  private String description;
  
  private Integer quantity;
  
  private double price;
  
  private double discount;
  
  private double specialPrice;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;

  @ManyToOne
  @JoinColumn(name = "brand_id")
  private Brand brand;

  @OneToMany(mappedBy = "product", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
  private List<CartItem> products = new ArrayList<>();
  
  @OneToMany(mappedBy = "product", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  private List<OrderItem> orderItems = new ArrayList<>();

  // Thêm trường userId và quan hệ với bảng User
  @ManyToOne
  @JoinColumn(name = "user_id")  // Cột khóa ngoại để liên kết với bảng User
  private User user;  // Liên kết với entity User
}
