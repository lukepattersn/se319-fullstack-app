// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

import FormInput from "../components/common/FormInput";

const Admin = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Admin data states
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Selected item for edit/delete
  const [selectedItem, setSelectedItem] = useState(null);

  // New/edit item form
  const [itemForm, setItemForm] = useState({
    product_id: "",
    product_name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // Mock login for demonstration
  const handleLogin = (e) => {
    e.preventDefault();
    // For demo purposes only - in real app would validate against server
    if (loginForm.username === "admin" && loginForm.password === "password") {
      setIsAuthenticated(true);
      setLoginError("");

      // Fetch menu items after successful login
      fetchMenuItems();
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // Fetch menu items
  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/assets/data.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch menu data: ${response.status}`);
      }

      const data = await response.json();
      setMenuItems(data.menu || []);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setErrorMessage("Failed to load menu items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  // Handle item form changes
  const handleItemFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm({
      ...itemForm,
      [name]: value,
    });
  };

  // Reset item form
  const resetItemForm = () => {
    setItemForm({
      product_id: "",
      product_name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    setSelectedItem(null);
  };

  // Select item for editing
  const handleEditItem = (item) => {
    setItemForm({
      product_id: item.product_id,
      product_name: item.product_name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
    });
    setSelectedItem(item);

    // Scroll to form
    document.getElementById("item-form").scrollIntoView({ behavior: "smooth" });
  };

  // Delete an item (mock function)
  const handleDeleteItem = (itemId) => {
    // In a real app, this would call an API
    setMenuItems(menuItems.filter((item) => item.product_id !== itemId));
    setSuccessMessage("Item deleted successfully");
    setTimeout(() => setSuccessMessage(""), 3000);

    // Reset form if the deleted item was selected
    if (selectedItem && selectedItem.product_id === itemId) {
      resetItemForm();
    }
  };

  // Save item (create or update)
  const handleSaveItem = (e) => {
    e.preventDefault();

    // Validate form
    if (!itemForm.product_name || !itemForm.price || !itemForm.category) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    const updatedItem = {
      product_id: itemForm.product_id || Math.floor(Math.random() * 1000) + 10, // Generate ID if new item
      product_name: itemForm.product_name,
      description: itemForm.description,
      price: parseFloat(itemForm.price),
      category: itemForm.category,
      image: itemForm.image || "/assets/menu_images/default-food.jpg",
    };

    if (selectedItem) {
      // Update existing item
      setMenuItems(
        menuItems.map((item) =>
          item.product_id === updatedItem.product_id ? updatedItem : item
        )
      );
      setSuccessMessage("Item updated successfully");
    } else {
      // Add new item
      setMenuItems([...menuItems, updatedItem]);
      setSuccessMessage("Item added successfully");
    }

    resetItemForm();
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    resetItemForm();
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <main className="flex-grow-1 pt-5 mt-5">
        {/* Admin Header */}
        <section className="bg-light py-5">
          <Container>
            <h1 className="display-4 text-center">Admin Dashboard</h1>
            <p className="lead text-center">Manage your restaurant's content</p>
          </Container>
        </section>

        <Container className="py-4">
          {/* Login Form */}
          {!isAuthenticated ? (
            <Row className="justify-content-center">
              <Col md={6} lg={5}>
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h2 className="text-center mb-4">Admin Login</h2>

                    {loginError && <Alert variant="danger">{loginError}</Alert>}

                    <form onSubmit={handleLogin}>
                      <FormInput
                        id="username"
                        name="username"
                        label="Username"
                        placeholder="Enter admin username"
                        value={loginForm.username}
                        onChange={handleLoginChange}
                        required
                      />

                      <FormInput
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        required
                      />

                      <Button
                        type="submit"
                        variant="danger"
                        className="w-100 mt-3"
                      >
                        Login
                      </Button>

                      <p className="text-muted small text-center mt-3">
                        Demo credentials: username "admin" / password "password"
                      </p>
                    </form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            /* Admin Dashboard */
            <>
              {/* Success/Error Messages */}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              {/* Navigation Tabs */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <Button
                    variant={
                      activeTab === "menu" ? "danger" : "outline-secondary"
                    }
                    className="nav-link"
                    onClick={() => setActiveTab("menu")}
                  >
                    Menu Items
                  </Button>
                </li>
                <li className="nav-item">
                  <Button
                    variant={
                      activeTab === "orders" ? "danger" : "outline-secondary"
                    }
                    className="nav-link"
                    onClick={() => setActiveTab("orders")}
                  >
                    Orders
                  </Button>
                </li>
                <li className="nav-item">
                  <Button
                    variant={
                      activeTab === "settings" ? "danger" : "outline-secondary"
                    }
                    className="nav-link"
                    onClick={() => setActiveTab("settings")}
                  >
                    Settings
                  </Button>
                </li>
                <li className="nav-item ms-auto">
                  <Button variant="outline-danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </li>
              </ul>

              {/* Content based on active tab */}
              {activeTab === "menu" && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Menu Management</h2>
                    <Button
                      variant="danger"
                      onClick={resetItemForm}
                      className="d-flex align-items-center"
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Add New Item
                    </Button>
                  </div>

                  {/* Item Form */}
                  <Card id="item-form" className="shadow-sm border-0 mb-5">
                    <Card.Body className="p-4">
                      <h3 className="mb-3">
                        {selectedItem ? "Edit Menu Item" : "Add New Menu Item"}
                      </h3>

                      <form onSubmit={handleSaveItem}>
                        <Row>
                          <Col md={6}>
                            <FormInput
                              id="product_name"
                              name="product_name"
                              label="Product Name"
                              placeholder="Enter product name"
                              value={itemForm.product_name}
                              onChange={handleItemFormChange}
                              required
                            />
                          </Col>

                          <Col md={6}>
                            <FormInput
                              id="category"
                              name="category"
                              label="Category"
                              placeholder="E.g. Entree, Side, Dessert"
                              value={itemForm.category}
                              onChange={handleItemFormChange}
                              required
                            />
                          </Col>

                          <Col md={6}>
                            <FormInput
                              id="price"
                              name="price"
                              type="number"
                              label="Price"
                              placeholder="Enter price"
                              value={itemForm.price}
                              onChange={handleItemFormChange}
                              required
                              step="0.01"
                              min="0"
                            />
                          </Col>

                          <Col md={6}>
                            <FormInput
                              id="image"
                              name="image"
                              label="Image Path"
                              placeholder="E.g. assets/menu_images/item.jpg"
                              value={itemForm.image}
                              onChange={handleItemFormChange}
                            />
                          </Col>

                          <Col md={12}>
                            <div className="mb-3">
                              <label
                                htmlFor="description"
                                className="form-label"
                              >
                                Description
                              </label>
                              <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                rows="3"
                                placeholder="Enter product description"
                                value={itemForm.description}
                                onChange={handleItemFormChange}
                              />
                            </div>
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={resetItemForm}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" variant="danger">
                            {selectedItem ? "Update Item" : "Add Item"}
                          </Button>
                        </div>
                      </form>
                    </Card.Body>
                  </Card>

                  {/* Menu Items Grid */}
                  {loading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" variant="danger" />
                      <p className="mt-3 text-muted">Loading menu items...</p>
                    </div>
                  ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                      {menuItems.map((item) => (
                        <Col key={item.product_id}>
                          <Card className="h-100 shadow-sm">
                            <Card.Img
                              variant="top"
                              src={item.image}
                              alt={item.product_name}
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body className="d-flex flex-column">
                              <div className="d-flex justify-content-between align-items-start mb-3">
                                <Card.Title className="mb-0">
                                  {item.product_name}
                                </Card.Title>
                                <Badge bg="danger" pill>
                                  ${item.price.toFixed(2)}
                                </Badge>
                              </div>
                              <Card.Text className="text-muted small flex-grow-1">
                                {item.description}
                              </Card.Text>
                              <div className="d-flex justify-content-between align-items-center">
                                <Badge bg="light" text="dark" pill>
                                  {item.category}
                                </Badge>
                                <div>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEditItem(item)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteItem(item.product_id)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}

                      {menuItems.length === 0 && (
                        <Col xs={12}>
                          <Alert variant="info" className="text-center">
                            No menu items found. Add your first item!
                          </Alert>
                        </Col>
                      )}
                    </Row>
                  )}
                </div>
              )}

              {activeTab === "orders" && (
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h2 className="mb-3">Orders</h2>
                    <Alert variant="info">
                      Order management functionality coming soon. This section
                      will allow you to view and manage customer orders.
                    </Alert>
                  </Card.Body>
                </Card>
              )}

              {activeTab === "settings" && (
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h2 className="mb-3">Settings</h2>
                    <Alert variant="info">
                      Settings functionality coming soon. This section will
                      allow you to configure your restaurant's information,
                      opening hours, and other settings.
                    </Alert>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Admin;
