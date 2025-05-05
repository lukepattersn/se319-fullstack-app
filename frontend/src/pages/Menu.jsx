// src/pages/Menu.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Hero from "../components/sections/HeroCarousel";
import CategoryFilter from "../components/menu/CategoryFilter";
import MenuItemGrid from "../components/menu/MenuItemGrid";
import { useCart } from "../components/cart/CartContext";

const Menu = () => {
  // Menu state
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get cart methods from context
  const { addToCart } = useCart();

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/assets/data.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch menu data: ${response.status}`);
        }

        const data = await response.json();
        const items = data.menu || [];
        setMenuItems(items);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(items.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError("Failed to load menu items. Please try again later.");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter menu items based on active category
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section className="bg-light py-5 mt-5">
        <div className="container">
          <h1 className="display-4 text-center">Our Menu</h1>
          <p className="lead text-center">
            Fresh, handcrafted dishes made with love.
          </p>
        </div>
      </section>

      <Container className="py-5">
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="danger">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3 text-muted">Loading menu...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <>
            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            {/* Menu Items Grid */}
            <MenuItemGrid items={filteredItems} onAddToCart={addToCart} />

            {filteredItems.length === 0 && (
              <Alert variant="info" className="mt-5">
                No items found in this category.
              </Alert>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Menu;
