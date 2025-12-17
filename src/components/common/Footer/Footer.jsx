import React from "react";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  const linkClass =
    "text-base-content/70 hover:text-purple-600 transition-colors";
  const socialBtnClass =
    "btn btn-circle text-xl btn-sm bg-base-100 hover:bg-gradient-primary hover:text-white border-none";
  return (
    <footer className="bg-base-300 text-base-content py-5 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              ScholarStream
            </h3>
            <p className="text-base-content/70 mb-4">
              Empowering students to achieve their academic dreams through
              accessible scholarship opportunities.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className={socialBtnClass}
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://x.com"
                className={socialBtnClass}
              >
                <FaXTwitter />
              </a>
              <a
                href="https://youtube.com"
                className={socialBtnClass}
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to={'/all-scholarships'}
                  className={linkClass}
                >
                  Browse Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to={'/how-it-works'}
                  className={linkClass}
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to={'/success-stories'}
                  className={linkClass}
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to={'blog'}
                  className={linkClass}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to={'help-center'}
                  className={linkClass}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to={'contact-us'}
                  className={linkClass}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to={'faq'}
                  className={linkClass}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to={'privacy-policy'}
                  className={linkClass}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-base-content/70 mb-4">
              Get the latest scholarship opportunities delivered to your inbox.
            </p>
            <div className="join w-full">
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered join-item w-full"
              />
              <button className="btn btn-gradient join-item">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="border-t border-base-content/10 pt-8 text-center text-base-content/60">
          <p>
            &copy; 2024 ScholarStream. All rights reserved. Made with ❤️ for
            students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
