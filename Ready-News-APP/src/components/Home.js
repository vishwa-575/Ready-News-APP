import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import ParticleBackground from "./ParticleBackground";

const Home = () => {
  const [liveHeadline, setLiveHeadline] = useState("");
  const [liveDescription, setLiveDescription] = useState("");

  useEffect(() => {
    const fetchLiveTechNews = async () => {
      try {
        const res = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=82df1b30cac14ed885dcd2b3b546efe5"
        );

        const article = res.data.articles[0];

        setLiveHeadline(article?.title || "Live Technology News");
        setLiveDescription(
          article?.description || "Latest updates from the world of technology."
        );
      } catch (err) {
        setLiveHeadline("Live Technology News");
        setLiveDescription("Unable to fetch latest technology updates.");
      }
    };

    fetchLiveTechNews();
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className="home-page" style={{ background: "#050B18", color: "white" }}>
      <ParticleBackground />

      {/* HERO SECTION */}
      <section className="hero container" style={{ paddingTop: "80px" }}>
        <div className="hero-content">

          {/* ⭐ Modern READY NEWS LOGO */}
          <div
            style={{
              fontSize: "70px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "6px",
              marginBottom: "20px",
              background: "linear-gradient(90deg, #00eaff, #41a1ff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0px 0px 25px rgba(0, 190, 255, 0.5)",
            }}
          >
            Ready News
          </div>

          <h1
            className="hero-title"
            style={{ color: "#DDE7FF", fontSize: "40px" }}
          >
            Your daily dose of
            <span style={{ color: "#4FB4FF" }}> ready-to-read news.</span>
          </h1>

          <p
            className="hero-subtitle"
            style={{ color: "#9BB7D3", marginTop: "10px" }}
          >
            Create stories, explore curated headlines, and follow live updates.
          </p>

          {/* ACTION BUTTONS */}
          <div className="home-action-buttons" style={{ marginTop: "30px" }}>
            <Link to="/news" className="home-btn home-btn-primary">
              My News
            </Link>

            <Link to="/live" className="home-btn home-btn-accent">
              Live Updates
            </Link>

            <Link to="/add" className="home-btn home-btn-outline">
              Add News
            </Link>
          </div>
        </div>

        {/* LIVE NEWS PREVIEW CARD */}
        <div className="hero-preview">
          <div
            className="hero-preview-card"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "25px",
              borderRadius: "20px",
              maxWidth: "450px",
              boxShadow: "0px 0px 20px rgba(0, 150, 255, 0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className="hero-preview-category"
              style={{ color: "#4FB4FF", fontSize: "14px", marginBottom: "10px" }}
            >
              🔥 LIVE NEWS (Technology)
            </p>

            <h3 className="hero-preview-title" style={{ color: "white" }}>
              {liveHeadline}
            </h3>

            <p className="hero-preview-text" style={{ color: "#AFC7DD" }}>
              {liveDescription}
            </p>

            <Link
              to="/live"
              className="btn-read"
              style={{
                background: "#0066FF",
                padding: "12px 20px",
                borderRadius: "25px",
                color: "white",
                marginTop: "10px",
                display: "inline-block",
              }}
            >
              Read News
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-features container" style={{ marginTop: "80px" }}>
        <h2 className="section-title" style={{ color: "#D4E2F5" }}>
          Why Ready News?
        </h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Write & Publish</h3>
            <p>Create powerful stories with images, links & categories.</p>
          </div>
          <div className="feature-card">
            <h3>Curated Feed</h3>
            <p>Browse saved stories with a clean, organized design.</p>
          </div>
          <div className="feature-card">
            <h3>Live Updates</h3>
            <p>Stay updated with trending news fetched live from APIs.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          width: "100%",
          backgroundColor: "#ece7e7ff",
          padding: "40px 20px",
          marginTop: "80px",
          borderTop: "1px solid #222",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#4FB4FF", marginBottom: "5px" }}>Ready News</h2>
        <p style={{ color: "#9BB7D3" }}>
          Reliable. Fast. Real-time Information.
        </p>

        <p style={{ marginTop: "20px", color: "#556C8A" }}>
          © {year} Ready News — All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;
