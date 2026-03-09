import Navbar from '../sections/Navbar';
import HeroSection from '../sections/HeroSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <HeroSection />
      </main>
    </div>
  );
}   