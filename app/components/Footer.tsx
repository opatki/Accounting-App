"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#9A3F3F] text-white py-10 mt-auto">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Bookify</h2>
          <p className="mb-4">
            Simplifying accounting with smart automation.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-teal-400">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-teal-400">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-teal-400">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-teal-400">Home</a></li>
            <li><a href="#" className="hover:text-teal-400">Features</a></li>
            <li><a href="#" className="hover:text-teal-400">Pricing</a></li>
            <li><a href="#" className="hover:text-teal-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: support@bookify.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-[#E6CFA9] pt-4">
        © {new Date().getFullYear()} Bookify. All rights reserved.
      </div>
    </footer>
  );
}