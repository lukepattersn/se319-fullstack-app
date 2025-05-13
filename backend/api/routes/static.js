// backend/api/routes/static.js
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { getAboutData, updateAboutData } = require('../controllers/aboutController');

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
router.get('/about', getAboutData);

// Admin routes for updating about data
router.put('/about', protect, admin, updateAboutData);

module.exports = router;