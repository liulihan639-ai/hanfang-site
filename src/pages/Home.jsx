import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Highlights from "../components/Highlights.jsx";
import ProductFamily from "../components/ProductFamily.jsx";
import UseCases from "../components/UseCases.jsx";
import Specs from "../components/Specs.jsx";
import Inquiry from "../components/Inquiry.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Home() {
  const { lang } = useLanguage();
  return (
    <main>
      <div key={lang}>
        <Navbar />
        <Hero />
        <Highlights />
        <ProductFamily />
        <UseCases />
        <Specs />
        <Inquiry />
        <Footer />
        <WhatsAppButton />
      </div>
    </main>
  );
}
