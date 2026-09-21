import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import LightPillar from './components/LightPillar';
import BorderGlow from './components/BorderGlow';
import GradientText from './components/GradientText';
import { LiquidMetalButton } from './shaders/liquid-metal-button/LiquidMetalButton';
import ProfileCard from './components/ProfileCard';
import LineSidebar from './components/LineSidebar';
import profileImg from './assets/profile.png';
import resumePdf from './assets/SaiResumeSep2026_Gen_.pdf';
import './App.css';
import './shaders/threeui.css';

const projects = [
  {
    id: 'cold-spray',
    title: 'Cold Spray Development',
    description: 'Inert gas shrouding system to minimize oxygen contamination.',
  },
  {
    id: 'pca-cfd',
    title: 'Engines & Nozzles',
    description: 'Thermodynamic analysis script and plug nozzle design for a jet engine.',
  },
  {
    id: 'grounds-fluids',
    title: 'Grounds Fluids System',
    description: 'P&ID for high-pressure gaseous nitrogen handling for rocket testing.',
  },
  {
    id: 'launch-lugs',
    title: 'Launch Lugs Design',
    description: 'Dual-pin rail departure mechanism and clearance analysis.',
  }
];

function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [orbStyle, setOrbStyle] = useState({ left: 0, width: 0, opacity: 0 });
  
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const refs = { about: aboutRef, projects: projectsRef, contact: contactRef };

  const sections = ['about', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      let current = 'about';
      // Find the last section whose top is at or above the middle of the viewport
      for (const sec of sections) {
        const element = document.getElementById(sec);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = sec;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeEl = refs[activeSection]?.current;
    if (activeEl) {
      // Add a small padding to the orb width
      setOrbStyle({
        left: activeEl.offsetLeft - 16,
        width: activeEl.offsetWidth + 32,
        opacity: 1
      });
    }
  }, [activeSection]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
        <LightPillar
          topColor="#FFCC00"
          bottomColor="#FF4500"
          intensity={1.0}
          rotationSpeed={0.3}
          glowAmount={0.005}
          pillarWidth={3.0}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="normal"
        />
      </div>

      <nav className="glass-navbar">
        <div className="nav-orb" style={orbStyle} />
        <a ref={aboutRef} href="#about" onClick={(e) => scrollToSection(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>About Me</a>
        <a ref={projectsRef} href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
        <a ref={contactRef} href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
      </nav>

      <div className="portfolio-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* About Me Section */}
        <section id="about" className="section-container">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-greeting">Hi I am</p>
              <h1>Saipranav<br/>Telidevarapalli</h1>
              <h2 className="hero-subtitle">Aerospace Engineering</h2>
              
              <div className="hero-buttons">
                <a href="https://www.linkedin.com/in/sai-telidevarapalli" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                  LinkedIn
                </a>
                <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  Resume
                </a>
              </div>
            </div>
            <div className="hero-image-placeholder">
              <ProfileCard
                name=""
                title=""
                handle="saipranav"
                status="Open to Work"
                contactText="Email Me"
                avatarUrl={profileImg}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.open('mailto:test@example.com')}
                behindGlowEnabled={true}
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <Link key={project.id} to={`/project/${project.id}`} className="project-card">
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="30 100 50"
                  backgroundColor="#000000"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1.0}
                  coneSpread={25}
                  animated={true}
                  colors={['#ff7b00', '#ffb700', '#ff3300']}
                  style={{ width: '100%', height: '100%', display: 'flex' }}
                >
                  <div className="project-content">
                    <h2>Project {index + 1}</h2>
                  </div>
                </BorderGlow>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-container">
          <h2 className="section-title">Contact</h2>
          {/* Placeholder for future contact form/info */}
        </section>

      </div>
    </>
  );
}

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) return <div>Project not found</div>;

  return (
    <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#000', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-65px', left: '-65px', width: '360px', height: '230px', zIndex: 10, WebkitTapHighlightColor: 'transparent' }}>
        <LiquidMetalButton
          variant="pill"
          text="Home"
          onClick={() => navigate('/')}
        />
      </div>

      <div style={{ position: 'fixed', left: '80px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
        <LineSidebar
          items={['Overview', 'Components', 'Animations', 'Backgrounds', 'Showcase']}
          accentColor="#ebad0f"
          textColor="#c4c4c4"
          markerColor="#6c6c6c"
          showIndex={true}
          showMarker={true}
          proximityRadius={100}
          maxShift={30}
          falloff="smooth"
          markerLength={60}
          markerGap={0}
          tickScale={0.5}
          scaleTick={true}
          itemGap={20}
          fontSize={1.1}
          smoothing={100}
          defaultActive={0}
          onItemClick={(index, label) => console.log(index, label)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <GradientText
          colors={["#ebad0f", "#2b89cb", "#000000"]}
          animationSpeed={3}
          showBorder={false}
          yoyo={false}
          className="project-title-gradient"
        >
          <h1 style={{ fontSize: '3rem', margin: 0, textAlign: 'center' }}>{project.title}</h1>
        </GradientText>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '4rem auto', color: '#d4d4d8', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>{project.description}</p>
        {/* Placeholder for future content */}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
