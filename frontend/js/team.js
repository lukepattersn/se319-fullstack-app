document.addEventListener("DOMContentLoaded", function() {
    fetch("../assets/team.json")
        .then(response => response.json())
        .then(data => {
            console.log("Team data loaded:", data);
            
            // Display course information
            document.getElementById("course-name").textContent = data.course_name;
            document.getElementById("course-date").textContent = data.date;
            
            // Display team members
            const teamContainer = document.getElementById("team-members-container");
            teamContainer.innerHTML = ""; // Clear loading message
            
            data.team_members.forEach(member => {
                const memberCard = `
                    <div class="col-md-6 mb-4">
                        <div class="team-member">
                            ${member.avatar ? `<img src="../${member.avatar}" alt="${member.name}" class="avatar mx-auto d-block">` : ''}
                            <h3 class="text-center">${member.name}</h3>
                            <p class="text-center">${member.email}</p>
                            ${member.role ? `<p class="text-center text-muted">${member.role}</p>` : ''}
                        </div>
                    </div>
                `;
                teamContainer.innerHTML += memberCard;
            });
        })
        .catch(error => {
            console.error("Error loading team data:", error);
            document.getElementById("team-members-container").innerHTML = 
                `<div class="col-12 text-center">
                    <p class="text-danger">Error loading team information. Please try again later.</p>
                </div>`;
        });
}); 