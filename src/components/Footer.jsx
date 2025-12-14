const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">
            Scholar<span className="text-blue-200">Stream</span>
          </h2>
          <p className="mt-3 text-sm text-blue-100">
            A scholarship management platform helping students find the right
            opportunities worldwide.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-blue-100">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">All Scholarships</li>
            <li className="hover:text-white cursor-pointer">Dashboard</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a className="hover:text-blue-200 cursor-pointer">𝕏</a>
            <a className="hover:text-blue-200 cursor-pointer">📘</a>
            <a className="hover:text-blue-200 cursor-pointer">📸</a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-blue-500 text-center py-4 text-sm text-blue-100">
        © {new Date().getFullYear()} ScholarStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
