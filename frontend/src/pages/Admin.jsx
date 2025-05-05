// import React, { useState, useEffect } from "react";
// import Navbar from "../components/layout/Navbar";
// import Foorter from "../components/layout/Footer";
// import Hero from "../components/sections/HeroCarousel";
// import Card from "../components/common/Card";
// import Button from "../components/common/Button";
// import FormInput from "../components/common/FormInput";
// import TestimonialSection from "../components/sections/TestimonialSection";

// /**
//  * Admin page component
//  *
//  * @returns {JSX.Element} - Rendered Admin page component
//  */
// const Admin = () => {
//   // State for authentication
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   // State for login form
//   const [loginForm, setLoginForm] = useState({
//     username: "",
//     password: "",
//   });
//   const [loginError, setLoginError] = useState("");

//   // State for active tab
//   const [activeTab, setActiveTab] = useState("dashboard");

//   // State for menu items
//   const [menuItems, setMenuItems] = useState([]);

//   // State for new menu item form
//   const [newMenuItem, setNewMenuItem] = useState({
//     product_name: "",
//     description: "",
//     price: "",
//     category: "Entree",
//     image: "",
//   });
//   const [formErrors, setFormErrors] = useState({});

//   // Stats data
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     pendingOrders: 0,
//     completedOrders: 0,
//     menuItemCount: 0,
//     testimonialCount: 0,
//   });

//   // Check if user is already authenticated
//   useEffect(() => {
//     const checkAuth = () => {
//       // In a real implementation, this would make an API call to verify the token
//       const token = localStorage.getItem("adminToken");
//       if (token) {
//         // Mock authentication for demonstration
//         setIsAuthenticated(true);
//         setUser({
//           name: "Admin User",
//           email: "admin@streetfoodfighter.com",
//           role: "Administrator",
//         });

//         // Fetch menu items and stats
//         fetchMenuItems();
//         fetchStats();
//       }
//     };

//     checkAuth();
//   }, []);

//   // Mock fetch menu items
//   const fetchMenuItems = () => {
//     // In a real implementation, this would make an API call
//     const mockMenuData = [
//       {
//         id: 1,
//         product_name: "3 Pack Egg Rolls",
//         description: "Mom's secret recipe! No need to explain!",
//         image: "/assets/menu_images/eggrolls.jpg",
//         category: "Side",
//         price: 6.0,
//       },
//       {
//         id: 2,
//         product_name: "3 Pack Crabmeat Rangoons",
//         description:
//           "Cream cheese, imitation crab meat, onions, carrots, & our special seasonings served with sweet chili sauce.",
//         image: "/assets/menu_images/crabmeat-rangoon.jpg",
//         category: "Side",
//         price: 6.0,
//       },
//       {
//         id: 3,
//         product_name: "3 Street Tacos",
//         description:
//           "Sirloin steak marinated in our special Asian flavors, grilled & served in white corn tortillas, onions, cilantro & lime.",
//         image: "/assets/menu_images/street-tacos.jpg",
//         category: "Entree",
//         price: 9.0,
//       },
//     ];

//     setMenuItems(mockMenuData);
//   };

//   // Mock fetch stats
//   const fetchStats = () => {
//     // In a real implementation, this would make an API call
//     const mockStats = {
//       totalOrders: 156,
//       totalRevenue: 4275.25,
//       pendingOrders: 8,
//       completedOrders: 148,
//       menuItemCount: 9,
//       testimonialCount: 12,
//     };

//     setStats(mockStats);
//   };

//   // Handle login form input change
//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginForm({
//       ...loginForm,
//       [name]: value,
//     });

//     // Clear error when user types
//     if (loginError) {
//       setLoginError("");
//     }
//   };

//   // Handle login form submit
//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Simple validation
//     if (!loginForm.username || !loginForm.password) {
//       setLoginError("Please enter both username and password.");
//       return;
//     }

//     // Mock authentication for demonstration
//     if (loginForm.username === "admin" && loginForm.password === "password") {
//       // In a real implementation, this would make an API call to get a token
//       localStorage.setItem("adminToken", "mock-token-value");

//       setIsAuthenticated(true);
//       setUser({
//         name: "Admin User",
//         email: "admin@streetfoodfighter.com",
//         role: "Administrator",
//       });

//       // Fetch menu items and stats
//       fetchMenuItems();
//       fetchStats();
//     } else {
//       setLoginError(
//         "Invalid username or password. Try using 'admin' and 'password'."
//       );
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     // In a real implementation, this would make an API call to invalidate the token
//     localStorage.removeItem("adminToken");

//     setIsAuthenticated(false);
//     setUser(null);
//     setActiveTab("dashboard");
//   };

//   // Handle new menu item form input change
//   const handleMenuItemChange = (e) => {
//     const { name, value } = e.target;
//     setNewMenuItem({
//       ...newMenuItem,
//       [name]: value,
//     });

//     // Clear error for this field
//     if (formErrors[name]) {
//       setFormErrors({
//         ...formErrors,
//         [name]: "",
//       });
//     }
//   };

//   // Handle new menu item form submit
//   const handleAddMenuItem = (e) => {
//     e.preventDefault();

//     // Validate form
//     const errors = {};
//     if (!newMenuItem.product_name)
//       errors.product_name = "Product name is required";
//     if (!newMenuItem.description)
//       errors.description = "Description is required";
//     if (!newMenuItem.price) errors.price = "Price is required";
//     else if (isNaN(parseFloat(newMenuItem.price)))
//       errors.price = "Price must be a number";
//     if (!newMenuItem.category) errors.category = "Category is required";

//     // If there are errors, show them and don't submit
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     // In a real implementation, this would make an API call to add the item
//     // Mock implementation for demonstration
//     const newItem = {
//       id: menuItems.length + 1,
//       product_name: newMenuItem.product_name,
//       description: newMenuItem.description,
//       price: parseFloat(newMenuItem.price),
//       category: newMenuItem.category,
//       image: newMenuItem.image || "/assets/menu_images/placeholder.jpg",
//     };

//     // Add the new item to the menu items list
//     setMenuItems([...menuItems, newItem]);

//     // Update stats
//     setStats({
//       ...stats,
//       menuItemCount: stats.menuItemCount + 1,
//     });

//     // Reset the form
//     setNewMenuItem({
//       product_name: "",
//       description: "",
//       price: "",
//       category: "Entree",
//       image: "",
//     });

//     // Show success message
//     alert("Menu item added successfully!");
//   };

//   // Handle edit menu item
//   const handleEditMenuItem = (item) => {
//     // Set the form values to the selected item
//     setNewMenuItem({
//       product_name: item.product_name,
//       description: item.description,
//       price: item.price.toString(),
//       category: item.category,
//       image: item.image,
//     });

//     // Scroll to the form
//     document
//       .getElementById("menu-item-form")
//       .scrollIntoView({ behavior: "smooth" });
//   };

//   // Handle delete menu item
//   const handleDeleteMenuItem = (item) => {
//     // Confirm deletion
//     if (
//       window.confirm(`Are you sure you want to delete "${item.product_name}"?`)
//     ) {
//       // In a real implementation, this would make an API call to delete the item
//       // Mock implementation for demonstration
//       setMenuItems(menuItems.filter((menuItem) => menuItem.id !== item.id));

//       // Update stats
//       setStats({
//         ...stats,
//         menuItemCount: stats.menuItemCount - 1,
//       });

//       // Show success message
//       alert("Menu item deleted successfully!");
//     }
//   };

//   // Render login form
//   const renderLoginForm = () => (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <Card title="Admin Login" shadow={true}>
//             <form onSubmit={handleLogin}>
//               <FormInput
//                 type="text"
//                 id="username"
//                 name="username"
//                 label="Username"
//                 value={loginForm.username}
//                 onChange={handleLoginChange}
//                 placeholder="Enter username"
//                 required={true}
//               />

//               <FormInput
//                 type="password"
//                 id="password"
//                 name="password"
//                 label="Password"
//                 value={loginForm.password}
//                 onChange={handleLoginChange}
//                 placeholder="Enter password"
//                 required={true}
//               />

//               {loginError && (
//                 <div className="alert alert-danger" role="alert">
//                   {loginError}
//                 </div>
//               )}

//               <div className="d-grid gap-2">
//                 <Button type="submit" variant="danger" block={true}>
//                   Log In
//                 </Button>
//               </div>

//               <div className="mt-3 text-muted text-center">
//                 <small>
//                   <strong>Demo Credentials:</strong> Username: admin, Password:
//                   password
//                 </small>
//               </div>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );

//   // Render admin panel
//   const renderAdminPanel = () => (
//     <div className="container-fluid py-4">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3 col-lg-2">
//           <div className="list-group mb-4">
//             <button
//               className={`list-group-item list-group-item-action ${
//                 activeTab === "dashboard" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("dashboard")}
//             >
//               <i className="bi bi-speedometer2 me-2"></i> Dashboard
//             </button>
//             <button
//               className={`list-group-item list-group-item-action ${
//                 activeTab === "menu" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("menu")}
//             >
//               <i className="bi bi-menu-button-wide me-2"></i> Menu Items
//             </button>
//             <button
//               className={`list-group-item list-group-item-action ${
//                 activeTab === "testimonials" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("testimonials")}
//             >
//               <i className="bi bi-chat-quote me-2"></i> Testimonials
//             </button>
//             <button
//               className={`list-group-item list-group-item-action ${
//                 activeTab === "orders" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("orders")}
//             >
//               <i className="bi bi-bag me-2"></i> Orders
//             </button>
//             <button
//               className="list-group-item list-group-item-action text-danger"
//               onClick={handleLogout}
//             >
//               <i className="bi bi-box-arrow-right me-2"></i> Logout
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 col-lg-10">
//           {/* Dashboard */}
//           {activeTab === "dashboard" && (
//             <div>
//               <h2 className="mb-4">Dashboard</h2>

//               {/* Stats Cards */}
//               <div className="row g-4 mb-4">
//                 <div className="col-md-6 col-lg-4">
//                   <Card className="bg-primary text-white h-100">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h6 className="text-white-50">Total Orders</h6>
//                         <h2 className="mb-0">{stats.totalOrders}</h2>
//                       </div>
//                       <i className="bi bi-bag-check fs-1 opacity-25"></i>
//                     </div>
//                   </Card>
//                 </div>

//                 <div className="col-md-6 col-lg-4">
//                   <Card className="bg-success text-white h-100">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h6 className="text-white-50">Total Revenue</h6>
//                         <h2 className="mb-0">
//                           ${stats.totalRevenue.toFixed(2)}
//                         </h2>
//                       </div>
//                       <i className="bi bi-currency-dollar fs-1 opacity-25"></i>
//                     </div>
//                   </Card>
//                 </div>

//                 <div className="col-md-6 col-lg-4">
//                   <Card className="bg-warning text-white h-100">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h6 className="text-white-50">Pending Orders</h6>
//                         <h2 className="mb-0">{stats.pendingOrders}</h2>
//                       </div>
//                       <i className="bi bi-hourglass-split fs-1 opacity-25"></i>
//                     </div>
//                   </Card>
//                 </div>

//                 <div className="col-md-6 col-lg-4">
//                   <Card className="bg-info text-white h-100">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h6 className="text-white-50">Completed Orders</h6>
//                         <h2 className="mb-0">{stats.completedOrders}</h2>
//                       </div>
//                       <i className="bi bi-check-circle fs-1 opacity-25"></i>
//                     </div>
//                   </Card>
//                 </div>

//                 <div className="col-md-6 col-lg-4">
//                   <Card className="bg-danger text-white h-100">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h6 className="text-white-50">Menu Items</h6>
//                         <h2 className="mb-0">{stats.menuItemCount}</h2>
//                       </div>
//                       <i className="bi bi-menu-button fs-1 opacity-25"></i>
//                     </div>
//                   </Card>
//                 </div>

//                 <div className="col-md-6 col-lg-4">
//                   <Card className="bg-secondary text-white h-100">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h6 className="text-white-50">Testimonials</h6>
//                         <h2 className="mb-0">{stats.testimonialCount}</h2>
//                       </div>
//                       <i className="bi bi-chat-quote fs-1 opacity-25"></i>
//                     </div>
//                   </Card>
//                 </div>
//               </div>

//               {/* Recent Activity */}
//               <Card title="Recent Activity" className="mb-4">
//                 <div className="list-group list-group-flush">
//                   <div className="list-group-item">
//                     <div className="d-flex w-100 justify-content-between">
//                       <div>
//                         <h6 className="mb-1">New order received</h6>
//                         <p className="mb-1 text-muted">Order #54321 - $42.75</p>
//                       </div>
//                       <small className="text-muted">5 minutes ago</small>
//                     </div>
//                   </div>

//                   <div className="list-group-item">
//                     <div className="d-flex w-100 justify-content-between">
//                       <div>
//                         <h6 className="mb-1">New testimonial submitted</h6>
//                         <p className="mb-1 text-muted">
//                           From: Michael Johnson - 5 stars
//                         </p>
//                       </div>
//                       <small className="text-muted">1 hour ago</small>
//                     </div>
//                   </div>

//                   <div className="list-group-item">
//                     <div className="d-flex w-100 justify-content-between">
//                       <div>
//                         <h6 className="mb-1">Order completed</h6>
//                         <p className="mb-1 text-muted">Order #54318 - $65.50</p>
//                       </div>
//                       <small className="text-muted">2 hours ago</small>
//                     </div>
//                   </div>

//                   <div className="list-group-item">
//                     <div className="d-flex w-100 justify-content-between">
//                       <div>
//                         <h6 className="mb-1">Menu item updated</h6>
//                         <p className="mb-1 text-muted">
//                           Crabmeat Rangoons - Price updated to $6.00
//                         </p>
//                       </div>
//                       <small className="text-muted">Yesterday</small>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           )}

//           {/* Menu Items */}
//           {activeTab === "menu" && (
//             <div>
//               <h2 className="mb-4">Manage Menu Items</h2>

//               {/* Add/Edit Menu Item Form */}
//               <Card
//                 title="Add/Edit Menu Item"
//                 className="mb-4"
//                 id="menu-item-form"
//               >
//                 <form onSubmit={handleAddMenuItem}>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <FormInput
//                         type="text"
//                         id="product_name"
//                         name="product_name"
//                         label="Product Name"
//                         value={newMenuItem.product_name}
//                         onChange={handleMenuItemChange}
//                         placeholder="Enter product name"
//                         required={true}
//                         error={formErrors.product_name}
//                       />
//                     </div>

//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="category" className="form-label">
//                           Category
//                         </label>
//                         <select
//                           className="form-select"
//                           id="category"
//                           name="category"
//                           value={newMenuItem.category}
//                           onChange={handleMenuItemChange}
//                           required
//                         >
//                           <option value="Entree">Entree</option>
//                           <option value="Side">Side</option>
//                           <option value="Dessert">Dessert</option>
//                           <option value="Beverage">Beverage</option>
//                         </select>
//                         {formErrors.category && (
//                           <div className="invalid-feedback d-block">
//                             {formErrors.category}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <FormInput
//                     type="text"
//                     id="description"
//                     name="description"
//                     label="Description"
//                     value={newMenuItem.description}
//                     onChange={handleMenuItemChange}
//                     placeholder="Enter description"
//                     required={true}
//                     error={formErrors.description}
//                   />

//                   <div className="row">
//                     <div className="col-md-6">
//                       <FormInput
//                         type="text"
//                         id="price"
//                         name="price"
//                         label="Price"
//                         value={newMenuItem.price}
//                         onChange={handleMenuItemChange}
//                         placeholder="Enter price"
//                         required={true}
//                         error={formErrors.price}
//                       />
//                     </div>

//                     <div className="col-md-6">
//                       <FormInput
//                         type="text"
//                         id="image"
//                         name="image"
//                         label="Image URL"
//                         value={newMenuItem.image}
//                         onChange={handleMenuItemChange}
//                         placeholder="Enter image URL"
//                         helpText="Leave empty for default image"
//                       />
//                     </div>
//                   </div>

//                   <div className="text-end">
//                     <Button type="submit" variant="danger" icon="plus-circle">
//                       {newMenuItem.id ? "Update Menu Item" : "Add Menu Item"}
//                     </Button>
//                   </div>
//                 </form>
//               </Card>

//               {/* Menu Items List */}
//               <Card title="Menu Items">
//                 <MenuItems
//                   initialItems={menuItems}
//                   showRecommended={false}
//                   isAdmin={true}
//                   onEdit={handleEditMenuItem}
//                   onDelete={handleDeleteMenuItem}
//                 />
//               </Card>
//             </div>
//           )}

//           {/* Testimonials */}
//           {activeTab === "testimonials" && (
//             <div>
//               <h2 className="mb-4">Manage Testimonials</h2>

//               <TestimonialSection
//                 isAdmin={true}
//                 onEdit={(testimonial) =>
//                   alert(`Edit testimonial: ${testimonial.author}`)
//                 }
//                 onDelete={(testimonial) =>
//                   alert(`Delete testimonial: ${testimonial.author}`)
//                 }
//                 onAdd={() => alert("Add testimonial")}
//               />
//             </div>
//           )}

//           {/* Orders */}
//           {activeTab === "orders" && (
//             <div>
//               <h2 className="mb-4">Manage Orders</h2>

//               <Card title="Recent Orders">
//                 <div className="table-responsive">
//                   <table className="table table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th>Order ID</th>
//                         <th>Customer</th>
//                         <th>Date</th>
//                         <th>Items</th>
//                         <th>Total</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>#54321</td>
//                         <td>John Doe</td>
//                         <td>May 4, 2025</td>
//                         <td>3 items</td>
//                         <td>$42.75</td>
//                         <td>
//                           <span className="badge bg-warning">Pending</span>
//                         </td>
//                         <td>
//                           <div className="btn-group btn-group-sm">
//                             <button className="btn btn-outline-primary">
//                               View
//                             </button>
//                             <button className="btn btn-outline-success">
//                               Complete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>

//                       <tr>
//                         <td>#54320</td>
//                         <td>Jane Smith</td>
//                         <td>May 4, 2025</td>
//                         <td>2 items</td>
//                         <td>$18.50</td>
//                         <td>
//                           <span className="badge bg-warning">Pending</span>
//                         </td>
//                         <td>
//                           <div className="btn-group btn-group-sm">
//                             <button className="btn btn-outline-primary">
//                               View
//                             </button>
//                             <button className="btn btn-outline-success">
//                               Complete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>

//                       <tr>
//                         <td>#54319</td>
//                         <td>Mike Johnson</td>
//                         <td>May 4, 2025</td>
//                         <td>4 items</td>
//                         <td>$54.25</td>
//                         <td>
//                           <span className="badge bg-success">Completed</span>
//                         </td>
//                         <td>
//                           <button className="btn btn-sm btn-outline-primary">
//                             View
//                           </button>
//                         </td>
//                       </tr>

//                       <tr>
//                         <td>#54318</td>
//                         <td>Sarah Williams</td>
//                         <td>May 3, 2025</td>
//                         <td>5 items</td>
//                         <td>$65.50</td>
//                         <td>
//                           <span className="badge bg-success">Completed</span>
//                         </td>
//                         <td>
//                           <button className="btn btn-sm btn-outline-primary">
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="admin-page">
//       <Navbar />

//       {/* Hero Section */}
//       <Hero
//         title="Admin Dashboard"
//         subtitle={
//           isAuthenticated
//             ? `Welcome, ${user?.name}`
//             : "Login to access admin features"
//         }
//       />

//       {/* Main Content */}
//       {isAuthenticated ? renderAdminPanel() : renderLoginForm()}

//       <Footer />
//     </div>
//   );
// };

// export default Admin;
