import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import BorderGlow from './components/BorderGlow';
import LightPillar from './components/LightPillar';
import GradientText from './components/GradientText';

const projects = [
  {
    id: 'cold-spray',
    title: 'Cold Spray Development',
    description: 'Inert gas shrouding system to minimize oxygen contamination.',
  },
  {
    id: 'pca-cfd',
    title: 'Parametric Cycle Analysis & CFD Nozzle Design',
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
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', backgroundColor: '#09090b' }}>
        <LightPillar
          topColor="#88210c"
          bottomColor="#ff9200"
          intensity={1.0}
          rotationSpeed={0.4}
          glowAmount={0.002}
          pillarWidth={3.0}
          pillarHeight={0.5}
          noiseIntensity={0.5}
          pillarRotation={43}
          interactive={false}
          mixBlendMode="normal"
        />
      </div>
      <div className="portfolio-container" style={{ position: 'relative', zIndex: 1 }}>
        <header className="hero">
          <h1>Sai's Engineering Portfolio</h1>
          <p>Mechanical Engineering & Propulsion Systems</p>
        </header>

        <div className="projects-grid">
          {projects.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`} className="project-card">
              <BorderGlow
                edgeSensitivity={30}
                glowColor="30 100 50"
                backgroundColor="rgba(0, 0, 0, 0.7)"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={1.0}
                coneSpread={25}
                animated={true}
                colors={['#ff7b00', '#ffb700', '#ff3300']}
                className="w-full h-full flex"
              >
                <div className="project-content">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              </BorderGlow>
            </Link>
          ))}
        </div>
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
    <div style={{ minHeight: '100vh', backgroundColor: '#09090b', padding: '4rem 2rem' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ 
          background: 'none', 
          border: '1px solid rgba(255,255,255,0.2)', 
          color: 'white', 
          padding: '0.5rem 1rem', 
          borderRadius: '8px', 
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        &larr; Back to Portfolio
      </button>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <GradientText
          colors={["#eb6302","#e00a28","#f1c808"]}
          animationSpeed={3}
          showBorder={false}
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
