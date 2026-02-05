import { useState, useEffect, useRef } from 'react'
import './App.css'
import SplashCursor from './SplashCursor'
import Threads from './Threads';
import initializeAOS from './aos';
import 'aos/dist/aos.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const certContainerRef = useRef(null);
  const introRef = useRef(null);
  
  // Profile Images dengan gambar lokal - FIXED PATH
  const profileImages = {
    tiktokBanner: '.1760871670475.jpg',
    tiktokProfile: './Fizam1.jpeg', // Gunakan ./ untuk public folder
    linkedinBanner: './1760871670475.jpg',
    linkedinProfile: './Fizam2.jpg' // Gunakan ./ untuk public folder
  };

  const certificates = [
    { 
      id: 1, 
      title: 'CompTIA Security+', 
      issuer: 'CompTIA', 
      year: '2024',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 2, 
      title: 'CEH v11', 
      issuer: 'EC-Council', 
      year: '2023',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 3, 
      title: 'Google Cybersecurity', 
      issuer: 'Google', 
      year: '2023',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 4, 
      title: 'Linux Essentials', 
      issuer: 'Linux Foundation', 
      year: '2023',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 5, 
      title: 'Network+', 
      issuer: 'CompTIA', 
      year: '2022',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 6, 
      title: 'Ethical Hacking', 
      issuer: 'TryHackMe', 
      year: '2022',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
  ];

  const projects = [
    { 
      id: 1, 
      title:'CTF NADI X CyberSecurity', 
      description: '',
      tech: [''],
      type: 'landscape',
      image: './IMG_20250926_191005_873.jpg'
    },
    { 
      id: 2, 
      title: 'Web App Firewall', 
      description: 'PHP-based web application firewall with real-time threat detection',
      tech: ['PHP', 'MySQL', 'JavaScript', 'Redis'],
      type: 'portrait',
      image: './IMG_20250926_191000_851.jpg'
    },
    { 
      id: 3, 
      title: 'Security Dashboard', 
      description: 'React dashboard for monitoring security metrics and incident response',
      tech: ['React', 'Node.js', 'Chart.js', 'WebSocket'],
      type: 'landscape',
      image: './1768234829066.jpg'
    },
    { 
      id: 4, 
      title: 'Encryption Tool Suite', 
      description: 'Collection of cryptographic tools for secure communications',
      tech: ['Python', 'Cryptography', 'AES', 'RSA'],
      type: 'portrait',
      image: './1765335860018.jpg'
    },
    { 
      id: 5, 
      title: 'Incident Response System', 
      description: 'Automated system for handling security incidents and alerts',
      tech: ['Python', 'Flask', 'MongoDB', 'Docker'],
      type: 'landscape',
      image: './1765085714451.jpg'
    },
    { 
      id: 6, 
      title: 'Malware Analysis Sandbox', 
      description: 'Secure environment for analyzing suspicious files and malware',
      tech: ['Python', 'VirtualBox', 'YARA', 'Linux'],
      type: 'portrait',
      image: './ssstik.io_1770250693508.jpeg'
    },
  ];

  // Skills dengan icon yang benar
  const skills = [
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Vite', icon: 'fa fa-bolt' },
    { name: 'PHP', icon: 'fab fa-php' },
    { name: 'Cryptography', icon: 'fa fa-lock' },
    { name: 'Linux', icon: 'fab fa-linux' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'Hardware', icon: 'fas fa-microchip' },
    { name: 'Git', icon: 'fab fa-git-alt' },
    { name: 'Networking', icon: 'fa fa-network-wired' },
    { name: 'Wireshark', icon: 'fa fa-eye' },
    { name: 'Nmap', icon: 'fa fa-search' },
    { name: 'Web Application', icon: 'fa fa-code' },
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initialize AOS dari file terpisah dengan delay
    const initTimer = setTimeout(() => {
      initializeAOS();
    }, 100);

    // Intro animation - tanpa "Loading Portfolio..."
    const timer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = 'auto';
    }, 2000);

    // Smooth scroll handler
    const handleSmoothScroll = (e) => {
      const targetId = e.target.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          setIsScrolling(true);
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          setTimeout(() => setIsScrolling(false), 1000);
        }
      }
    };

    // External link animation handler
    const handleExternalLink = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('http')) {
        e.preventDefault();
        setIsScrolling(true);
        
        // Animation sebelum redirect
        e.currentTarget.style.transform = 'scale(0.95)';
        e.currentTarget.style.opacity = '0.8';
        
        setTimeout(() => {
          window.open(href, '_blank');
          setIsScrolling(false);
        }, 300);
      }
    };

    // Attach event listeners
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
      link.addEventListener('click', handleExternalLink);
    });

    // Close menu on outside click
    const handleOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('.sidebar-menu') && !e.target.closest('.hamburger-btn')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });

    return () => {
      clearTimeout(timer);
      clearTimeout(initTimer);
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      externalLinks.forEach(link => {
        link.removeEventListener('click', handleExternalLink);
      });
      document.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextCert = () => {
    setActiveCertIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = () => {
    setActiveCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setTimeout(() => setIsScrolling(false), 1000);
      closeMenu();
    }
  };

  const handleSocialClick = (platform) => {
    setIsScrolling(true);
    setTimeout(() => {
      if (platform === 'tiktok') {
        window.open('https://www.tiktok.com/@fizam.dev_2158', '_blank');
      } else if (platform === 'linkedin') {
        window.open('https://www.linkedin.com/in/muhammad-syafizam', '_blank');
      } else if (platform === 'github') 
      setIsScrolling(false);
    }, 500);
  };

  return (
    <div className={`app-container ${isScrolling ? 'scrolling' : ''}`} style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      fontFamily: 'monospace', 
      minHeight: '100vh', 
      width: '100%', 
      overflowX: 'hidden',
      position: 'relative'
    }}>
      
      {/* INTRO OVERLAY - Versi disederhanakan */}
      {showIntro && (
        <div 
          ref={introRef}
          className="intro-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'fadeOut 0.5s ease-in-out 1.5s forwards'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 8vw, 4rem)', 
              color: '#fff',
              marginBottom: '20px',
              letterSpacing: '2px',
              opacity: 0,
              animation: 'fadeInUp 1s ease-out 0.5s forwards'
            }}>
              FIZAMCYBERSEC
            </h1>
            <div style={{ 
              width: '200px', 
              height: '3px', 
              background: '#333', 
              margin: '30px auto',
              overflow: 'hidden',
              borderRadius: '2px'
            }}>
              <div style={{
                width: '0%',
                height: '100%',
                background: 'linear-gradient(90deg, black, white)',
                animation: 'loadingBar 1.5s ease-in-out forwards'
              }}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* NAVBAR */}
      <nav className="navbar" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 5%',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: '1.2rem', 
          letterSpacing: '2px',
          cursor: 'pointer'
        }} onClick={() => scrollToSection('home')}>
          FIZAMCYBERSEC
        </div>
        
        {/* Desktop Menu */}
        <div style={{ 
          display: isMobile ? 'none' : 'flex', 
          gap: '40px',
          fontSize: '0.9rem',
          alignItems: 'center'
        }} className="desktop-menu">
          <a href="#home" className="nav-link" onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}>HOME</a>
          <a href="#about" className="nav-link" onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }}>ABOUT</a>
          <a href="#cert" className="nav-link" onClick={(e) => {
            e.preventDefault();
            scrollToSection('cert');
          }}>CERTIFICATES</a>
          <a href="#projects" className="nav-link" onClick={(e) => {
            e.preventDefault();
            scrollToSection('projects');
          }}>GALLERY</a>
          <a href="#contact" className="nav-link" onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}>MY MEDIA SOCIAL</a>
        </div>

        {/* Hamburger Button for Mobile */}
        <button 
          onClick={toggleMenu}
          style={{
            display: isMobile ? 'flex' : 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 1001,
            padding: '5px',
            transition: 'all 0.3s ease',
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="hamburger-btn"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <i className="fa fa-times"></i>
          ) : (
            <i className="fa fa-bars"></i>
          )}
        </button>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div className={`sidebar-menu ${isMenuOpen ? 'active' : ''}`} style={{
        position: 'fixed',
        top: '0',
        right: isMenuOpen ? '0' : '-300px',
        width: '300px',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.98)',
        backdropFilter: 'blur(15px)',
        zIndex: 998,
        padding: '100px 30px 30px',
        transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <a href="#home" onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }} className="mobile-nav-link" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            padding: '15px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fa fa-home"></i>
            HOME
          </a>
          <a href="#about" onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }} className="mobile-nav-link" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            padding: '15px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fa fa-user"></i>
            ABOUT
          </a>
          <a href="#cert" onClick={(e) => {
            e.preventDefault();
            scrollToSection('cert');
          }} className="mobile-nav-link" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            padding: '15px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fa fa-certificate"></i>
            CERTIFICATES
          </a>
          <a href="#projects" onClick={(e) => {
            e.preventDefault();
            scrollToSection('projects');
          }} className="mobile-nav-link" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            padding: '15px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fa fa-project-diagram"></i>
            GALLERY
          </a>
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }} className="mobile-nav-link" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            padding: '15px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fa fa-users"></i>
            MY MEDIA SOCIAL
          </a>
        </div>
      </div>

      {/* 1. HOME SECTION */}
      <section id="home" style={{ 
        height: '100vh', 
        width: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative', 
        zIndex: 1,
        overflow: 'hidden',
        background: '#000'
      }}>
        {/* Threads background */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0, 
          pointerEvents: 'none' 
        }}>
          <Threads amplitude={1} distance={0} enableMouseInteraction />
        </div>

        <div style={{ 
          textAlign: 'center', 
          padding: '0 20px', 
          zIndex: 2,
          transform: 'translateY(0)',
          transition: 'transform 0.8s ease-out'
        }} data-aos="fade-up" data-aos-duration="1000">
          <h1 style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)', 
            letterSpacing: '-3px', 
            margin: '0', 
            lineHeight: '0.9',
            fontWeight: '900',
            background: 'linear-gradient(45deg, #fff, #666, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 3s ease-in-out infinite'
          }}>
           FIZAMCYBERSEC
          </h1>
          <p style={{ 
            color: '#666', 
            marginTop: '20px', 
            fontSize: 'clamp(0.8rem, 2vw, 1rem)', 
            letterSpacing: '4px',
            textTransform: 'uppercase'
          }} data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            CYBERSECURITY JUNIOR
          </p>
          <div style={{ 
            marginTop: '40px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }} data-aos="fade-up" data-aos-delay="600" data-aos-duration="800">
            <button onClick={() => scrollToSection('about')} style={{
              padding: '12px 30px',
              border: '1px solid #333',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'monospace'
            }} className="cta-button">
              EXPLORE
            </button>
            <button onClick={() => scrollToSection('contact')} style={{
              padding: '12px 30px',
              background: '#fff',
              color: '#000',
              textDecoration: 'none',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'monospace'
            }} className="cta-button">
              CONTACT
            </button>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" style={{ 
        minHeight: '100vh', 
        width: '100%',
        backgroundColor: '#000', 
        position: 'relative', 
        zIndex: 10, 
        padding: '150px 5%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} data-aos="fade-up" data-aos-duration="800">
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
            marginBottom: '50px', 
            borderLeft: '4px solid #fff', 
            paddingLeft: '20px',
            color: '#fff'
          }}>
            <i className="fa fa-user" style={{ marginRight: '15px', color: '#666' }}></i>
            ./WHOAMI
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '50px',
            alignItems: 'center'
          }}>
            <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
              <p style={{ 
                color: '#888', 
                lineHeight: '1.8', 
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                marginBottom: '30px'
              }}>
                Hello, saya <span style={{ color: '#fff', fontWeight: 'bold' }}>Syafizam</span>, seorang Junior Cybersecurity enthusiast dengan passion dalam bidang keamanan digital. Saya fokus pada pengembangan sistem yang aman dan analisis keamanan jaringan.
              </p>
              <p style={{ 
                color: '#666', 
                lineHeight: '1.8', 
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'
              }}>
                Dengan background dalam development dan cybersecurity, saya menggabungkan kemampuan teknis untuk membangun solusi yang aman dan efisien.
              </p>
            </div>
            <div style={{ 
              border: '1px solid #222', 
              padding: '40px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '5px'
            }} data-aos="fade-left" data-aos-delay="400" data-aos-duration="800">
              <span style={{ color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa fa-code"></i> // Skills & Tools
              </span>
              <div style={{ 
                marginTop: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '15px'
              }}>
                {skills.map((skill, index) => (
                  <div key={index} style={{
                    padding: '15px',
                    border: '1px solid #333',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: '#aaa',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }} className="skill-item" title={skill.name} data-aos="zoom-in" data-aos-delay={index * 100}>
                    <i className={skill.icon} style={{ 
                      fontSize: '1.8rem', 
                      marginBottom: '5px'
                    }}></i>
                    <span style={{ 
                      fontSize: '0.85rem',
                      letterSpacing: '0.5px'
                    }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CERTIFICATIONS SECTION */}
      <section id="cert" style={{ 
        minHeight: '100vh', 
        width: '100%',
        backgroundColor: '#0a0a0a', 
        padding: '150px 5%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }} data-aos="fade-up" data-aos-duration="800">
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
            marginBottom: '50px', 
            borderLeft: '4px solid #fff', 
            paddingLeft: '20px',
            color: '#fff'
          }}>
            <i className="fa fa-certificate" style={{ marginRight: '15px', color: '#666' }}></i>
            CERTIFICATIONS
          </h2>
          
          <div style={{ 
            position: 'relative',
            border: '1px solid #222',
            borderRadius: '10px',
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.5)',
            padding: '20px',
            minHeight: '500px'
          }} ref={certContainerRef} data-aos="zoom-in" data-aos-duration="800">
            {/* Certificate Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                maxWidth: '800px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  display: 'flex',
                  transform: `translateX(-${activeCertIndex * 100}%)`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  {certificates.map((cert, index) => (
                    <div key={cert.id} style={{
                      minWidth: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '20px'
                    }} className="cert-slide">
                      <div style={{
                        width: '100%',
                        height: '300px',
                        backgroundImage: `url(${cert.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        border: '1px solid #333',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0,0,0,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <i className="fa fa-certificate" style={{
                            fontSize: '4rem',
                            color: 'rgba(255,255,255,0.2)'
                          }}></i>
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ color: '#fff', marginBottom: '10px', fontSize: '1.5rem' }}>{cert.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                          <i className="fa fa-building" style={{ color: '#666', fontSize: '0.9rem' }}></i>
                          <p style={{ color: '#666', fontSize: '1rem', margin: '0' }}>{cert.issuer}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                          <i className="fa fa-calendar" style={{ color: '#888', fontSize: '0.8rem' }}></i>
                          <p style={{ color: '#888', fontSize: '0.9rem', margin: '0' }}>{cert.year}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevCert}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid #333',
                color: '#fff',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              className="nav-button"
              aria-label="Previous certificate"
            >
              <i className="fa fa-chevron-left"></i>
            </button>

            <button 
              onClick={nextCert}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid #333',
                color: '#fff',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              className="nav-button"
              aria-label="Next certificate"
            >
              <i className="fa fa-chevron-right"></i>
            </button>

            {/* Certificate Indicators */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '30px',
              flexWrap: 'wrap'
            }}>
              {certificates.map((cert, index) => (
                <button
                  key={cert.id}
                  onClick={() => setActiveCertIndex(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: index === activeCertIndex ? '#fff' : '#333',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  className="cert-indicator"
                  title={`View ${cert.title}`}
                  aria-label={`Go to certificate ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={prevCert}
              style={{
                padding: '10px 25px',
                background: 'transparent',
                border: '1px solid #333',
                color: '#666',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                fontFamily: 'monospace'
              }}
              className="secondary-button"
            >
              <i className="fa fa-chevron-left"></i>
              Previous
            </button>
            <div style={{
              padding: '10px 25px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid #333',
              color: '#fff',
              borderRadius: '5px',
              fontSize: '0.9rem',
              fontFamily: 'monospace'
            }}>
              {activeCertIndex + 1} / {certificates.length}
            </div>
            <button 
              onClick={nextCert}
              style={{
                padding: '10px 25px',
                background: 'transparent',
                border: '1px solid #333',
                color: '#666',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                fontFamily: 'monospace'
              }}
              className="secondary-button"
            >
              Next
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS GALLERY SECTION */}
      <section id="projects" style={{ 
        minHeight: '100vh', 
        width: '100%',
        backgroundColor: '#000', 
        padding: '150px 5%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }} data-aos="fade-up" data-aos-duration="800">
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
            marginBottom: '50px', 
            borderLeft: '4px solid #fff', 
            paddingLeft: '20px',
            color: '#fff'
          }}>
            <i className="fa fa-project-diagram" style={{ marginRight: '15px', color: '#666' }}></i>
            PROJECT GALLERY
          </h2>
          
          {/* Masonry Grid */}
          <div className="masonry-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`masonry-item ${project.type}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
              >
                <div className="project-image" style={{
                  backgroundImage: `url(${project.image})`
                }}>
                  <div className="project-overlay">
                    <h3 style={{ 
                      color: '#fff', 
                      marginBottom: '10px', 
                      fontSize: '1.3rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <i className="fa fa-flag"></i>
                      {project.title}
                    </h3>
                    <p style={{ 
                      color: '#aaa', 
                      fontSize: '0.9rem', 
                      marginBottom: '15px',
                      lineHeight: '1.5'
                    }}>
                      {project.description}
                    </p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION - Social Media Cards */}
      <section id="contact" style={{ 
        minHeight: '100vh', 
        width: '100%',
        backgroundColor: '#0a0a0a', 
        padding: '150px 5%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }} data-aos="fade-up" data-aos-duration="800">
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
            marginBottom: '50px', 
            borderLeft: '4px solid #fff', 
            paddingLeft: '20px',
            color: '#fff',
            textAlign: 'center'
          }}>
            <i className="fa fa-users" style={{ marginRight: '15px', color: '#666' }}></i>
            CONNECT WITH ME
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* TikTok Card */}
            <div style={{
              border: '1px solid #222',
              borderRadius: '15px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #000000, #1a1a1a)',
              position: 'relative',
              transition: 'all 0.3s ease',
              height: '100%'
            }} className="social-card tiktok-card" data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
              <div className="social-banner tiktok-banner" style={{
                height: '140px',
                background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${profileImages.tiktokBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div className="profile-avatar" style={{
                  position: 'absolute',
                  bottom: '-50px',
                  left: '30px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `url(${profileImages.tiktokProfile}) center/cover no-repeat`,
                  border: '4px solid #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  zIndex: 2
                }}>
                  {/* Hanya gambar, tanpa icon */}
                </div>
              </div>
              
              <div className="social-content" style={{ padding: '70px 30px 30px 30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 5px 0' }}>@FizamCyberSec_21</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <i className="fa fa-shield-alt" style={{ fontSize: '0.8rem' }}></i>
                      s. comp student | CTF Player | White hat hacker | Cyber wira Sabah | 17 years old | Red team hacker
                    </p>
                  </div>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem'
                  }}>
                    <i className="fab fa-tiktok" style={{ color: '#fff' }}></i>
                  </div>
                </div>
                
                
                <div className="social-stats" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '25px',
                  padding: '15px 0',
                  borderTop: '1px solid #222',
                  borderBottom: '1px solid #222'
                }}>
                  <div className="stat-item">
                    <div className="stat-value">1686</div>
                    <div className="stat-label">Followers</div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-value">4409</div>
                    <div className="stat-label">Likes</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleSocialClick('tiktok')}
                  className="social-button tiktok-button"
                  style={{
                    display: 'flex',
                    width: '100%',
                    padding: '14px',
                    background: 'black',
                    color: '#fff',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
                  }}
                >
                  <i className="fa fa-external-link"></i>
                  VISIT MY TIKTOK
                </button>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div style={{
              border: '1px solid #222',
              borderRadius: '15px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #000000, #1a1a1a)',
              position: 'relative',
              transition: 'all 0.3s ease',
              height: '100%'
            }} className="social-card linkedin-card" data-aos="fade-left" data-aos-delay="400" data-aos-duration="800">
              <div className="social-banner linkedin-banner" style={{
                height: '140px',
                background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${profileImages.linkedinBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div className="profile-avatar" style={{
                  position: 'absolute',
                  bottom: '-50px',
                  left: '30px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `url(${profileImages.linkedinProfile}) center/cover no-repeat`,
                  border: '4px solid #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  zIndex: 2
                }}>
                  {/* Hanya gambar, tanpa icon */}
                </div>
              </div>
              
              <div className="social-content" style={{ padding: '70px 30px 30px 30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 5px 0' }}>Syafizam</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <i className="fa fa-user-shield" style={{ fontSize: '0.8rem' }}></i>
                     17 years old | Founder HackDev | CTF Player NADI X CyberSecurity | Science Computer Student | SMK Bongawan | White Hat Hacker | Red team | CyberSecurity Student | Junior CyberSecurity | Become Purple Team(2026)
                    </p>
                  </div>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem'
                  }}>
                    <i className="fab fa-linkedin" style={{ color: '#fff' }}></i>
                  </div>
                </div>
                
                
                <div className="social-stats" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '25px',
                  padding: '15px 0',
                  borderTop: '1px solid #222',
                  borderBottom: '1px solid #222'
                }}>
                  <div className="stat-item">
                    <div className="stat-value">500+</div>
                    <div className="stat-label">Connections</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">30</div>
                    <div className="stat-label">Posts</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleSocialClick('linkedin')}
                  className="social-button linkedin-button"
                  style={{
                    display: 'flex',
                    width: '100%',
                    padding: '14px',
                    background: '#0a66c2',
                    color: '#fff',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
                  }}
                >
                  <i className="fa fa-external-link"></i>
                  VISIT MY LINKEDIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '50px 5%',
        borderTop: '1px solid #222',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem',
        backgroundColor: '#000',
        position: 'relative'
      }} data-aos="fade-up" data-aos-duration="800">
        <div className="footer-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p>by <strong>FizamCyberSec | HackDev </strong></p>
          <p style={{ marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>Built with React & Vite • Cybersecurity Portfolio</p>
          <div className="footer-links" style={{ 
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>
            
          </div>
        </div>
      </footer>

      <SplashCursor />
    </div>
  )
}

export default App;