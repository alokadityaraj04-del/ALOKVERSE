
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Stars,
  Sparkles,
  Torus,
  OrbitControls,
  MeshDistortMaterial
} from "@react-three/drei";
import { motion } from "framer-motion";
import "./index.css";

// ORBITING PLANET
function OrbitingPlanet({ radius, size, speed, color, tilt = 0 }) {
  const orbitRef = useRef();

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={orbitRef} rotation={[tilt, 0, 0]}>
      <Float speed={1.5} floatIntensity={0.4}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[size, 48, 48]} />
          <meshStandardMaterial
            color={color}
            metalness={0.75}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.35}
          />
        </mesh>

        <mesh position={[radius + size * 1.5, size * 0.8, 0]}>
          <sphereGeometry args={[size * 0.22, 24, 24]} />
          <meshStandardMaterial
            color="#e9d5ff"
            emissive="#a855f7"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

// CENTRAL PLANET
function CentralPlanet() {
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const { pointer } = state;

    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.15;

      planetRef.current.rotation.x +=
        (pointer.y * 0.18 - planetRef.current.rotation.x) * 2 * delta;

      planetRef.current.rotation.z +=
        (-pointer.x * 0.18 - planetRef.current.rotation.z) * 2 * delta;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group>
      <group ref={planetRef}>
        <mesh>
          <sphereGeometry args={[1.65, 48, 48]} />
          <meshBasicMaterial
            color="#9333ea"
            transparent
            opacity={0.09}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[1.25, 64, 64]} />
          <MeshDistortMaterial
            color="#5b21b6"
            emissive="#581c87"
            emissiveIntensity={0.5}
            metalness={0.65}
            roughness={0.2}
            distort={0.18}
            speed={1.5}
          />
        </mesh>

        <mesh scale={0.83}>
          <sphereGeometry args={[1.25, 48, 48]} />
          <meshStandardMaterial
            color="#9333ea"
            wireframe
            transparent
            opacity={0.28}
          />
        </mesh>
      </group>

      <group ref={ringRef}>
        <Torus args={[1.9, 0.025, 16, 120]} rotation={[1.15, 0.25, 0]}>
          <meshStandardMaterial
            color="#c084fc"
            emissive="#9333ea"
            emissiveIntensity={3}
          />
        </Torus>

        <Torus args={[2.15, 0.012, 12, 120]} rotation={[1.15, 0.25, 0]}>
          <meshBasicMaterial color="#22d3ee" />
        </Torus>
      </group>

      <Torus args={[1.5, 0.012, 12, 100]} rotation={[0.3, 1.2, 0]}>
        <meshBasicMaterial color="#e9d5ff" />
      </Torus>
    </group>
  );
}

// COMPLETE 3D UNIVERSE
function Portal() {
  return (
    <>
      <ambientLight intensity={0.65} />

      <pointLight position={[4, 4, 5]} intensity={45} color="#a855f7" />
      <pointLight position={[-5, -3, -4]} intensity={35} color="#22d3ee" />

      <spotLight position={[0, 6, 5]} intensity={30} color="#ffffff" />

      <color attach="background" args={["#070611"]} />

      <Stars
        radius={100}
        depth={60}
        count={3500}
        factor={4}
        saturation={0.5}
        fade
        speed={1}
      />

      <Sparkles count={180} scale={12} size={3} speed={0.5} color="#c084fc" />
      <Sparkles count={70} scale={8} size={5} speed={0.3} color="#22d3ee" />

      <Float speed={1.5} floatIntensity={0.25}>
        <CentralPlanet />
      </Float>

      <OrbitingPlanet radius={3.1} size={0.28} speed={0.35} color="#22d3ee" tilt={0.3} />
      <OrbitingPlanet radius={4.1} size={0.19} speed={-0.22} color="#f0abfc" tilt={1.1} />
      <OrbitingPlanet radius={2.8} size={0.13} speed={0.5} color="#fbbf24" tilt={1.7} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.35}
        rotateSpeed={0.5}
      />
    </>
  );
}

// MAIN APP
function App() {
  return (
    <div className="portfolio">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>ALOKVERSE</h2>

        <div>
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            WELCOME TO MY UNIVERSE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            HELLO, I'M <span>ALOK ADITYA RAJ.</span>
          </motion.h1>

          <h3>Frontend Developer | CSE Student</h3>

          <p>
            I build modern websites and interactive digital
            experiences. Welcome to my creative universe.
          </p>

          <a href="#projects" className="primary-btn">
            EXPLORE MY WORK
          </a>
        </div>

        <div className="scene">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <Portal />
          </Canvas>
        </div>
      </section>

      {/* ABOUT */}
      <section className="info-section" id="about">
        <h2>ABOUT ME</h2>
        <p>
          I am a Computer Science Engineering student passionate
          about frontend development, programming and creative
          technologies. I enjoy building responsive websites
          and interactive applications.
        </p>
      </section>

      {/* SKILLS */}
      <section className="info-section" id="skills">
        <h2>MY SKILLS</h2>

        <div className="skills-grid">
          {[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "SQL",
            "Git & GitHub"
          ].map((skill) => (
            <div className="skill-card" key={skill}>
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="info-section" id="projects">
        <h2>MY PROJECTS</h2>

        <div className="projects-grid">

          <a
            href="https://github.com/alokadityaraj04-del/portfolio-website"
            target="_blank"
            rel="noreferrer"
            className="project-card"
          >
            <span>01</span>
            <h3>Portfolio Website</h3>
            <p>Responsive personal portfolio using HTML and CSS.</p>
            <small>VIEW PROJECT ↗</small>
          </a>

          <a
            href="https://github.com/alokadityaraj04-del/Netflix-Clone"
            target="_blank"
            rel="noreferrer"
            className="project-card"
          >
            <span>02</span>
            <h3>Netflix Clone</h3>
            <p>Netflix-inspired streaming website interface.</p>
            <small>VIEW PROJECT ↗</small>
          </a>

          <a
            href="https://github.com/alokadityaraj04-del"
            target="_blank"
            rel="noreferrer"
            className="project-card"
          >
            <span>03</span>
            <h3>Quiz Application</h3>
            <p>Interactive quiz application using JavaScript.</p>
            <small>VIEW PROJECT ↗</small>
          </a>

        </div>
      </section>

      {/* CONTACT */}
      <section className="info-section contact-section" id="contact">

        <p className="contact-tag">LET'S CONNECT</p>

        <h2>HAVE A PROJECT IN MIND?</h2>

        <p className="contact-description">
          I'm always excited to explore new opportunities,
          collaborate and build something amazing.
        </p>

        <div className="contact-buttons">

          <a href="mailto:your-email@example.com" className="contact-btn">
            ✉ EMAIL ME
          </a>

          <a
            href="https://github.com/alokadityaraj04-del"
            target="_blank"
            rel="noreferrer"
            className="contact-btn"
          >
            GITHUB ↗
          </a>

          
<a
  href="https://www.linkedin.com/in/aditya-raj-391b61360/"
  target="_blank"
  rel="noopener noreferrer"
>
  LinkedIn
</a>


        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 ALOKVERSE | Designed & Developed by Alok Aditya Raj</p>
        <p>Turning Ideas Into Digital Experiences ✨</p>
      </footer>

    </div>
  );
}

export default App;
