import React, { useState } from "react";
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/contact-us', {
        name: name,
        email: email,
        phoneNumber: number,
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to submit contact form. Please try again.');
    }
  };

  return (
    <>
      <section className="contact" id="contact">
        <h1 className="heading">
          <span>contact</span> us
        </h1>
        <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1333.3903626545905!2d75.8851468429679!3d14.476441875265852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba2f6e57495365%3A0xa0bd45753e7a0022!2sGM%20UNIVERSITY%2C%20DAVANAGERE!5e0!3m2!1sen!2sin!4v1694082193599!5m2!1sen!2sin"
            className="map"
            width={400}
            height={500}
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <form onSubmit={handleSubmit}>
            <h3>get in touch</h3>
            <div className="inputBox">
              <span className="fas fa-user"></span>
              <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="inputBox">
              <span className="fas fa-envelope"></span>
              <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputBox">
              <span className="fas fa-phone"></span>
              <input type="number" placeholder="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>
            <input type="submit" value="contact now" className="btn" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
