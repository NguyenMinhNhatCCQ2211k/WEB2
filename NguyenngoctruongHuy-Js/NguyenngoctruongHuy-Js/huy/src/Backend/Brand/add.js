import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiCategory from "../../api/apiCategory";
import apiBrand from "../../api/apiBrand";

function BrandAdd() {
  const [brandName, setBrandName] = useState("");
  const [brandID, setBrandID] = useState("");
  const [catId, setCatId] = useState("");

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
        console.log("categories", categoryData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const brand = {
      name: brandName,
      brand_id: parseInt(brandID),
      category_id: parseInt(catId),
    };
    console.log(brand);
    try {
      const response = await apiBrand.createBrand({ data: brand });
      console.log(response);
      alert("Add successfully");
      navigate("/admin/brand");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginLeft: 100 }}>
      <div>
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Add new brand</h2>
          <div className="row g-3">
            <div className="col-12">
              <input
                type="text"
                className="form-control border-0 px-4"
                placeholder="Brand name"
                style={{ height: "55px" }}
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                name="name"
                required
              />
            </div>
            <div className="col-12">
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
            <div className="col-12">
              <select
                className="form-control border-0 px-4"
                style={{ height: "55px" }}
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                name="category_id"
                required
              >
                <option value="">Select category ID</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12" style={{ paddingTop: 20, paddingBottom: 50, textAlign: "center" }}>
              <button
                className="btn btn-outline-primary"
                style={{ backgroundColor: "#3399F9", width: 60, marginRight: 20 }}
                type="submit"
              >
                Add
              </button>
              <Link to="/admin/brand" className="btn btn-outline-primary" style={{ backgroundColor: "#3399F9" }}>
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BrandAdd;
