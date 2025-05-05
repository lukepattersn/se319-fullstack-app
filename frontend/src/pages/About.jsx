// src/pages/About.jsx
import React, { useState, useEffect } from "react";

const About = () => {
  const [aboutCards, setAboutCards] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch about data
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/about.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch about data: ${response.status}`);
        }

        const data = await response.json();
        setAboutCards(data.cards || []);
        setReviews(data.testimonials || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1">
        {/* Hero Section */}
        <section
          className="bg-gradient"
          style={{
            background: "linear-gradient(135deg, #ca3232 0%, #e84545 100%)",
          }}
        >
          <div className="container">
            <h1 className="display-4 text-center text-white fw-bold">
              About The Street Food Fighter
            </h1>
            <p className="lead text-center text-white">
              Family-owned &amp; operated since 2016. Fresh, never frozen, and
              always made with love!
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section>
          <div className="container">
            <h2
              className="text-center mb-4 fw-bold"
              style={{ color: "#ca3232" }}
            >
              Our Story
            </h2>
            <div
              className="mx-auto shadow-sm p-4 rounded-3 bg-white"
              style={{ maxWidth: "800px" }}
            >
              <p className="lead">
                Established in 2016, we are a{" "}
                <strong className="text-danger">
                  Lao &amp; Tai Dam family
                </strong>{" "}
                owned &amp; operated Food Truck located in Cedar Rapids, Iowa.
                We serve Asian-inspired fusion street food with a passion that
                comes from family and tradition. We believe that the purest way
                to spread love is through food. Every dish is prepared fresh—
                <strong className="text-danger">NEVER frozen</strong>—as if you
                were part of our family.
              </p>
              <p className="mb-0">
                Our menu features favorites like{" "}
                <span className="fw-semibold">
                  Mongolian Beef Philly Cheesesteak
                </span>
                , <span className="fw-semibold">Khao Man Gai</span> (Thai
                Chicken Rice, The SFF style),
                <span className="fw-semibold">Steak Tacos</span>,{" "}
                <span className="fw-semibold">Pork Egg Rolls</span>,{" "}
                <span className="fw-semibold">Crabmeat Rangoons</span>, and
                more. Whether you're joining us at a local event or ordering for
                a private party, you're in for an unforgettable experience.
              </p>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="py-5">
          <div className="container">
            <h2
              className="text-center mb-4 fw-bold"
              style={{ color: "#ca3232" }}
            >
              A Glimpse Into Our World
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
                <p className="mt-3 text-muted">Loading gallery...</p>
              </div>
            ) : (
              <div className="row g-4" id="about-cards-container">
                {aboutCards.map((card, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 rounded-4 shadow overflow-hidden transform-card">
                      <div
                        className="card-img-container position-relative overflow-hidden"
                        style={{ height: "320px" }}
                      >
                        <img
                          src={card.image}
                          alt={card.alt || card.title}
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
                        <div className="img-overlay position-absolute d-flex align-items-end w-100 h-100 p-3">
                          <h4 className="card-overlay-title text-white fw-bold mb-0 z-1">
                            {card.title}
                          </h4>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-5" id="testimonials">
          <div className="container">
            <h2
              className="text-center mb-5 fw-bold"
              style={{ color: "#ca3232" }}
            >
              What People Are Saying
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
                <p className="mt-3 text-muted">Loading testimonials...</p>
              </div>
            ) : (
              <div className="row g-4" id="reviews-container">
                {reviews.map((review, index) => (
                  <div key={index} className="col-lg-6">
                    <div className="testimonial-card position-relative mb-4">
                      <div className="testimonial-content p-4 rounded-4 bg-white shadow position-relative z-1">
                        <div
                          className="quote-icon position-absolute"
                          style={{ top: "20px", right: "20px" }}
                        >
                          <i
                            className="bi bi-quote fs-1"
                            style={{ color: "rgba(202, 50, 50, 0.1)" }}
                          ></i>
                        </div>
                        <div className="stars-container mb-3">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi ${
                                i < (review.rating || 5)
                                  ? "bi-star-fill"
                                  : "bi-star"
                              }`}
                              style={{
                                color:
                                  i < (review.rating || 5)
                                    ? "#ffb700"
                                    : "#dee2e6",
                                fontSize: "18px",
                                marginRight: "4px",
                              }}
                            ></i>
                          ))}
                        </div>
                        <p className="review-text fs-5 fw-light mb-4 lh-lg">
                          "{review.review || review.comment}"
                        </p>
                        <div className="author-bar mt-4 pt-3 border-top">
                          <h5
                            className="author-name fw-bold mb-0"
                            style={{ color: "#ca3232" }}
                          >
                            {review.author}
                          </h5>
                          <p className="text-muted mb-0">
                            {review.location || "Satisfied Customer"}
                          </p>
                        </div>
                      </div>
                      <div
                        className="testimonial-bg position-absolute"
                        style={{
                          bottom: "-10px",
                          right: "-10px",
                          width: "95%",
                          height: "100%",
                          background:
                            "linear-gradient(135deg, #e84545 0%, #ca3232 100%)",
                          borderRadius: "16px",
                          zIndex: "0",
                          opacity: "0.15",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        .transform-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .transform-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .img-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 50%
          );
        }
        .testimonial-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-3px);
        }
        .testimonial-card:hover .testimonial-bg {
          opacity: 0.25;
        }
        .testimonial-content {
          transition: box-shadow 0.3s ease;
        }
        .testimonial-card:hover .testimonial-content {
          box-shadow: 0 10px 25px rgba(202, 50, 50, 0.15) !important;
        }
        .review-text {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default About;
