import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing'; // Import Pricing
import Footer from '../components/landing/Footer';

export default function PublicHome() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full">
        <Hero />
        <Features />
        <Pricing /> {/* Add Pricing Section */}
      </main>
      <Footer />
    </div>
  );
}
