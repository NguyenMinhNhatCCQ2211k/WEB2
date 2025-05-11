import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import apiCategory from "../../api/apiCategory";
function CategoryAdd() {
  const [catName, setCatName] = useState("");
  const [parentID, setParentID] = useState("");
  const [slug, setSlug] = useState("");
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
        console.log("category", categoryData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = {
      category_name: catName,
      parent_id: parseInt(parentID),
      slug: slug,
    };
    console.log(category);
    try {
      const respone = await apiCategory.createCategory({ data: category });
        console.log(respone);
      alert("Add successfully");
      navigate("/admin/list");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className=""
      style={{  marginLeft:100}}
    >
     
        <div className="">
          <form onSubmit={handleSubmit}>
            <h2
             
              style={{
               
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              Add new category
            </h2>
            <div className="row g-3">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control border-0 px-4"
                  placeholder="Category name"
                  style={{ height: "55px" }}
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  name="category_name"
                  required
                />
              </div>
              <div className="col-12">
                <select
                  type="text"
                  className="form-control border-0 px-4"
                  placeholder="Slug"
                  style={{ height: "55px" }}
                  value={parentID}
                  onChange={(e) => setParentID(e.target.value)}
                  name="parent_id"
                  required
                >
                  <option value="0">Do not have parent category</option>
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
                  type="text"
                  className="form-control border-0 px-4"
                  placeholder="Slug"
                  style={{ height: "55px" }}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  name="slug"
                  required
                />
              </div>
              <div className="col-12" style={{paddingTop:20, paddingBottom:50, textAlign:"center"}}>
                <button className="btn btn-outline-primary" style={{ backgroundColor:" #3399F9", width:60, marginRight:20}} type="submit">
                  Add
                </button>
                <Link to="/admin/list" className="btn btn-outline-primary" style={{ backgroundColor:" #3399F9"}}>Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      
    </div>
  );
}
export default CategoryAdd;
