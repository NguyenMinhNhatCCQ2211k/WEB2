import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiCategory from "../../api/apiCategory";
import apiBrand from "../../api/apiBrand";

function BrandEdit() {
  const { id } = useParams();
  const [brandName, setBrandName] = useState("");
  const [brandID, setBrandID] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [status, setStatus] = useState("0");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await apiBrand.getBrandById(id);
        if (res && res.data && res.data.data) {
          const brandData = res.data.data.attributes;
          setBrandName(brandData.name);
          setBrandID(brandData.brand_id || "");
          setCategoryID(brandData.category_id || "0");
          setStatus(brandData.status.toString());
        } else {
          console.error("Invalid brand data:", res);
        }
      } catch (e) {
        console.error("Error fetching brand:", e);
      }
    };
    fetchBrand();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCategory.getAll();
        if (res && res.data) {
          const categoryData = res.data.map((item) => ({
            id: item.id,
            name: item.attributes.category_name,
            slug: item.attributes.slug,
            parent: item.attributes.parent_id,
          }));
          setCategories(categoryData);
          if (categoryData.length > 0 && !categoryID) {
            setCategoryID(categoryData[0].id.toString());
          }
        } else {
          console.error("Invalid categories data:", res);
        }
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };
    fetchCategories();

    const fetchBrands = async () => {
      try {
        const res = await apiBrand.getAll();
        if (res && res.data) {
          const brandData = res.data.map((item) => ({
            id: item.id,
            name: item.attributes.name,
            brand_id: item.attributes.brand_id,
            category_id: item.attributes.category_id,
          }));
          setBrands(brandData);
        } else {
          console.error("Invalid brands data:", res);
        }
      } catch (e) {
        console.error("Error fetching brands:", e);
      }
    };
    fetchBrands();
  }, [categoryID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const brand = {
        name: brandName,
        brand_id: parseInt(brandID),
        category_id: parseInt(categoryID),
        status: status,
      };
      const res = await apiBrand.editBrand(id, { data: brand });
      if (res.status === 200) {
        alert("Edit successfully");
        navigate("/admin/brand");
      } else {
        console.error("Error updating brand:", res);
        alert("Failed to update brand");
      }
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Edit Brand</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Brand name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
          <input
                type="text"
                className="form-control border-0 px-4"
                placeholder="Brand ID"
                style={{ height: "55px" }}
                value={brandID}
                onChange={(e) => setBrandID(e.target.value)}
                name="brand_id"
                required
              />
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
              required
            >
              <option value="0">No Category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
         
          <div className="text-center" style={{paddingBottom:"50px", paddingTop:10}}>
          <button
                className="btn btn-outline-primary"
                style={{ backgroundColor: "#3399F9", width: 60, marginRight: 20 }}
                type="submit"
              >
               Update
              </button>
            <Link to="/admin/brand" className="btn btn-outline-primary" style={{ backgroundColor:" #3399F9"}}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BrandEdit;
