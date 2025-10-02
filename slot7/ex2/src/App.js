import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Booking from './components/Booking';
import Hero from './components/Hero';
import MenuGrid from './components/MenuGrid';
import PizHeader from './components/PizHeader';

export default function App() {
  return (
    <>
      <PizHeader />
      <Hero />
      <main className="container my-5">
        <MenuGrid />
        <Booking />
      </main>
      
    </>
  );
}
