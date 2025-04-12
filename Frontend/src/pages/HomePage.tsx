import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import GebetaMapDirections from "../component/GebetaMapDirection";

const HomePage = () => {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showDirections, setShowDirections] = useState(false);

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleDirectionsClick = () => {
    setShowDirections(!showDirections); // Toggle the visibility of directions
  };

  // Handle the scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-300 text-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 py-6 px-6 transition-all ${
          scrolling ? "bg-blue-900 shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white text-4xl font-extrabold tracking-wider">
            Kuriftu Resort
          </div>
          <div className="space-x-6 hidden lg:flex">
            <a
              href="#about"
              className="hover:text-blue-300 transition text-xl font-semibold"
            >
              About Us
            </a>
            <a
              href="#events"
              className="hover:text-blue-300 transition text-xl font-semibold"
            >
              Events
            </a>
            <a
              href="#contact"
              className="hover:text-blue-300 transition text-xl font-semibold"
            >
              Contact Us
            </a>
            <a
              href="#testimonial"
              className="hover:text-blue-300 transition text-xl font-semibold"
            >
              Testimonials
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[700px]">
        <video
          src="/path/to/your-resort-video.mp4" // Replace with your actual video file path
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-70"
        ></video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-6xl font-extrabold text-shadow-lg mb-6">
            Welcome to Kuriftu Resort
          </h1>
          <p className="text-xl mb-8 max-w-lg mx-auto text-shadow-md">
            Escape into luxury, relaxation, and unforgettable memories
            surrounded by nature's beauty.
          </p>
          <button
            onClick={handleSignInClick}
            className="py-3 px-8 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Sign In
          </button>
          <div className="mt-4">
            <button
              onClick={handleSignUpClick}
              className="py-3 px-8 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Directions Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleDirectionsClick}
          className="py-3 px-8 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
        >
          Get Directions to Kuriftu Resort
        </button>
      </div>

      {/* Directions Map */}
      {showDirections && <GebetaMapDirections eventCoords={null} />}

      {/* About Us Section */}
      <div id="about" className="py-16 bg-white text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900">About Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Kuriftu Resort, where serenity meets luxury. Nestled in the
            heart of nature, we offer a peaceful escape with world-class
            amenities, exquisite dining, and unforgettable experiences.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <img
              src="/path/to/about-us-image.jpg" // Replace with your actual image
              alt="About Us"
              className="w-full h-full object-cover rounded-lg shadow-xl hover:scale-105 transition"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg text-gray-700">
              Our resort is designed to make every moment special. Whether
              you're here for a romantic getaway, a family vacation, or a
              corporate retreat, we have something for everyone. Explore our
              beautiful surroundings, indulge in gourmet cuisine, and unwind in
              luxury.
            </p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div id="events" className="py-16 bg-gray-100 text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900">Upcoming Events</h2>
          <p className="text-xl text-gray-600">
            Don’t miss out on the exciting activities happening at Kuriftu
            Resort!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {/* Event Cards */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform transition hover:scale-105">
            <img
              src="/path/to/beachfront-yoga.jpg" // Replace with your actual image
              alt="Beachfront Yoga"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Beachfront Yoga</h3>
            <p className="mt-2">
              Start your day with a rejuvenating yoga session by the beach.
            </p>
            <div className="mt-4">
              <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform transition hover:scale-105">
            <img
              src="/path/to/dinner-wine-tasting.jpg" // Replace with your actual image
              alt="Dinner & Wine Tasting"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Dinner & Wine Tasting</h3>
            <p className="mt-2">
              Enjoy a gourmet dinner paired with exquisite wines.
            </p>
            <div className="mt-4">
              <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform transition hover:scale-105">
            <img
              src="/path/to/adventure-hiking.jpg" // Replace with your actual image
              alt="Adventure Hiking"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Adventure Hiking</h3>
            <p className="mt-2">
              Embark on an adventurous hike through scenic landscapes.
            </p>
            <div className="mt-4">
              <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonial" className="py-16 text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900">
            What Our Guests Say
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all text-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600 to-transparent opacity-20 rounded-lg"></div>
            <p className="text-lg italic relative z-10">
              "A truly unforgettable experience. The staff was incredible, and
              the views were out of this world!"
            </p>
            <div className="mt-4 font-semibold relative z-10">John Doe</div>
            <div className="text-sm text-gray-600 relative z-10">Guest</div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all text-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600 to-transparent opacity-20 rounded-lg"></div>
            <p className="text-lg italic relative z-10">
              "Amazing amenities and so much to do. The yoga by the beach was my
              favorite part!"
            </p>
            <div className="mt-4 font-semibold relative z-10">Jane Smith</div>
            <div className="text-sm text-gray-600 relative z-10">Guest</div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all text-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600 to-transparent opacity-20 rounded-lg"></div>
            <p className="text-lg italic relative z-10">
              "This place feels like paradise! We had a fantastic time, and
              everything exceeded our expectations."
            </p>
            <div className="mt-4 font-semibold relative z-10">
              Emily Johnson
            </div>
            <div className="text-sm text-gray-600 relative z-10">Guest</div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 bg-white text-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Contact Us</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to us, and we will be
            happy to assist you.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-semibold">
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-8 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <div className="bg-gray-800 py-12 text-center text-white">
        <p>&copy; 2025 Kuriftu Resort. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;
