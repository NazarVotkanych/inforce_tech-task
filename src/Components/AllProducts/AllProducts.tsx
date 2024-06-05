import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDetail from "../Product/Product";
import { Product } from "../../types/Product";
import Pagination from "../Pagination/Pagination";
import AddProduct from "../AddProducts/AddProducts";
import "./AllProduct.css";

const AllProducts: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [filteredProductList, setFilteredProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    getAllProductList();
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

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddProduct = (newProduct: Product) => {
  const updatedProductList = [...productList];
  updatedProductList.unshift(newProduct);
  setProductList(updatedProductList);
};

const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      const updatedProducts = productList.filter((product) => product.id !== productToDelete.id);
      setProductList(updatedProducts);
    }
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleEditProduct = (product: Product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
};

  return (
    <>
      <h1>Product list</h1>
      <div className="App">
        <div className="container">
        </div>
        <div className="body">
          
          {isLoading && <div>is loading</div>}
          {filteredProductList.map((product) => (
            <div key={product.id}>
              <div className="product_container">
                <span>Name: {product.title}</span>
                <br />
                <span className="card-text">
                  {product.description}
                </span>
                <br />
                <span className="btn btn-primary">${product.price}</span>
                <button className="button-def" onClick={() => {setSelectedProduct(product); setIsModalOpen(true);}}>Details</button>
                <button className="button-def" onClick={() => handleDeleteProduct(product)}>Delete</button>
                <br />
                <img src={product.thumbnail} alt={product.title} />
              </div>
            </div>
          ))}
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(productList.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
          {selectedProduct && (
            <ProductDetail
              isOpen={isModalOpen}
              onClose={handleCloseDetail}
              product={selectedProduct}
              onEdit={() => handleEditProduct(selectedProduct)}
            />
          )}

          <button className="add-button" onClick={() => setIsAddModalOpen(true)}>Add Product</button>
      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <div className={`modal ${isDeleteModalOpen ? "open" : ""}`}>
        <div className="modal" onClick={handleCloseDeleteModal}></div>
        <div className="modal-content">
          <h2>Підтвердження видалення</h2>
          <p>Впевнені?</p>
          <button onClick={confirmDeleteProduct}>Yes</button>
          <button onClick={handleCloseDeleteModal}>Cancel</button>
        </div>
      </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
