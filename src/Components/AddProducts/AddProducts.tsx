import React, { useState } from "react";
import { Product } from "../../types/Product";
import "./AddProduct.css";

interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ isOpen, onClose, onAddProduct }) => {
  const defaultThumbnail = "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png";

  const [newProduct, setNewProduct] = useState<Product>({
    category: "",
    id: 0,
    title: "",
    price: 0,
    description: "",
    thumbnail: defaultThumbnail,
    categories: ""
  });

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.description || newProduct.price <= 0) {
      alert("Please fill in all required fields.");
      return;
    }
    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={newProduct.thumbnail}
          onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProduct;

