import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

type Blog = {
  title: string;
  url: string;
  date: string;
  blog_image: { url: string };
  body: string;
};

type Props = {
  blogs: Blog[];
};

export const BlogSection = ({ blogs }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    console.log('blogs', blogs);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    
  }, []);

  return (
    <section style={{ margin: isMobile ? '20px' : '50px' }}>
      <h2
        style={{
         // textAlign: 'center',
          marginBottom: isMobile ? '24px' : '32px',
          fontSize: isMobile ? '20px' : '28px',
        }}
      >
        Related Blogs
      </h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '48px',

        }}
      >
        {blogs.map((blog, index) => (
          <div
            key={index}
            style={{
              width: isMobile ? '90%' : '300px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'left',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              background: '#fff',
              transition: 'transform 0.3s ease',
            }}
          >
            <p style={{ fontSize: 12, color: 'black', marginBottom: '12px' }}>
              {blog.title} / {new Date(blog.date).toDateString()}
            </p>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>
              {blog.body.slice(3,100)}...
            </h3>
            <img
              src={blog.blog_image.url}
              alt={blog.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
