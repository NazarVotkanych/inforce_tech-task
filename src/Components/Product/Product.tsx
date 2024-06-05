import React from "react";
import { Product } from "../../types/Product";
import "./Product.css";

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ isOpen, onClose, product, onEdit }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button onClick={onClose}>Close</button>
        <button onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default ProductDetail;
