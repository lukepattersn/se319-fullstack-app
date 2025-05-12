const express = require('express');
const router = express.Router();

// Team data
router.get('/team', (req, res) => {
  const teamData = {
    course_name: "SE/COM S 3190 - Construction of User Interfaces, Spring 2025",
    date: "Spring 2025",
    team_members: [
      {
        name: "Jeremiah Baccam",
        email: "jjbaccam@iastate.edu",
        role: "Frontend Developer",
        avatar: "/assets/team_images/jeremiah.jpg"
      },
      {
        name: "Luke Patterson",
        email: "lukepatt@iastate.edu",
        role: "Backend Developer",
        avatar: "/assets/team_images/luke.jpg"
      }
    ]
  };
  
  res.json(teamData);
});

// About data
router.get('/about', (req, res) => {
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
  
  res.json(aboutData);
});

module.exports = router;