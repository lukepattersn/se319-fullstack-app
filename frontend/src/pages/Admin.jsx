import React, { useState, useEffect } from "react";
import { getApiUrl } from "../config";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Table,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useAuth } from "../components/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { currentUser, login, logout } = useAuth();
  const navigate = useNavigate();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Admin data states
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  // Selected item for edit/delete
  const [selectedItem, setSelectedItem] = useState(null);

  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // New/edit item form
  const [itemForm, setItemForm] = useState({
    product_id: "",
    product_name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true,
  });

  // Check if user is admin on mount
  useEffect(() => {
    const checkAdmin = () => {
      if (currentUser && currentUser.role === "admin") {
        fetchMenuItems();
      }
    };

    checkAdmin();
  }, [currentUser]);

  // Handle login with real authentication
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await login(loginForm.username, loginForm.password);
      // After login, the currentUser will be updated and the useEffect above will run
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Fetch menu items
  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await axios.get(`${getApiUrl()}/menu`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = response.data.data.menu || [];
      setMenuItems(items);

      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...new Set(items.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
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
    const { name, value, type, checked } = e.target;
    setItemForm({
      ...itemForm,
      [name]: type === "checkbox" ? checked : value,
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
      available: true,
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
      available: item.available !== false,
    });
    setSelectedItem(item);

    // Scroll to form
    document.getElementById("item-form").scrollIntoView({ behavior: "smooth" });
  };

  // Confirm delete
  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // Delete an item
  const handleDeleteItem = async () => {
    if (!itemToDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Not authenticated");
      }

      await axios.delete(`${getApiUrl()}/menu/${itemToDelete.product_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Item deleted successfully");
      setShowDeleteModal(false);

      // Refresh menu items
      fetchMenuItems();

      // Reset form if the deleted item was selected
      if (selectedItem && selectedItem.product_id === itemToDelete.product_id) {
        resetItemForm();
      }

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting item:", error);
      setErrorMessage(
        "Failed to delete menu item. " +
          (error.response?.data?.message || "Please try again.")
      );
      setShowDeleteModal(false);
    }
  };

  // Save item (create or update)
  const handleSaveItem = async (e) => {
    e.preventDefault();

    // Validate form
    if (!itemForm.product_name || !itemForm.price || !itemForm.category) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to perform this action");
      return;
    }

    const updatedItem = {
      product_name: itemForm.product_name,
      description: itemForm.description,
      price: parseFloat(itemForm.price),
      category: itemForm.category,
      image: itemForm.image || "/assets/menu_images/default-food.jpg",
      available: itemForm.available,
    };

    try {
      if (selectedItem) {
        // Update existing item
        await axios.put(
          `${getApiUrl()}/menu/${selectedItem.product_id}`,
          updatedItem,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccessMessage("Item updated successfully");
      } else {
        // Add new item
        await axios.post(`${getApiUrl()}/menu`, updatedItem, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMessage("Item added successfully");
      }

      // Refresh menu items
      fetchMenuItems();
      resetItemForm();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error saving item:", error);
      setErrorMessage(
        "Failed to save menu item. " +
          (error.response?.data?.message || "Please try again.")
      );
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Filter menu items
  const filteredItems = menuItems.filter(
    (item) =>
      (filterCategory === "All" || item.category === filterCategory) &&
      (searchTerm === "" ||
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1 pt-5">
        {/* Admin Header */}
        <section className="bg-light py-5">
          <Container>
            <h1 className="display-4 text-center">Admin Dashboard</h1>
            <p className="lead text-center">Manage your restaurant's content</p>
          </Container>
        </section>

        <Container className="py-4">
          {/* Login Form */}
          {!currentUser || currentUser.role !== "admin" ? (
            <Row className="justify-content-center">
              <Col md={6} lg={5}>
                <Card className="shadow border-0">
                  <Card.Header className="bg-danger text-white">
                    <h3 className="mb-0">Admin Login</h3>
                  </Card.Header>
                  <Card.Body className="p-4">
                    {errorMessage && (
                      <Alert
                        variant="danger"
                        onClose={() => setErrorMessage("")}
                        dismissible
                      >
                        {errorMessage}
                      </Alert>
                    )}

                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={loginForm.username}
                          onChange={handleLoginChange}
                          placeholder="Enter admin username"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          placeholder="Enter password"
                          required
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="danger"
                        className="w-100 mt-3"
                        disabled={loginLoading}
                      >
                        {loginLoading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>

                      <p className="text-muted small text-center mt-3">
                        Note: You need admin privileges to access this area
                      </p>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            /* Admin Dashboard */
            <>
              {/* Success/Error Messages */}
              {successMessage && (
                <Alert
                  variant="success"
                  onClose={() => setSuccessMessage("")}
                  dismissible
                  className="shadow-sm"
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {successMessage}
                  </div>
                </Alert>
              )}

              {errorMessage && (
                <Alert
                  variant="danger"
                  onClose={() => setErrorMessage("")}
                  dismissible
                  className="shadow-sm"
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {errorMessage}
                  </div>
                </Alert>
              )}

              {/* Admin Dashboard Interface */}
              <Card className="shadow border-0 mb-4">
                <Card.Header className="bg-danger text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Welcome, {currentUser.username}</h4>
                    <Button variant="outline-light" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </Button>
                  </div>
                </Card.Header>
              </Card>

              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Menu Management</h2>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={resetItemForm}
                      className="d-flex align-items-center px-4 py-2"
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Add New Item
                    </Button>
                  </div>

                  {/* Item Form */}
                  <Card id="item-form" className="shadow border-0 mb-5">
                    <Card.Header className="bg-primary text-white">
                      <h3 className="mb-0">
                        {selectedItem ? "Edit Menu Item" : "Add New Menu Item"}
                      </h3>
                    </Card.Header>
                    <Card.Body className="p-4">
                      <Form onSubmit={handleSaveItem}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Product Name*</Form.Label>
                              <Form.Control
                                type="text"
                                name="product_name"
                                value={itemForm.product_name}
                                onChange={handleItemFormChange}
                                required
                                placeholder="Enter product name"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Category*</Form.Label>
                              <Form.Control
                                type="text"
                                name="category"
                                value={itemForm.category}
                                onChange={handleItemFormChange}
                                required
                                placeholder="E.g. Entree, Side, Dessert"
                                list="categoryOptions"
                              />
                              <datalist id="categoryOptions">
                                {categories
                                  .filter((cat) => cat !== "All")
                                  .map((cat) => (
                                    <option key={cat} value={cat} />
                                  ))}
                              </datalist>
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Price* ($)</Form.Label>
                              <Form.Control
                                type="number"
                                name="price"
                                value={itemForm.price}
                                onChange={handleItemFormChange}
                                required
                                step="0.01"
                                min="0"
                                placeholder="Enter price"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Image Path</Form.Label>
                              <Form.Control
                                type="text"
                                name="image"
                                value={itemForm.image}
                                onChange={handleItemFormChange}
                                placeholder="E.g. /assets/menu_images/item.jpg"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                name="description"
                                value={itemForm.description}
                                onChange={handleItemFormChange}
                                rows="3"
                                placeholder="Enter product description"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Check
                                type="checkbox"
                                name="available"
                                label="Item is Available"
                                checked={itemForm.available}
                                onChange={handleItemFormChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <Button
                            type="button"
                            variant="secondary"
                            size="lg"
                            onClick={resetItemForm}
                            className="px-4"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="px-4"
                          >
                            {selectedItem ? "Update Item" : "Add Item"}
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>

                  {/* Search and Filter */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Search menu items..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          className="w-100"
                        >
                          Filter by Category: {filterCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {categories.map((category) => (
                            <Dropdown.Item
                              key={category}
                              onClick={() => setFilterCategory(category)}
                              active={filterCategory === category}
                            >
                              {category}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>

                  {/* Menu Items List */}
                  {loading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" variant="danger" />
                      <p className="mt-3 text-muted">Loading menu items...</p>
                    </div>
                  ) : (
                    <>
                      {filteredItems.length === 0 ? (
                        <Alert variant="info" className="text-center">
                          No menu items found.{" "}
                          {searchTerm || filterCategory !== "All"
                            ? "Try changing your search or filter."
                            : "Add your first item!"}
                        </Alert>
                      ) : (
                        <Table
                          responsive
                          hover
                          className="shadow-sm table-striped"
                        >
                          <thead className="table-dark">
                            <tr>
                              <th style={{ width: "80px" }}>Image</th>
                              <th>Name</th>
                              <th>Category</th>
                              <th>Price</th>
                              <th>Status</th>
                              <th style={{ width: "250px" }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredItems.map((item) => (
                              <tr key={item.product_id}>
                                <td>
                                  <img
                                    src={item.image}
                                    alt={item.product_name}
                                    className="img-thumbnail"
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </td>
                                <td>
                                  <strong className="fs-5">
                                    {item.product_name}
                                  </strong>
                                  <div
                                    className="small text-muted text-truncate"
                                    style={{ maxWidth: "250px" }}
                                  >
                                    {item.description}
                                  </div>
                                </td>
                                <td>
                                  <Badge
                                    bg="light"
                                    text="dark"
                                    className="fs-6 px-3 py-2"
                                  >
                                    {item.category}
                                  </Badge>
                                </td>
                                <td className="fs-5">
                                  ${item.price.toFixed(2)}
                                </td>
                                <td>
                                  {item.available !== false ? (
                                    <Badge
                                      bg="success"
                                      className="px-3 py-2 fs-6"
                                    >
                                      Available
                                    </Badge>
                                  ) : (
                                    <Badge
                                      bg="secondary"
                                      className="px-3 py-2 fs-6"
                                    >
                                      Unavailable
                                    </Badge>
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <Button
                                      variant="primary"
                                      className="me-2 px-3 py-2"
                                      onClick={() => handleEditItem(item)}
                                    >
                                      <i className="bi bi-pencil me-2"></i>
                                      Edit
                                    </Button>
                                    <Button
                                      variant="danger"
                                      className="px-3 py-2"
                                      onClick={() => confirmDelete(item)}
                                    >
                                      <i className="bi bi-trash me-2"></i>
                                      Delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </>
          )}
        </Container>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the menu item:
          <strong className="d-block mt-2">{itemToDelete?.product_name}</strong>
          <span className="text-muted small">
            This action cannot be undone.
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Delete Item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
