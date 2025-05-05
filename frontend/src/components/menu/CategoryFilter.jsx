import React from "react";
import { Button } from "react-bootstrap";

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => (
  <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
    {categories.map((category) => (
      <Button
        key={category}
        variant={activeCategory === category ? "danger" : "outline-danger"}
        onClick={() => setActiveCategory(category)}
        className="text-nowrap"
      >
        {category}
      </Button>
    ))}
  </div>
);

export default CategoryFilter;
