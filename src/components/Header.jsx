
function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Navig8 EFac home">
        <span className="brand-mark">N8</span>
        <span className="brand-text">
          <strong>Navig8</strong>
          <small>EFAC RESOURCE HUB</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
        <a className="nav-active" href="#home">Home</a>
        <a href="#categories">Categories</a>
        <a href="#resources">Resources</a>
        <a href="#about">About</a>
      </nav>

      <a className="login-button" href="#login">
        Sign in <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export default Header;
