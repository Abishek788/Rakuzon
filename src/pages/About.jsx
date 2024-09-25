import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <header className="p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">About Rakuzon</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <section className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700">
            At Rakuzon, we are driven by a passion for sports and innovation. Our mission is to bring inspiration and innovation to every athlete in the world. We believe that if you have a body, you are an athlete.
          </p>
        </section>

        <section className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Innovation: We strive to innovate in everything we do.</li>
            <li>Diversity: We embrace diversity and inclusivity.</li>
            <li>Integrity: We uphold the highest standards of integrity in all our actions.</li>
            <li>Community: We give back to the communities we serve.</li>
          </ul>
        </section>

        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700">
            Our vision is to create a better world through the power of sports. We aim to inspire athletes everywhere to reach their full potential and to break down barriers in sport and society.
          </p>
        </section>
      </main>

      <footer className="p-4">
        <p className="text-center">© 2024 Rakuzon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
