// aos.js - Custom AOS Configuration
import AOS from 'aos';

const initializeAOS = () => {
  // Pastikan DOM sudah siap
  if (typeof window !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      delay: 100,
      easing: 'ease-in-out-cubic',
      disable: window.innerWidth < 768,
      startEvent: 'DOMContentLoaded'
    });

    // Refresh AOS on resize
    window.addEventListener('resize', () => {
      AOS.refresh();
    });

    // Refresh when all images are loaded
    window.addEventListener('load', () => {
      AOS.refresh();
    });
  }
};

export default initializeAOS;