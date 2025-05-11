import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../api/apiProduct";
import { imageURL } from "../../api/config";
import detail from "../../frontend/assets/img/detail.jpg";
import del from"../category/delete.png";
import edit from"../category/edit.png";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [delProductItem, setDelProductItem] = useState(0);
  const page = parseInt(useParams().page);
  const limit = 5;
  useEffect(() => {
    apiProduct.getProductPagination(page, limit).then((res) => {
      try {
        const numberOfPages = Math.ceil(
          res.meta.pagination.total / res.meta.pagination.pageSize
        );
        setPages(numberOfPages);
        const productsData = res.data.map((item) => {
          return {
            id: item.id,
            product_name: item.attributes.name,
            slug: item.attributes.slug,
            cat_name: item.attributes.category.data.attributes.category_name,
            description: item.attributes.description,
            is_on_sale: item.attributes.is_on_sale,
            price: item.attributes.price,
            sale_price: item.attributes.sale_price,
            image: item.attributes.image.data.attributes.url,
          };
        });
        setProducts(productsData);
        console.log("Product list: ", productsData);
        // setPages(res.pages);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    });
  });
  const delProduct = (id) => {
    apiProduct.delProductById(id).then((res) => {
      try {
        console.log(res);
        alert("Delete product succesfully");
        setDelProductItem(id);
      } catch (e) {
        console.log(e);
      }
    });
  };
  return (
    <div className="container my-4">


<div className="text-center mb-6" style={{float:'right', backgroundColor:"#3399F9"}}>
        <Link to="/admin/addproduct" className="btn btn-outline-primary" style={{ backgroundColor:""}} >
          Add new product
        </Link>
      </div>
     
      <h1 className="" style={{textAlign:'center'}}>Product List</h1>  
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Slug</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={imageURL + product.image}
                    style={{ width: "80px", height: "60px" }}
                  ></img>
                </td>
                <td>{product.product_name}</td>
                <td>{product.cat_name}</td>
                <td>{product.price}</td>
                <td>{product.slug}</td>
                
                <td>
                <Link
                        to={`/admin/editProduct/${product.id}`}>
                    <img style={{width: "20px", height: "20px", marginLeft: "10px", marginTop:10}} src={edit} alt="Edit"/>
                  </Link>
                </td>
               
<td>
                  <a href="#"  onClick={() => delProduct(product.id)}>
                    <img style={{width: "20px", height: "20px", marginTop:10}} src={del} alt="Delete"/>
                  </a>
              </td>

             
               
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className="pagination">
        <li className="page-item">
          {" "}
          <Link className="page-link" to={`/admin/products/ ${page - 1}`}>
            Previous
          </Link>
        </li>
        {Array.from(Array(pages).keys()).map((index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === page ? "active" : ""}`}
          >
            <Link className="page-link" to={`/admin/products/${index + 1}`}>
              {index + 1}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link
            className="page-link"
            to={`/admin/products/
        ${page + 1}`}
          >
            Next
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default ProductList;
