import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="relative min-h-[50vh] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-4">
      {/* Glassmorphism Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >
        {/* Content inside glass box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold mb-3">About</h2>
            <p className="text-white/80 leading-relaxed">
              Connecting people who lost their items with those who found them.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2  text-white/80 flex flex-col">
              <Link to="/" className="hover:text-white hover:font-bold cursor-pointer">Home</Link>
              <Link to="/lost-found-items" className="hover:text-white hover:font-bold cursor-pointer">Lost & Found</Link>
              <Link to="/manage-items" className="hover:text-white hover:font-bold cursor-pointer">My Items</Link>
              <Link to="/teamSlider" className="hover:text-white hover:font-bold cursor-pointer">Contact</Link>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Social Media</h2>
            <div className="flex space-x-5 text-3xl text-white/80">
              <a href="https://www.facebook.com/mdmarjan.mdmarjan.18" className="hover:text-white"><FaFacebook /></a>
              <a href="www.twitter.com" className="hover:text-white"><FaTwitter /></a>
              <a href="www.github.com" className="hover:text-white"><FaGithub /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-white/80 mt-8 border-t border-white/20 pt-4">
          © {new Date().getFullYear()} WhereIsIt | Developed with ❤️
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
