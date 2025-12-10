import React, { useState } from "react";

const NewsCard = ({ news, refreshNews }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [updatedNews, setUpdatedNews] = useState(news);

  const deleteNews = async () => {
    await fetch(`http://localhost:3001/news/${news.id}`, {
      method: "DELETE",
    });
    refreshNews();
  };

  const updateNews = async () => {
    await fetch(`http://localhost:3001/news/${news.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNews),
    });
    setShowEdit(false);
    refreshNews();
  };

  return (
    <div className="card">
      <img
        src={news.imageUrl || "https://via.placeholder.com/400"}
        alt=""
      />
      <div className="card-body">
        <h3 className="card-title">{news.title}</h3>
        <p className="card-text">{news.description}</p>

        <div className="card-buttons">
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="btn-read"
          >
            Read More
          </a>

          <button className="btn-edit" onClick={() => setShowEdit(true)}>
            Edit
          </button>

          <button className="btn-delete" onClick={deleteNews}>
            Delete
          </button>
        </div>
      </div>

      {showEdit && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit News</h2>

            <input
              className="form-control"
              value={updatedNews.title}
              onChange={(e) =>
                setUpdatedNews({ ...updatedNews, title: e.target.value })
              }
            />

            <textarea
              className="form-control"
              value={updatedNews.description}
              onChange={(e) =>
                setUpdatedNews({
                  ...updatedNews,
                  description: e.target.value,
                })
              }
            />

            <input
              className="form-control"
              value={updatedNews.url}
              onChange={(e) =>
                setUpdatedNews({ ...updatedNews, url: e.target.value })
              }
            />

            <input
              className="form-control"
              value={updatedNews.imageUrl}
              onChange={(e) =>
                setUpdatedNews({
                  ...updatedNews,
                  imageUrl: e.target.value,
                })
              }
            />

            <button className="btn-edit" onClick={updateNews}>
              Save
            </button>
            <button className="btn-delete" onClick={() => setShowEdit(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
