import React, { useState, useEffect } from "react";

const Team = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: "Loading course information...",
    date: "Loading date...",
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team data
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/team.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch team data: ${response.status}`);
        }

        const data = await response.json();
        setCourseInfo({
          name: data.course_name || "Web Development",
          date: data.date || "Fall 2024",
        });
        setTeamMembers(data.team_members || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="bg-light py-5 mt-5">
          <div className="container">
            <h1 className="display-4 text-center">Our Team</h1>
            <p className="lead text-center">
              Meet the passionate people behind our beautiful website
            </p>
          </div>
        </section>

        {/* Container for dynamically loaded content */}
        <div className="container py-5">
          {/* Course Info Section */}
          <section>
            <div className="container">
              <div
                className="mx-auto shadow-sm p-4 rounded-3 bg-white"
                style={{ maxWidth: "800px" }}
              >
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div
                    className="rounded-circle p-2 me-3"
                    style={{ background: "rgba(202, 50, 50, 0.1)" }}
                  >
                    <i
                      className="bi bi-mortarboard-fill"
                      style={{ fontSize: "1.75rem", color: "#ca3232" }}
                    ></i>
                  </div>
                  <h3 id="course-name" className="mb-0 fw-bold">
                    {courseInfo.name}
                  </h3>
                </div>
                <p id="course-date" className="lead text-center text-muted">
                  {courseInfo.date}
                </p>
                <hr className="my-3 w-50 mx-auto" />
                <p className="text-center mb-0">
                  For our midterm project we created a restaurant webpage for
                  <strong className="text-danger">
                    {" "}
                    Jeremiah's Uncle's Food Truck
                  </strong>
                </p>
              </div>
            </div>
          </section>

          {/* Team Members Section */}
          <section className="py-5">
            <div className="container">
              <h2
                className="text-center mb-4 fw-bold"
                style={{ color: "#ca3232" }}
              >
                Meet The Creators
              </h2>

              {loading ? (
                <div className="text-center py-4">
                  <div
                    className="spinner-border"
                    style={{ color: "#ca3232" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading team information...</p>
                </div>
              ) : (
                <div className="row g-4" id="team-members-container">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="card h-100 border-0 rounded-4 shadow overflow-hidden transform-card">
                        <div
                          className="card-img-container position-relative overflow-hidden"
                          style={{ height: "320px" }}
                        >
                          <img
                            src={
                              member.avatar ||
                              "/assets/images/default-avatar.jpg"
                            }
                            alt={member.name}
                            className="card-img position-absolute w-100 h-100"
                            style={{
                              objectFit: "cover",
                              transition: "transform 0.5s ease",
                            }}
                            onMouseOver={(e) =>
                              (e.target.style.transform = "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.transform = "scale(1)")
                            }
                          />
                        </div>
                        <div className="card-body">
                          <h4
                            className="fw-bold mb-1"
                            style={{ color: "#000000" }}
                          >
                            {member.name}
                          </h4>
                          <h5 className="mb-1" style={{ color: "#000000" }}>
                            {member.role}
                          </h5>
                          {member.email && (
                            <p className="mb-3">
                              <i
                                className="bi bi-envelope me-2"
                                style={{ color: "#ca3232" }}
                              ></i>
                              <a
                                href={`mailto:${member.email}`}
                                className="text-decoration-none"
                              >
                                {member.email}
                              </a>
                            </p>
                          )}
                          {member.bio && (
                            <p className="card-text">{member.bio}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .transform-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .transform-card:hover {
          transform: translateY(-10px);
        }
        .img-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 50%
          );
        }
        .card:hover .card-img-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default Team;
