import React from "react";

function Contact() {
  return (
    <footer id="contact" className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg font-light leading-relaxed">
          Contact Us
        </p>
        <div className="mt-4 text-lg font-light leading-relaxed">
          <p>Email: <a href="mailto:leftoverlink@gmail.com" className="underline text-white hover:text-gray-200">leftoverlink@gmail.com</a></p>
          <p>Phone Number: <a href="tel:111-111-1111" className="underline text-white hover:text-gray-200">111-111-1111</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
