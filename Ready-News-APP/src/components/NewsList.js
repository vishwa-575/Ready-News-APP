import React, { useEffect, useState } from 'react';

const NewsList = () => {
  const [customNews, setCustomNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/news")
      .then(res => res.json())
      .then(data => setCustomNews(data))
      .catch(err => console.error(err));
  }, []);

  // 🔍 Filter
  const filteredNews = customNews.filter(item =>
    (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.description || "").toLowerCase().includes(search.toLowerCase())
  );

  // ✏ Edit
  const startEdit = (article) => {
    setEditingNews({ ...article });
    setShowModal(true);
  };

  // 💾 Save Edited
  const saveEdit = async () => {
    await fetch(`http://localhost:3001/news/${editingNews.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingNews)
    });

    alert("News Updated Successfully!");

    fetch("http://localhost:3001/news")
      .then(res => res.json())
      .then(data => setCustomNews(data));

    setShowModal(false);
  };

  // 🗑 Delete
  const deleteArticle = async (id) => {
    await fetch(`http://localhost:3001/news/${id}`, { method: "DELETE" });
    setCustomNews(customNews.filter(item => item.id !== id));
    alert("News Deleted!");
  };

  return (
    <div className="container">
      <h2>Your Articles</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search your news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="news-grid">
        {filteredNews.map(article => (
          <div key={article.id} className="card">
            <img src={article.imageUrl || "https://via.placeholder.com/400"} alt="" />
            <div className="card-body">
              <h3 className="card-title">{article.title}</h3>
              <p className="card-text">{article.description}</p>

              <div className="card-buttons">
                <a href={article.url} target="_blank" rel="noreferrer" className="btn-read">
                  Read More
                </a>

                <button className="btn-edit" onClick={() => startEdit(article)}>
                  Edit
                </button>

                <button className="btn-delete" onClick={() => deleteArticle(article.id)}>
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ✏ Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>Edit Article</h2>

            <input
              className="form-control mb-2"
              value={editingNews.title}
              onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
            />

            <input
              className="form-control mb-2"
              value={editingNews.description}
              onChange={(e) => setEditingNews({ ...editingNews, description: e.target.value })}
            />

            <input
              className="form-control mb-2"
              value={editingNews.url}
              onChange={(e) => setEditingNews({ ...editingNews, url: e.target.value })}
            />

            <input
              className="form-control mb-2"
              value={editingNews.imageUrl}
              onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
            />

            <button className="btn-save" onClick={saveEdit}>Save</button>
            <button className="btn-cancel ms-2" onClick={() => setShowModal(false)}>Cancel</button>

          </div>
        </div>
      )}

    </div>
  );
};

export default NewsList;
