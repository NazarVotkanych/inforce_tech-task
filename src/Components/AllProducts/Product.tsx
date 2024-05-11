import React from "react";
import { Product } from "../../types/Product";

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductDetail;
