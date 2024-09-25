import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      color: '#111',
    },
    section: {
      marginBottom: '30px',
    },
    h2: {
      color: '#111',
      borderBottom: '2px solid #f0f0f0',
      paddingBottom: '10px',
    },
    contactInfo: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '5px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#111',
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Contact Rakuzon</h1>
      </header>

      <section style={styles.section}>
        <h2 style={styles.h2}>Customer Support</h2>
        <div style={styles.contactInfo}>
          <p><strong>Phone:</strong> 1-800-344-6453</p>
          <p><strong>Hours:</strong> Monday to Sunday, 4:00 AM to 11:00 PM PT</p>
          <p><strong>Email:</strong> Use our contact form below</p>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>International Contact</h2>
        <div style={styles.contactInfo}>
          <p><strong>China:</strong> +86 215 288 2828</p>
          <p><strong>Netherlands:</strong> +31 35 626 6453</p>
          <p><strong>Turkey:</strong> +90 850 223 6000</p>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Corporate Headquarters</h2>
        <div style={styles.contactInfo}>
          <p>Nike World Headquarters</p>
          <p>One Bowerman Drive</p>
          <p>Beaverton, OR 97005</p>
          <p>Phone: +1 (503) 671-6453</p>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Contact Form</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            style={{...styles.input, height: '150px'}}
            required
          ></textarea>
          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;