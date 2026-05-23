import Navbar         from './components/Navbar'
import HeroSection    from './components/HeroSection'
import MenuSection    from './components/MenuSection'
import StorySection   from './components/StorySection'
import GallerySection from './components/GallerySection'
import EventsSection  from './components/EventsSection'
import ContactSection from './components/ContactSection'
import Footer         from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <StorySection />
        <GallerySection />
        <EventsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
