import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import GebetaMapDirections from "../component/GebetaMapDirection";

const HomePage = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Updated list of resorts with descriptions and service counts
  const resorts = [
    { 
      id: 1, 
      name: "Kuriftu Resort & Spa Bishoftu", 
      location: "Bishoftu", 
      description: "Experience luxury by the crater lake with stunning views and serene surroundings.",
      services: 12,
      events: 8
    },
    { 
      id: 2, 
      name: "Kuriftu Resort & Spa Entoto", 
      location: "Entoto", 
      description: "Retreat to the mountains with fresh air and panoramic views of Addis Ababa.",
      services: 15,
      events: 10
    },
    { 
      id: 3, 
      name: "Kuriftu Resort & Spa Lake Tana", 
      location: "Lake Tana", 
      description: "Discover the source of the Blue Nile with island monasteries and rich wildlife.",
      services: 14,
      events: 7
    },
    { 
      id: 4, 
      name: "Kuriftu Resort & Spa Awash Falls", 
      location: "Awash Falls", 
      description: "Adventure awaits by the majestic waterfalls in Ethiopia's oldest national park.",
      services: 11,
      events: 6
    }
  ];

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleDirectionsClick = () => {
    setShowDirections(!showDirections);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      {/* Mobile Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-20 py-4 px-4 transition-all ${
          scrolling ? "bg-blue-900 shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Hamburger Menu */}
          <button onClick={toggleMenu} className="text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo */}
          <div className="text-white text-xl font-bold tracking-wider">
            Kuriftu Resort
          </div>
          
          {/* Search Icon */}
          <button className="text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div className={`fixed top-0 left-0 h-full w-3/4 bg-blue-900 z-30 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-white text-xl font-bold">Kuriftu Resort</div>
            <button onClick={toggleMenu} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            <a href="#resorts" className="block text-white text-lg font-medium" onClick={toggleMenu}>Resorts</a>
            <a href="#about" className="block text-white text-lg font-medium" onClick={toggleMenu}>About Us</a>
            <a href="#events" className="block text-white text-lg font-medium" onClick={toggleMenu}>Events</a>
            <a href="#contact" className="block text-white text-lg font-medium" onClick={toggleMenu}>Contact Us</a>
            <a href="#testimonial" className="block text-white text-lg font-medium" onClick={toggleMenu}>Testimonials</a>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Resorts List Section */}
      <div id="resorts" className="py-10 px-4">
        <div className="text-center mb-8 mt-8">
          <h2 className="text-2xl font-bold">Our Luxury Resorts</h2>
          <p className="text-lg">Discover paradise across Ethiopia</p>
        </div>
        <div className="space-y-6">
          {resorts.map(resort => (
            <div key={resort.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-800 relative">
              <div className="h-48 bg-gray-300 relative">
                <img 
                  src={`/path/to/${resort.location.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                  alt={resort.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-16"></div>
                <div className="absolute bottom-2 left-3 text-white font-bold text-lg">{resort.location}</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xl text-blue-900">{resort.name}</h3>
                <p className="text-gray-600 mt-2">{resort.description}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <span className="block text-blue-900 font-bold text-lg">{resort.services}</span>
                      <span className="text-xs text-gray-500">Services</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-blue-900 font-bold text-lg">{resort.events}</span>
                      <span className="text-xs text-gray-500">Events</span>
                    </div>
                  </div>
                  <button className="py-2 px-4 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition flex items-center">
                    <span>Discover</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Get Directions Button */}
      <div className="text-center py-6 px-4">
        <button
          onClick={handleDirectionsClick}
          className="py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition w-full max-w-xs flex items-center justify-center mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Find Your Way to Paradise
        </button>
      </div>

      {/* Directions Map */}
      {showDirections && (
        <div className="px-4 py-4">
          <GebetaMapDirections eventCoords={null} />
        </div>
      )}

      {/* About Us Section */}
      <div id="about" className="py-10 px-4 bg-white text-gray-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">About Us</h2>
          <p className="text-lg text-gray-600">
            Discover Kuriftu Resort, where serenity meets luxury.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <img
              src="/path/to/about-us-image.jpg"
              alt="About Us"
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-gray-700">
              Our resort is designed to make every moment special. Whether
              you're here for a romantic getaway, a family vacation, or a
              corporate retreat, we have something for everyone.
            </p>
          </div>
        </div>
      </div>

    

      {/* Testimonials Section */}
      <div id="testimonial" className="py-10 px-4 text-gray-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">
            What Our Guests Say
          </h2>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600 to-transparent opacity-20 rounded-lg"></div>
            <p className="text-base italic relative z-10">
              "A truly unforgettable experience. The staff was incredible, and
              the views were out of this world!"
            </p>
            <div className="mt-3 font-semibold relative z-10">John Doe</div>
            <div className="text-sm text-gray-600 relative z-10">Guest</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600 to-transparent opacity-20 rounded-lg"></div>
            <p className="text-base italic relative z-10">
              "Amazing amenities and so much to do. The yoga by the beach was my
              favorite part!"
            </p>
            <div className="mt-3 font-semibold relative z-10">Jane Smith</div>
            <div className="text-sm text-gray-600 relative z-10">Guest</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600 to-transparent opacity-20 rounded-lg"></div>
            <p className="text-base italic relative z-10">
              "This place feels like paradise! We had a fantastic time, and
              everything exceeded our expectations."
            </p>
            <div className="mt-3 font-semibold relative z-10">
              Emily Johnson
            </div>
            <div className="text-sm text-gray-600 relative z-10">Guest</div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <section id="contact" className="py-10 px-4 bg-white text-gray-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Contact Us</h2>
          <p className="text-base">
            Have questions? Reach out to us.
          </p>
        </div>
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-base font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-base font-semibold">
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <div className="bg-gray-800 py-6 text-center text-white px-4">
        <p>&copy; 2025 Kuriftu Resort. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;