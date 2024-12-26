import React, { useState } from 'react';
import './ContactUs.css';

import { supabase } from '../supabaseClient';
import { Helmet } from 'react-helmet-async';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabase
        .from('contactus')
        .insert([{ name, email, message }]);

      if (error) {
        throw error;
      }

      setSuccessMessage('Message sent successfully!');
      clearMessages();
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error saving form data:', error.message);
      setErrorMessage('Failed to send message. Please try again.');
      clearMessages();
    }
  };

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 5000); // Clear messages after 5 seconds (adjust as needed)
  };

  return (
    <div className='contact-us_container'>
      <Helmet>
        <html lang="en" />
        <title>Contact Us | AlCheez</title>
        <meta name="description" content="Get in touch with AlCheez for support, inquiries, or feedback. Contact us via WhatsApp, email, or leave a message." data-rh="true"/>
        <link rel="canonical" href="https://alcheez.com/contact-us" />
        <meta name="keywords" content="contact, AlCheez, customer support, WhatsApp, email, feedback, inquiries" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        <meta property="og:url" content="https://alcheez.com/contact-us" />
        <meta property="og:title" content="Contact Us | AlCheez" />
        <meta property="og:description" content="Get in touch with AlCheez for support, inquiries, or feedback. Contact us via WhatsApp, email, or leave a message." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* Twitter tags */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="Contact Us | AlCheez" />
        <meta property="twitter:description" content="Get in touch with AlCheez for support, inquiries, or feedback. Contact us via WhatsApp, email, or leave a message." />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* Referrer Policy */}
        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
      <h1>Contact Us</h1>
      <p>Whatsapp: 0310-4897651</p>
      <p>Customer Support: sainstore532@gmail.com</p>
      <form onSubmit={handleSubmit} className='form_container'>
        <h2 style={{textAlign:"center", marginTop: "40px"}}>Contact Us via WhatsApp, Email, or Leave a Message Below <br/> We're Here to Assist You!</h2>
        <div className='name-email_container'>
          <label className='form-label'>
            Name:
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-input'
              required
            />
          </label>
          <label className='form-label'>
            Email:
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-input'
              required
            />
          </label>
        </div>
        <br />
        <label className='form-label'>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='form-textarea'
            required
          />
        </label>
        <br />
        <button type='submit' className='form-button'>
          SEND
        </button>
      </form>
      {successMessage && (
        <p className='success-message'>{successMessage}</p>
      )}
      {errorMessage && (
        <p className='error-message'>{errorMessage}</p>
      )}
    </div>
  );
}
