const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const menuData = [
  {
    product_id: 1,
    product_name: "3 Pack Egg Rolls",
    description: "Mom's secret recipe! No need to explain!",
    image: "/assets/menu_images/eggrolls.jpg",
    category: "Side",
    price: 6.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    product_id: 2,
    product_name: "3 Pack Crabmeat Rangoons",
    description: "Cream cheese, imitation crab meat, onions, carrots, & our special seasonings served with sweet chili sauce.",
    image: "/assets/menu_images/crabmeat-rangoon.jpg",
    category: "Side",
    price: 6.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    product_id: 3,
    product_name: "3 Street Tacos",
    description: "Sirloin steak marinated in our special Asian flavors, grilled & served in white corn tortillas, onions, cilantro & lime.",
    image: "/assets/menu_images/street-tacos.jpg",
    category: "Entree",
    price: 9.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    product_id: 4,
    product_name: "Sweet & Spicy Chicken",
    description: "Seasoned & breaded chicken, fried & wok stir fried in our House-made sweet & spicy sauce, bell peppers, onions, pineapple, sesame seeds & green onions. Served with jasmine rice.",
    image: "/assets/menu_images/sweet-and-spicy.jpg",
    category: "Entree",
    price: 13.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    product_id: 5,
    product_name: "Chicken Fried Rice",
    description: "Cooked to order & always fresh!",
    image: "/assets/menu_images/chicken-fried-rice.jpg",
    category: "Entree",
    price: 8.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    product_id: 6,
    product_name: "Chicken NUGZ",
    description: "Hand breaded & deep fried chicken NUGZ (nuggets). Served with sweet chili sauce.",
    image: "/assets/menu_images/chicken-nugz.jpg",
    category: "Entree",
    price: 12.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    product_id: 7,
    product_name: "Khao Man Gai",
    description: "Thai chicken rice, grilled chicken thighs served on a bed of jasmine rice, cucumbers, cilantro & our special sauce.",
    image: "/assets/menu_images/khao-man-gai.jpg",
    category: "Entree",
    price: 12.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    product_id: 8,
    product_name: "Mongolian Beef Philly Cheesesteak",
    description: "Grilled sirloin steak, provolone cheese, green onions & cilantro.",
    image: "/assets/menu_images/mongolian-steak.jpg",
    category: "Entree",
    price: 12.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    product_id: 9,
    product_name: "Side Fried Rice",
    description: "Side fried rice, no chicken.",
    image: "/assets/menu_images/fried-rice.jpg",
    category: "Side",
    price: 4.00,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const seedDatabase = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log('Connected to database');

    // Clear existing data
    await db.collection('menuitems').deleteMany({});
    console.log('Cleared menu items');

    // Insert menu data
    await db.collection('menuitems').insertMany(menuData);
    console.log('Menu items seeded successfully');

    // Create admin user if doesn't exist
    const adminExists = await db.collection('users').findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('password', 10);
      await db.collection('users').insertOne({
        username: 'admin',
        email: 'admin@streetfoodfighter.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Admin user created');
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
};

seedDatabase();