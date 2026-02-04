import { useState } from 'react'
import './App.css'
import SplashCursor from './SplashCursor' 
import Threads from './Threads';

function App() {
  return (
    // Gunakan minHeight 100vh dan pastikan bg hitam
    <div style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'monospace', minHeight: '100vh', width: '100%' }}>
      
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 5%',
        zIndex: 100,
        background: 'rgba(0,0,0,0.7)', // Gelap sedikit untuk nampak menu
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        boxSizing: 'border-box'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }}>FIZAMCYBERSEC</div>
        <div style={{ display: 'flex', gap: '25px', fontSize: '0.8rem' }}>
          <a href="#home" style={{ color: '#fff' }}>HOME</a>
          <a href="#about" style={{ color: '#666' }}>ABOUT</a>
          <a href="#work" style={{ color: '#666' }}>CERT</a>
        </div>
      </nav>

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
        background: '#000' // Pastikan seksyen ni hitam
      }}>
        {/* Threads dibuat betul-betul penuh */}
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

        <div style={{ textAlign: 'center', padding: '0 20px', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)', 
            letterSpacing: '-3px', 
            margin: '0', 
            lineHeight: '0.9',
            fontWeight: '900'
          }}>
           FIZAMCYBERSEC
          </h1>
          <p style={{ color: '#555', marginTop: '20px', fontSize: 'clamp(0.8rem, 2vw, 1rem)', letterSpacing: '4px' }}>
            CYBERSECURITY JUNIOR
          </p>
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
        {/* Konten About yang anda buat tadi... */}
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
             <h2 style={{ fontSize: '2rem', marginBottom: '50px', borderLeft: '4px solid #fff', paddingLeft: '20px' }}>./WHOAMI</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
                <p style={{ color: '#888', lineHeight: '2', fontSize: '1.1rem' }}>
                  Hello saya syafizam
                </p>
                <div style={{ border: '1px solid #222', padding: '30px' }}>
                  <span style={{ color: '#fff', fontSize: '0.9rem' }}>// Skills</span>
                  <p style={{ color: '#444', fontSize: '0.8rem', marginTop: '10px' }}>React • Vite • PHP • Cryptography • Linux</p>
                </div>
             </div>
        </div>
      </section>

      <SplashCursor />
    </div>
  )
}

export default App;