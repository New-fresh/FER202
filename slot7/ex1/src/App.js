import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Banner from './components/Banner';
import Footer from './components/Footer';
import FptSite from './components/FptSite';
import GridDemo from './components/GridDemo';
import Header from './components/Header';
import LastFooter from './components/LastFooter';
import Navbar from './components/Navbar';

import StudentSection from './components/StudentSection';

export default function App() {
  return (
    <div>
      <Banner />
      <Navbar />
      <GridDemo />
      <Footer />
      <FptSite/>
      <Header />
      <StudentSection />
      <LastFooter />
    </div>
  );
}
