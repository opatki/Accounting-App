"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#9A3F3F] text-white pt-6 pb-5 mt-auto">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Bookify</h2>
          <p className="mb-4">
            Simplifying accounting with smart automation.
          </p>
          <div className="flex space-x-4 pt-1">
            <a href="#" className="hover:text-teal-400">
              <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
            </a>
            <a href="#" className="hover:text-teal-400">
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
            </a>
            <a href="#" className="hover:text-teal-400">
              <FontAwesomeIcon icon={faLinkedinIn} className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex justify-between space-y-2">
            <li><a href="#" className="hover:text-teal-400">Home</a></li>
            <li><a href="#" className="hover:text-teal-400">Features</a></li>
            <li><a href="#" className="hover:text-teal-400">Pricing</a></li>
            <li><a href="#" className="hover:text-teal-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="pl-10">
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: om.y.patki@gmail.com</p>
          <p>Phone: +1 (805) 300-2311</p>
        </div>
      </div>

      <div className="text-center text-sm mt-5 border-t border-[#E6CFA9] pt-4">
        © {new Date().getFullYear()} Bookify. All rights reserved.
      </div>
    </footer>
  );
}