import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiCategory from "../../api/apiCategory";

function CategoryEdit() {
  const { id } = useParams();
  const [catName, setCatName] = useState("");
  const [parentID, setParentID] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("0");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await apiCategory.getCategoryById(id);
        if (res && res.data && res.data.data) {
          const categoryData = res.data.data.attributes;
          setCatName(categoryData.category_name);
          setParentID(categoryData.parent || "0");
          setSlug(categoryData.slug);
          setStatus(categoryData.status.toString());
        } else {
          console.error("Invalid category data:", res);
        }
      } catch (e) {
        console.error("Error fetching category:", e);
      }
    };
    fetchCategory();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCategory.getAll();
        if (res && res.data) {
          const categoryData = res.data.map(item => ({
            id: item.id,
            name: item.attributes.category_name,
            slug: item.attributes.slug,
            parent: item.attributes.parent_id,
          }));
          setCategories(categoryData);
        } else {
          console.error("Invalid categories data:", res);
        }
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const category = {
        category_name: catName,
        parent_id: parseInt(parentID),
        slug: slug,
        status: status,
      };
      const res = await apiCategory.editCategory(id, { data: category });
      if (res.status === 200) {
        alert("Edit successfully");
        navigate("/admin/list");
      } else {
        console.error("Error updating category:", res);
        alert("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category name"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              value={parentID}
              onChange={(e) => setParentID(e.target.value)}
              required
            >
              <option value="0">Không có danh mục cha</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="0">Không hiển thị</option>
              <option value="1">Hiển thị</option>
            </select>
          </div>
          <div className="text-center" style={{paddingBottom:"50px", paddingTop:10}}>
            <button className="btn btn-outline-primary" style={{ backgroundColor:" #3399F9", marginRight:20}}  type="submit">Update Category</button>
            <Link to="/admin/list" className="btn btn-outline-primary" style={{ backgroundColor:" #3399F9"}}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CategoryEdit;
