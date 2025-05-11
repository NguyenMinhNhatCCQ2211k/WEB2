import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiBrand from "../../api/apiBrand";
import apiCategory from "../../api/apiCategory";
import del from "../category/delete.png";
import edit from "../category/edit.png";

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [delBrandItem, setDelBrandItem] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await apiBrand.getAll();
        const brandData = res.data.map((item) => ({
          id: item.id,
          name: item.attributes.name,
          brand_id: item.attributes.brand_id,
          category_id: item.attributes.category_id,
        }));
        setBrands(brandData);
      } catch (e) {
        console.error("Error fetching brands:", e);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await apiCategory.getAll();
        const categoryData = res.data.map((item) => ({
          id: item.id,
          name: item.attributes.category_name,
        }));
        setCategories(categoryData);
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };

    fetchBrands();
    fetchCategories();
  }, [delBrandItem]);

  const delBrand = async (id) => {
    try {
      await apiBrand.delBrandById(id);
      alert("Delete successfully");
      setDelBrandItem((prev) => !prev);
    } catch (e) {
      console.error("Error deleting brand:", e);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "None";
  };

  return (
    <div className="container my-4">
      <div className="text-center mb-6" style={{ float: 'right', backgroundColor: "#3399F9" }}>
        <Link to="/admin/brandadd" className="btn btn-outline-primary">
          Add new brand
        </Link>
      </div>
      <h1 className="text-center mb-4">Brand List</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Brand ID</th>
              <th scope="col">Category Name</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.brand_id}</td>
                <td>{getCategoryName(item.category_id)}</td>
                <td>
                  <Link to={`/admin/brandedit/${item.id}`}>
                    <img style={{ width: "20px", height: "20px", marginRight: "20px" }} src={edit} alt="Edit" />
                  </Link>
                  <a href="#" onClick={() => delBrand(item.id)}>
                    <img style={{ width: "20px", height: "20px" }} src={del} alt="Delete" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrandList;
