import React from 'react';
import './NewsArticleView.css';
import { useParams, useNavigate } from 'react-router-dom';
import newsData from '../../data/news.json'; // Direct path link to your data folder

export default function NewsArticleView({}) {
  const { id } = useParams(); // Extracts the exact ID string out of the browser address bar
  const navigate = useNavigate();

  // Find the specific article matching that URL param ID
  const article = newsData.find(item => item.id === id);

  // Fallback state control if someone types an invalid link sequence
  if (!article) {
    return (
      <div className="page-container text-center">
        <h2>Article Not Found</h2>
        <button onClick={() => navigate('/news')} className="btn-action-primary">
          Back to News Feed
        </button>
      </div>
    );
  }


  return (
    <article className="full-news-article">
      <header className="article-title-header">
        <h1>{article.title}</h1>
        <time className="article-meta-date">{article.date}</time>
      </header>
      
      <hr className="article-divider" />

      {/* Main Full-Width Banner Hero */}
      {article.heroImage && (
        <div className="article-hero-frame">
          <img src={article.heroImage.src} alt={article.heroImage.alt} className="img-fluid-hero" />
        </div>
      )}

      {/* Flexible Structural Dynamic Content Blocks */}
      <div className="article-body-content">
        {article.bodyBlocks.map((block, idx) => {
          switch (block.type) {
            case 'text':
              return <p key={idx} className="article-p">{block.content}</p>;
              
            case 'quote':
              return <blockquote key={idx} className="article-blockquote">{block.content}</blockquote>;
              
            case 'media-text':
              return (
                <div key={idx} className={`article-media-row float-${block.imageSide}`}>
                  <img src={block.imageSrc} alt={block.imageAlt} className="article-inline-img" />
                  <p className="article-p">{block.content}</p>
                </div>
              );
              
            case 'organization-list':
              return (
                <div key={idx} className="organization-link-directory">
                  <p className="article-p">{block.introText}</p>
                  <ul className="org-links-grid">
                    {block.organizations.map((org, oIdx) => (
                      <li key={oIdx}>
                        <a href={org.url} target="_blank" rel="noopener noreferrer" className="org-inline-link">
                          {org.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
              
            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}