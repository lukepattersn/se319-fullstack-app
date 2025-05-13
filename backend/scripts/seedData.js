const { MongoClient } = require('mongodb');
require('dotenv').config();

const aboutData = {
  cards: [
    {
      title: "Supporting Our Troops",
      image: "/assets/about/army.jpg",
      alt: "Donating Lunch to Soldiers",
      description: "We love giving back to our community by supporting our troops."
    },
    {
      title: "Events & Festivals",
      image: "/assets/about/event.jpg",
      alt: "Food Truck at an Event",
      description: "Catch us at local festivals, parties, and diverse events around Cedar Rapids."
    },
    {
      title: "Inside the Truck",
      image: "/assets/about/inside_truck.jpg",
      alt: "Inside the Food Truck",
      description: "Experience our mobile kitchen where every dish is made fresh on the spot."
    },
    {
      title: "Our Community",
      image: "/assets/about/people.jpg",
      alt: "Our Community",
      description: "Our customers and team are like family. We cherish every moment shared."
    },
    {
      title: "Food is Love",
      image: "/assets/about/rangoons.jpg",
      alt: "Delicious Food",
      description: "Our food is a celebration of flavor and heart. Every dish we create is crafted with pride, passion, and a belief that good food brings people together."
    },
    {
      title: "On the Move",
      image: "/assets/about/truck.jpg",
      alt: "The Street Food Fighter Truck",
      description: "Our truck is always on the move, bringing fresh flavors to the streets of Cedar Rapids."
    }
  ],
  testimonials: [
    {
      review: "BEST CRAB RANGOONS in town! Run don't walk. Great food!",
      author: "Vicki"
    },
    {
      review: "Everything about this truck is wonderful. Fresh and delicious, a must-try in Cedar Rapids!",
      author: "Nicole"
    },
    {
      review: "Ope is the best and the crab rangoons are 10/10! The Street Food Fighter never disappoints.",
      author: "Barbara"
    }
  ]
};

const seedAboutData = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log('Connected to database');

    // Check if about data already exists
    const existingData = await db.collection('about').findOne({});
    
    if (existingData) {
      console.log('About data already exists, updating...');
      await db.collection('about').updateOne(
        { _id: existingData._id },
        { 
          $set: {
            ...aboutData,
            updatedAt: new Date()
          } 
        }
      );
    } else {
      console.log('Creating new about data...');
      await db.collection('about').insertOne({
        ...aboutData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    console.log('About data seeded successfully');
  } catch (error) {
    console.error('Error seeding about data:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
};

seedAboutData();