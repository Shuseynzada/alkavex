import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Values from "./components/Values";
import Services from "./components/Services";
import Products from "./components/Products";
import Locations from "./components/Locations";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Values />
      <Services />
      <Products />
      <Locations />
      <Contact />
      <Footer />
    </>
  );
}
