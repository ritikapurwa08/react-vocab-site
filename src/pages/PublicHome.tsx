import Hero from '../features/landing/components/Hero';
import Features from '../features/landing/components/Features';
import Pricing from '../features/landing/components/Pricing'; // Import Pricing
import Footer from '../features/landing/components/Footer';

export default function PublicHome() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark">
      <main className="flex-1 flex flex-col items-center w-full">
        <Hero />
        <Features />
        <Pricing /> {/* Add Pricing Section */}
      </main>
      <Footer />
    </div>
  );
}
