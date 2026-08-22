import Hero from "../components/home/Hero.jsx";
import FeaturedCourts from "../components/home/FeaturedCourts.jsx";
import WhyUs from "../components/home/WhyUs.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import CTA from "../components/home/CTA.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCourts />
      <WhyUs />
      <Testimonials />
      <CTA />
    </>
  );
}
