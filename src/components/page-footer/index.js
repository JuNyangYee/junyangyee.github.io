import React from 'react';
import './style.scss';

function PageFooter({ author, githubUrl }) {
  return (
    <footer className="page-footer-wrapper">
      <p className="page-footer">
        © {new Date().getFullYear()}
        &nbsp;
        <a href={githubUrl} target='_blank' rel='noreferrer'>{author}</a>
        &nbsp;powered by
        <a href="https://github.com/zoomKoding/zoomkoding-gatsby-blog" target='_blank' rel='noreferrer'>
          &nbsp;zoomkoding-gatsby-blog
        </a>
      </p>
    </footer>
  );
}

export default PageFooter;
