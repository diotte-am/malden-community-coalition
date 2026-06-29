import React from 'react';

export default function NewsCard({ item }) {
  return (
    <article className="horizontal-row-card news-preview-card">
      <div className="card-content-stack news-preview-stack">
        <header className="news-preview-header">
          <h3 className="card-title-highlight news-preview-title">{item.title}</h3>
          <span className="card-meta-badge news-preview-badge">{item.date}</span>
        </header>
        <p className="card-description-body news-preview-body">{item.body}</p>
      </div>
    </article>
  );
}