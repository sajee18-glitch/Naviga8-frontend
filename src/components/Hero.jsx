
function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <span className="hero-eyebrow">
          UNIVERSITY OF SRI JAYEWARDENEPURA
        </span>

        <h1>
          Your faculty.
          <br />
          <span>One connected</span>
          <br />
          resource hub.
        </h1>

        <p>
          Discover engineering laboratories, equipment, software
          and shared facilities — all in one place.
        </p>

        <a className="hero-button" href="#resources">
          Explore resources <span>→</span>
        </a>

        <div className="hero-note">
          <span>✓</span>
          One place to discover faculty resources
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />

        <div className="hero-center">
          <span>N8</span>
          <small>ENGINEERING RESOURCE HUB</small>
        </div>

        <div className="hero-floating hero-floating-top">
          <span>🔬</span>
          <div>
            <strong>Engineering labs</strong>
            <small>Explore facilities</small>
          </div>
        </div>

        <div className="hero-floating hero-floating-bottom">
          <span>💻</span>
          <div>
            <strong>Digital resources</strong>
            <small>Find what you need</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
