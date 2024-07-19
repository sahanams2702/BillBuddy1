import React from "react";
import AboutImg from "../assets/images/aboutus.jpg";


const About = () => {
 // Adjust the path based on your project structure

  return (
    <>
      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span> us
        </h1>
        <div className="row">
          <div className="image">
            <img src={AboutImg} alt="" />
          </div>

          <div className="content">
            <h3>Pioneering Innovation in Invoice Management</h3>
            <p>At [BILL BUDDY], we are committed to simplifying the complexities of invoice processing. Our journey began with a vision to empower businesses with user-friendly tools that streamline invoicing, enabling them to focus on what truly matters - growth and success</p>
            <p>With years of experience and a passion for problem-solving, our dedicated team has crafted an intuitive and efficient invoice generator. We believe in the power of technology to transform financial workflows, making invoicing hassle-free for businesses of all sizes. Join us on this journey of simplification, where innovation meets practicality. Discover a world where invoices are no longer a headache but a seamless part of your operations. Welcome to [Your Company Name], where invoices are made easy."
            </p>
            <a href="#" className="btn">
              learn more
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
