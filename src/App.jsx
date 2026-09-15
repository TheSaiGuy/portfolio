import './App.css';
import BorderGlow from './components/BorderGlow';
import LightPillar from './components/LightPillar';

function App() {
  const projects = [
    {
      title: 'Cold Spray Development',
      description: 'Inert gas shrouding system to minimize oxygen contamination.',
    },
    {
      title: 'Parametric Cycle Analysis & CFD Nozzle Design',
      description: 'Thermodynamic analysis script and plug nozzle design for a jet engine.',
    },
    {
      title: 'Grounds Fluids System',
      description: 'P&ID for high-pressure gaseous nitrogen handling for rocket testing.',
    },
    {
      title: 'Launch Lugs Design',
      description: 'Dual-pin rail departure mechanism and clearance analysis.',
    }
  ];

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', backgroundColor: '#09090b' }}>
        <LightPillar
          topColor="#88210c"
          bottomColor="#ff9200"
          intensity={1.0}
          rotationSpeed={0.4}
          glowAmount={0.005}
          pillarWidth={3.0}
          pillarHeight={0.5}
          noiseIntensity={0.5}
          pillarRotation={0}
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
          {projects.map((project, index) => (
            <a key={index} href="#" className="project-card">
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
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
