// backend/api/controllers/aboutController.js
const aboutModel = require('../../models/aboutModel');

// @desc    Get about page data
// @route   GET /api/static/about
// @access  Public
exports.getAboutData = async (req, res) => {
  try {
    // Try to get from database first
    let aboutData = await aboutModel.getAboutData();
    
    // If not found in database, use default data
    if (!aboutData) {
      aboutData = {
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
      
      // Save default data to database
      await aboutModel.updateAboutData(aboutData);
    }
    
    res.status(200).json(aboutData);
  } catch (error) {
    console.error('Error fetching about data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching about data',
      error: error.message
    });
  }
};

// @desc    Update about page data
// @route   PUT /api/static/about
// @access  Private/Admin
exports.updateAboutData = async (req, res) => {
  try {
    const updatedData = await aboutModel.updateAboutData(req.body);
    
    res.status(200).json({
      success: true,
      message: 'About data updated successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Error updating about data:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating about data',
      error: error.message
    });
  }
};