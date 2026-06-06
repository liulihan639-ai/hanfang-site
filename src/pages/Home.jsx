import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Highlights from "../components/Highlights.jsx";
import ProductFamily from "../components/ProductFamily.jsx";
import UseCases from "../components/UseCases.jsx";
import Specs from "../components/Specs.jsx";
import Inquiry from "../components/Inquiry.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <ProductFamily />
      <UseCases />
      <Specs />
      <Inquiry />
      <Footer />
    </main>
  );
}
