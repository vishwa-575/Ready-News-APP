import React, { useEffect, useState } from 'react';

const LiveNews = () => {
  const [liveNews, setLiveNews] = useState([]);
  const [category, setCategory] = useState("general");

  const apiKey = "82df1b30cac14ed885dcd2b3b546efe5";

  const categories = ["general", "business", "technology", "sports", "entertainment", "health"];

  const fetchNews = (cat) => {
    setCategory(cat);
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=${apiKey}`)
      .then(res => res.json())
      .then(data => setLiveNews(data.articles || []));
  };

  useEffect(() => {
    fetchNews("general");
  }, []);

  const saveArticle = async (news) => {
    const savedData = {
      title: news.title,
      description: news.description,
      url: news.url,
      imageUrl: news.urlToImage
    };

    await fetch("http://localhost:3001/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(savedData)
    });

    alert("Saved to My News!");
  };

  return (
    <div className="container">
      <h2>Live Trending News</h2>

      {/* Category Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`nav-btn ${category === cat ? "active" : ""}`}
            onClick={() => fetchNews(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="news-grid">
        {liveNews.map((news, index) => (
          <div key={index} className="card">
            <img src={news.urlToImage || "https://via.placeholder.com/400"} alt="" />
            
            <div className="card-body">
              <h3 className="card-title">{news.title}</h3>
              <p className="card-text">{news.description}</p>

              {/* FIXED: button row layout */}
              <div className="card-buttons">
                <a
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-read"
                >
                  Read More
                </a>

                <button
                  className="btn-save"
                  onClick={() => saveArticle(news)}
                >
                  Save to My News
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveNews;
