document.addEventListener("DOMContentLoaded", function () {
    let menuData = [];
    const menuContainer = document.getElementById("menu-container");
    const recommendedContainer = document.getElementById("recommended-container");

    // Function to display main menu items
    function displayMenuItems(items) {
        menuContainer.innerHTML = ""; 
        items.forEach(item => {
            let filterClass = "";
            if (item.category === "Side") {
                filterClass = "filter-side";
            } else if (item.category === "Entree") {
                filterClass = "filter-entree";
            } else {
                filterClass = "filter-badge"; 
            }
            const menuItem = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="../${item.image}" class="card-img-top menu-item-img" alt="${item.product_name}">
                        <div class="card-body">
                            <span class="filter-badge ${filterClass}">${item.category}</span>
                            <h5 class="card-title">${item.product_name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="fw-bold">$${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
            menuContainer.innerHTML += menuItem;
        });
    }


    function displayRecommendedItems(items) {
        recommendedContainer.innerHTML = "";
        items.forEach(item => {
            let filterClass = "";
            if (item.category === "Side") {
                filterClass = "filter-side";
            } else if (item.category === "Entree") {
                filterClass = "filter-entree";
            } else {
                filterClass = "filter-badge"; 
            }
            const recommendedItem = `
                <div class="col-md-6 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="../${item.image}" class="card-img-top menu-item-img" alt="${item.product_name}">
                        <div class="card-body">
                            <span class="filter-badge ${filterClass}">${item.category}</span>
                            <h5 class="card-title">${item.product_name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="fw-bold">$${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
            recommendedContainer.innerHTML += recommendedItem;
        });
    }

    function shuffleArray(array) {
        return array.sort(() => 0.5 - Math.random());
    }

    // Fetch menu data from JSON
    fetch("../assets/data.json")
        .then(response => response.json())
        .then(data => {
            console.log("Menu data loaded:", data);
            menuData = data;
            let shuffledData = shuffleArray([...menuData]); 

            const recommendedItems = shuffledData.slice(0, 2);

            const recommendedIds = recommendedItems.map(item => item.product_id);
            const mainItems = menuData.filter(item => !recommendedIds.includes(item.product_id));

            displayRecommendedItems(recommendedItems);
            displayMenuItems(mainItems);
        })
        .catch(error => console.error("Error loading menu:", error));

    const filterButtons = document.querySelectorAll("#category-filter button");
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            let filteredItems;
            if (category === "all") {
                filteredItems = menuData.filter(item => {
                    return !document.querySelectorAll('#recommended-container [alt]').length || true;
                }).slice(2);
                filteredItems = menuData.slice(2);
            } else {
                filteredItems = menuData.slice(2).filter(item => item.category === category);
            }
            displayMenuItems(filteredItems);
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
