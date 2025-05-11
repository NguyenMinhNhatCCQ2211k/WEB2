import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { imageURL } from "../../api/config";
import apiProduct from "../../api/apiProduct";
import apiCategory from "../../api/apiCategory";
import apiBrand from "../../api/apiBrand";
import axiosInstance from "../../api/axios";

function ProductEdit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [catId, setCatId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [image, setImage] = useState(null);
  const [brandId, setBrandId] = useState("");
  const [brandName, setBrandName] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imageId, setImageId] = useState(0);

  useEffect(() => {
    apiProduct
      .getDetailProductById(id)
      .then((res) => {
        try {
          const productAttributes = res.data[0].attributes;
          console.log("Product attributes:", productAttributes);
          setName(productAttributes.name);
          setPrice(productAttributes.price);
          setSlug(productAttributes.slug);
          setImage(productAttributes.image.data.attributes.url);
          setDescription(productAttributes.description);
          setCatId(productAttributes.cat_id);
          setBrandId(productAttributes.brand_id);
          setImageId(productAttributes.image.data.id);
          setBrandName(productAttributes.brand.data.attributes.name);
          console.log("Product details:", productAttributes);
        } catch (error) {
          console.log("Error processing data: ", error.message);
        }
      })
      .catch((err) => {
        console.log("Error fetching data: ", err.message);
      });
  }, []);

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
        console.log("brandData", brandData);
        setBrands(brandData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: name,
      slug: slug,
      cat_id: catId,
      price: price.toString(),
      description: description,
      image: [imageId],
      brand_id: brandId,
      category: catId,
      brand: brandId,
    };
    console.log("product", productData);

    let file = new FormData();
    file.append("files", image);

    const fileObject = file.get("files");
    if (fileObject instanceof File) {
      if (fileObject !== "") {
        axiosInstance.enableUploadFile();
        const res = await axiosInstance.post("/upload", file);
        const fileId = res.data[0].id;
        productData.image[0] = fileId;
      } else {
        console.log("File object is empty");
      }
    } else {
      console.log("File object is not a file");
    }
    axiosInstance.enableJson();
    const responseProduct = await apiProduct.editProduct(id, {
      data: productData,
    });
    alert("Edit successfully");
    navigate("/admin/products/1");
  };

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
          <h2 style={{ marginLeft: 220, marginBottom: "30px" }}>Edit product</h2>
        </div>
        <div className="row">
          <div className="col-lg-12 wow slideInUp" data-wow-delay="0.3s">
            <div className="bg-light rounded p-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 form-group">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control border-0 px-4"
                      style={{ height: "55px" }}
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <input
                      type="text"
                      id="slug"
                      className="form-control border-0 px-4"
                      style={{ height: "55px" }}
                      value={slug}
                      name="slug"
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                      id="category"
                      className="form-control border-0 px-4"
                      style={{ height: "55px" }}
                      value={catId}
                      onChange={(e) => setCatId(e.target.value)}
                      name="cat_id"
                      required
                    >
                      {categories.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 form-group">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                      type="text"
                      id="price"
                      className="form-control border-0 px-4"
                      style={{ height: "55px" }}
                      value={price}
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                      type="text"
                      id="description"
                      className="form-control border-0 px-4"
                      style={{ height: "55px" }}
                      value={description}
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 form-group">
                    <img
                      src={imageURL + image}
                      alt={name}
                      style={{ width: "100px", height: "80px" }}
                    />
                    <input
                      type="file"
                      id="image"
                      className="form-control border-0 px-4"
                      style={{ height: "55px" }}
                      name="image"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  <div className="col-12">
                    <select
                      type="text"
                      className="form-control border-0 px-4"
                      style={{ height: "55px" }}
                      value={brandId}
                      onChange={(e) => setBrandId(e.target.value)}
                      name="brand_id"
                      required
                    >
                      {brands.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-outline-primary"
                      style={{
                        width: "60px",
                        backgroundColor: "#d96a77",
                        borderRadius: "10px",
                        marginLeft: "300px",
                        marginTop: "20px",
                        marginBottom: 30,
                      }}
                      type="submit"
                    >
                      Update
                    </button>
                    <Link
                      to="/admin/products/1"
                      className="btn btn-outline-primary"
                      style={{
                        width: "60px",
                        backgroundColor: "#d96a77",
                        borderRadius: "10px",
                        marginLeft: 30,
                        marginTop: "20px",
                        marginBottom: 30,
                      }}
                    >
                      Cancel
                    </Link>
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

export default ProductEdit;
