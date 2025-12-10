import React, { useState, useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import axios from "axios";

const categories = [
  "General",
  "Technology",
  "Business",
  "Sports",
  "Politics",
  "Entertainment",
  "Health"
];

const AddNews = () => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    url: "",
    imageUrl: "",
    category: "General",
    customCategory: ""
  });

  // init particles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory =
      article.customCategory.trim() !== ""
        ? article.customCategory.trim()
        : article.category;

    const payload = {
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.imageUrl,
      category: finalCategory
    };

    try {
      await axios.post("http://localhost:5000/news", payload);

      alert("News Added Successfully!");

      setArticle({
        title: "",
        description: "",
        url: "",
        imageUrl: "",
        category: "General",
        customCategory: ""
      });
    } catch (error) {
      console.error("Error adding news:", error);
      alert("Failed to add news. Check console for details.");
    }
  };

  return (
    <>
      {/* ★ Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 120 },
            color: { value: "#00eaff" },
            opacity: {
              value: 0.9,
              animation: { enable: true, speed: 0.7 }
            },
            size: {
              value: 2.5,
              random: { enable: true, minimumValue: 1 }
            },
            move: {
              speed: 0.8,
              direction: "none",
              outModes: { default: "out" }
            },
            glow: {
              enable: true,
              color: "#00eaff"
            },
            links: {
              enable: true,
              distance: 140,
              color: "#00eaff",
              opacity: 0.6,
              width: 1.2
            }
          },
          detectRetina: true,
          fullScreen: { enable: true, zIndex: -1 }
        }}
      />

      {/* Main Page */}
      <div className="add-page">
        <div className="add-card">
          {/* LEFT: FORM */}
          <div className="add-left">
            <h2 className="add-title">📰 Publish a New Article</h2>
            <p className="add-subtitle">
              Fill in the details below to publish a news article to your portal.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <label className="add-label">Title</label>
              <input
                className="add-input"
                name="title"
                placeholder="Enter headline..."
                value={article.title}
                onChange={handleChange}
                required
              />

              {/* Description */}
              <label className="add-label">Description</label>
              <textarea
                className="add-textarea"
                name="description"
                placeholder="Write a short summary..."
                value={article.description}
                onChange={handleChange}
                required
              />

              {/* Category */}
              <label className="add-label">Category</label>
              <div className="add-category-row">
                <select
                  className="add-input"
                  name="category"
                  value={article.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  className="add-input add-input-small"
                  name="customCategory"
                  placeholder="Or type custom"
                  value={article.customCategory}
                  onChange={handleChange}
                />
              </div>

              {/* URL */}
              <label className="add-label">Source URL</label>
              <input
                className="add-input"
                name="url"
                placeholder="https://example.com/article"
                value={article.url}
                onChange={handleChange}
                required
              />

              {/* Image URL */}
              <label className="add-label">Image URL</label>
              <input
                className="add-input"
                name="imageUrl"
                placeholder="Paste image link..."
                value={article.imageUrl}
                onChange={handleChange}
              />

              {/* Button */}
              <button className="add-submit-btn" type="submit">
                Publish Article
              </button>
            </form>
          </div>

          {/* RIGHT: PREVIEW */}
          <div className="add-right">
            <h3 className="preview-title">Live Preview</h3>
            <div className="preview-card">
              {article.imageUrl ? (
                <img
                  src={article.imageUrl}
                  alt="Preview"
                  className="preview-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="preview-placeholder">
                  Image preview will appear here
                </div>
              )}

              <div className="preview-content">
                <span className="preview-category">
                  {article.customCategory.trim() || article.category}
                </span>
                <h4 className="preview-headline">
                  {article.title || "Article headline will appear here"}
                </h4>
                <p className="preview-text">
                  {article.description ||
                    "Write a short description to see how it will look in the card."}
                </p>
                {article.url && (
                  <span className="preview-link">{article.url}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNews;
