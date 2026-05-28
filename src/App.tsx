import CookieBanner  from './components/CookieBanner'
import Navbar         from './components/Navbar'
import HeroSection    from './components/HeroSection'
import MenuSection    from './components/MenuSection'
import StorySection   from './components/StorySection'
import GallerySection from './components/GallerySection'
import EventsSection  from './components/EventsSection'
import ReviewsSection from './components/ReviewsSection'
import ContactSection from './components/ContactSection'
import Footer         from './components/Footer'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <StorySection />
        <GallerySection />
        <EventsSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
