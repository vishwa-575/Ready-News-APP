import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 30 },
          size: { value: 2 },
          move: { speed: 0.5 },
          color: { value: "#ffffff" },
          opacity: { value: 0.3 },
          links: { enable: false },
        },
      }}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default ParticleBackground;
