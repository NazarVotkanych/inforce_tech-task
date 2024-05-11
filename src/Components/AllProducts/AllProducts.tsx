import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDetail from "./Product";
import { Product } from "../../types/Product";
import Categories from "../Categories/Categories";
import Pagination from "../Pagination/Pagination";

const AllProducts: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [filteredProductList, setFilteredProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllProductList();
    getProductCategories();
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProductList = productList.slice(indexOfFirstItem, indexOfLastItem);
    setFilteredProductList(currentProductList);
  }, [currentPage, productList, itemsPerPage]);

  const getAllProductList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProductList(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductCategories = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // const handleProductClick = (product: Product) => {
  //   setSelectedProduct(product);
  // };

  // const handleCloseDetail = () => {
  //   setSelectedProduct(null);
  // };

  const handleCategoryFilter = (category: string) => {
    const filteredProducts = productList.filter(product => product.category === category);
    setFilteredProductList(filteredProducts);
  };

    const handleCloseDetail = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1>Product list</h1>
      <div className="App" style={{ display: "flex" }}>
        <div className="container" style={{ display: "flex" }}>
          <Categories categories={categories} onCategoryFilter={handleCategoryFilter} />
        </div>
        <div className="body" style={{ display: "flex", flexDirection: "column" }}>
          {isLoading && <div>is loading</div>}
          {filteredProductList.map((product) => (
            <div key={product.id}>
              <div
                className="product_container"
                style={{
                  margin: "auto",
                  fontSize: "3vh",
                  marginTop: "2vh",
                  
                }}
              >
                <span>Name: {product.title}</span>
                <br />
                  <span className="card-text" style={{ textAlign: "center", maxWidth: "20px"}}>
                  {product.description}
                </span>
                <br />
                  <span className="btn btn-primary">${product.price}</span>
                <button onClick={() => {setSelectedProduct(product); setIsModalOpen(true);}}>Details</button>
              </div>
              <br />
              <img src={product.thumbnail} alt={product.title} style={{ maxWidth: "200px", maxHeight: "200px" }} />
            </div>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(productList.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
          {selectedProduct && (
            <ProductDetail isOpen={isModalOpen} onClose={handleCloseDetail} product={selectedProduct} />
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
