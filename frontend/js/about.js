document.addEventListener("DOMContentLoaded", function() {
    // Fetch the combined about JSON data
    fetch("../assets/about.json")
      .then(response => response.json())
      .then(data => {
        // Populate the photo gallery cards
        const cardsContainer = document.getElementById("about-cards-container");
        cardsContainer.innerHTML = "";
        data.cards.forEach(card => {
          const cardHTML = `
            <div class="col-md-4">
              <div class="card shadow-sm about-card">
                <img src="../${card.image}" class="card-img-top" alt="${card.alt}">
                <div class="card-body">
                  <h5 class="card-title">${card.title}</h5>
                  <p class="card-text">${card.description}</p>
                </div>
              </div>
            </div>
          `;
          cardsContainer.innerHTML += cardHTML;
        });
        
        // Populate the testimonials
        const reviewsContainer = document.getElementById("reviews-container");
        reviewsContainer.innerHTML = "";
        data.testimonials.forEach(review => {
          const reviewHTML = `
            <div class="col-md-4 mb-4">
              <div class="card shadow-sm review-card">
                <div class="card-body text-center">
                  <p class="card-text fst-italic">"${review.review}"</p>
                  <p class="review-author">- ${review.author}</p>
                </div>
              </div>
            </div>
          `;
          reviewsContainer.innerHTML += reviewHTML;
        });
      })
      .catch(error => {
        console.error("Error loading about.json:", error);
        document.getElementById("about-cards-container").innerHTML = `
          <div class="col-12 text-center">
            <p class="text-danger">Error loading content. Please try again later.</p>
          </div>`;
        document.getElementById("reviews-container").innerHTML = `
          <div class="col-12 text-center">
            <p class="text-danger">Error loading reviews. Please try again later.</p>
          </div>`;
      });
  });
  