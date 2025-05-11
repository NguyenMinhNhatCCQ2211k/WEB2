import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCategory from "../../api/apiCategory";
import del from "./delete.png";
import edit from"./edit.png";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [delCategoryItem, setDelCategoryItem] = useState(false);

  useEffect(() => {
    apiCategory.getAll().then((res) => {
      try {
        const categoryData = res.data.map((item) => ({
          id: item.id,
          name: item.attributes.category_name,
          slug: item.attributes.slug,
          parent: item.attributes.parent_id,
        }));
        setCategories(categoryData);
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    });
  }, [delCategoryItem]);

  const delCategory = async (id) => {
    apiCategory.delCategoryById(id).then((res) => {
      try {
        alert("Delete successfully");
        setDelCategoryItem(prev => !prev); 
      } catch (e) {
        console.error("Error deleting category:", e);
      }
    });
  };

  const getParentName = (parentId) => {
    const parentCategory = categories.find(category => category.id === parentId);
    return parentCategory ? parentCategory.name : "None";
  };

  return (
    <div className="container my-4">
       <div className="text-center mb-6" style={{float:'right', backgroundColor:"#3399F9"}}>
        <Link to="/admin/addCategory" className="btn btn-outline-primary" style={{ backgroundColor:""}} >
          Add new category
        </Link>
      </div>
     
      <h1 className="text-center mb-4">Category List</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category</th>
              <th scope="col">Parent Category</th>
              <th scope="col">Slug</th>
              <th scope="col">Manage</th>
             
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{getParentName(item.parent)}</td>
                <td>{item.slug}</td>
                <td>
                <Link to={`/admin/edit/${item.id}`}>
                  <img style={{width: "20px", height: "20px", marginRight: "20px"}} src={edit} alt="Edit"/>
                </Link>
                <a href="#" onClick={() => delCategory(item.id)}>
                  <img style={{width: "20px", height: "20px"}} src={del} alt="Delete"/>
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

export default CategoryList;
