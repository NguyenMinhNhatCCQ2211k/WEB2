import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import apiCategory from "../../api/apiCategory";
import apiProduct from "../../api/apiProduct";


import { useNavigate } from "react-router-dom";
import apiBrand from "../../api/apiBrand";
import axiosInstance from "../../api/axios";


function ProductAdd() {
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [catId, setCatId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [is_on_sale, setIsOnSale] = useState(false);
  const [sale_price, setSalePrice] = useState(0);
  const [image, setImage] = useState(null);
  const [brandId, setBrandId] = useState("");
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    apiCategory.getAll().then((res) => {
      try {
        const categoryData = res.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.category_name,
            slug: item.attributes.slug,
            parent: item.attributes.parent_id,
          };
        });
        setCategories(categoryData);
        if (categoryData.length > 0) {
          if (!catId) {
            setCatId(categoryData[0].id.toString());
          }
        }
        console.log("category", categoryData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  useEffect(() => {
    apiBrand.getAll().then((res) => {
      try {
        const brandData = res.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.name,
            slug: item.attributes.slug,
          };
        });
        setBrands(brandData);
        if (brandData.length > 0) {
          if (!brandId) {
            setBrandId(brandData[0].id.toString());
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
     name: productName,
      slug: slug,
      cat_id: catId,
      price: price,
      description: description,
      image: [],
      category: catId,
      brand_id: brandId,
      brand: brandId,
    };
    console.log("product", productData);

    let file = new FormData();
    file.append("files", image);

    try {
      axiosInstance.enableUploadFile();
      const uploadResponse = await axiosInstance.post("/upload", file);
      const fileId = uploadResponse.data[0].id;
      productData.image.push(fileId);
      console.log("Product data", productData);
      axiosInstance.enableJson();
      const responseProduct = await apiProduct.createProduct({
        data: productData,
      });
      alert("Add successfully");
      navigate("/admin/products/1");
console.log("successful", responseProduct);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div  style={{ maxWidth: "600px" }}>
        <h2
             
             style={{
              
               
               marginBottom: "30px",
               marginLeft:280
             }}
           >
             Add new product
           </h2>
        </div>
        <div className="row">
          <div className="col-lg-12 wow slideInUp" data-wow-delay="0.3s">
            <div className="bg-light rounded p-5">
              <form onSubmit={handleSubmit}>
                {/* <form> */}
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0 px-4"
                      placeholder="Product Name"
                      style={{ height: "55px" }}
                      value={productName}
                      name="productName"
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0 px-4"
                      placeholder="Slug"
                      style={{ height: "55px" }}
                      value={slug}
                      name="slug"
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <select
                      type="text"
                      className="form-control border-0 px-4"
                      placeholder="Slug"
                      style={{ height: "55px" }}
                      value={catId}
                      onChange={(e) => setCatId(e.target.value)}
                      name="cat_id"
                      required
                    >
                      {categories.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-12">
                    <input
                      type="number"
                      className="form-control border-0 px-4"
                      placeholder="Price"
                      style={{ height: "55px" }}
                      value={price}
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
<div className="col-12">
                    <input
                      type="text"
                      className="form-control border-0 px-4"
                      placeholder="Description"
                      style={{ height: "55px" }}
                      value={description}
                      name="adress"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="file"
                      className="form-control border-0 px-4"
                      placeholder="Image"
                      style={{ height: "55px" }}
                      name="image"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <select
                      type="text"
                      className="form-control border-0 px-4"
                      placeholder="Slug"
                      style={{ height: "55px" }}
                      value={brandId}
                      onChange={(e) => setBrandId(e.target.value)}
                      name="parent_id"
                      required
                    >
                       {brands.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-12" style={{paddingTop:20, paddingBottom:50, textAlign:"center"}}>
                <button  className="btn btn-outline-secondary"
                  style={{width:"60px", backgroundColor:"#d96a77",borderradius: "10px", marginRight:30}} type="submit">
                  Add
                </button>
                <Link to="/admin/products/1" className="btn btn-outline-primary" 
                style={{width:"60px", backgroundColor:"#d96a77",borderradius: "10px", marginRight:30}} >Cancel</Link>
              </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductAdd;