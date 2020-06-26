import Navbar from '@/components/shared/navbar';
import Hero from '@/components/shared/hero';
import { ToastContainer } from 'react-toastify';

const BaseLayout = ({ children, page = '' }) => {
  const isHomePage = () => page === 'Home';

  return (
    <div className="portfolio-app">
      <Navbar />
      {isHomePage() && <Hero />}
      <div className="container">{children}</div>
      {isHomePage() && (
        <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>
      )}
      <ToastContainer />
    </div>
  );
};

export default BaseLayout;
