document.addEventListener("DOMContentLoaded", function() {
    fetch("../assets/catering.json")
        .then(response => response.json())
        .then(data => {
            console.log("Catering data loaded:", data);
            
            const packagesContainer = document.getElementById("catering-packages");
            packagesContainer.innerHTML = ""; // Clear loading message
            
            data.forEach(pkg => {
                const packageCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow">
                            <img src="../${pkg.image}" class="card-img-top" alt="${pkg.name}" style="height: 200px; object-fit: cover;">
                            <div class="card-body">
                                <h3 class="card-title">${pkg.name}</h3>
                                <p class="card-text">${pkg.description}</p>
                                <ul class="list-group list-group-flush mb-3">
                                    ${pkg.features.map(feature => `
                                        <li class="list-group-item"><i class="bi bi-check-circle-fill text-success me-2"></i>${feature}</li>
                                    `).join('')}
                                </ul>
                                <div class="text-center">
                                    <a href="#contact-form" class="btn btn-outline-danger">Request Quote</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                packagesContainer.innerHTML += packageCard;
            });
        })
        .catch(error => {
            console.error("Error loading catering data:", error);
            document.getElementById("catering-packages").innerHTML = 
                `<div class="col-12 text-center">
                    <p class="text-danger">Error loading catering packages. Please try again later.</p>
                </div>`;
        });
}); 