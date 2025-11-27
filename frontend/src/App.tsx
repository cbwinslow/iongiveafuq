import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Store from './pages/Store';
import Mascots from './pages/Mascots';
import Cart from './pages/Cart';
import Wallpapers from './pages/Wallpapers';
import Comics from './pages/Comics';
import Artwork from './pages/Artwork';
import Blog from './pages/Blog';
import Forum from './pages/Forum';
import Search from './pages/Search';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="p-4 md:p-8"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/mascots" element={<Mascots />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/wallpapers" element={<Wallpapers />} />
              <Route path="/comics" element={<Comics />} />
              <Route path="/artwork" element={<Artwork />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.main>
        </div>
      </Router>
    </CartProvider>
  );
}
