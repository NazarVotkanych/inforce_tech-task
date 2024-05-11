import React from "react";

interface CategoriesProps {
  categories: string[];
  onCategoryFilter: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categories, onCategoryFilter }) => {
  if (categories.length === 0) {
    return <div className="categories">Товар в дорозі</div>;
  }

  return (
    <div className="categories" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <h5>All categories</h5>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {categories.map((category) => (
          <button key={category} onClick={() => onCategoryFilter(category)} style={{ marginBottom: "5px" }}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;


