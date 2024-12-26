import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div style={containerStyle}>
       <Helmet>
        <html lang="en" />
        <title>404 - Page Not Found | AlCheez</title>
        <meta name="description" content="404 - The page you are looking for does not exist. Return to the homepage or contact us for more information." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://alcheez.com/not-found" />

        {/* OG Tags */}
        <meta property="og:url" content="https://alcheez.com/not-found" />
        <meta property="og:title" content="404 - Page Not Found | AlCheez" />
        <meta property="og:description" content="404 - The page you are looking for does not exist. Return to the homepage or contact us for more information." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* Twitter tags */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="404 - Page Not Found | AlCheez" />
        <meta property="twitter:description" content="404 - The page you are looking for does not exist. Return to the homepage or contact us for more information." />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://alcheez.com/android-chrome-384x384.png" />
      </Helmet>
      <h1 style={headingStyle}>404</h1>
      <h2 style={subheadingStyle}>Page Not Found</h2>
      <p style={paragraphStyle}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}


const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '10rem',
    color: '#dc3545',
  };

  const subheadingStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
  };

  const paragraphStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  };

