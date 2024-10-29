import React, { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
type HeaderProps = {
  style?: React.CSSProperties;
};

const styles: { [key: string]: CSSProperties } = {
  header: {
    position: 'relative',
    width: '100%',
    height: '150px',
    backgroundImage: 'url("/background-image.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    boxSizing: 'border-box',
    color: '#fff',
    overflow: 'hidden',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1,
    zIndex: 1,
  },
  nav: {
    position: 'absolute',
    bottom: '-10px',
    left: '0',
    display: 'flex',
    gap: '10px',
    padding: '5px',
    zIndex: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#FF5B5A',
    padding: '10px',
    borderRadius: '5px',
    transition: 'color 0.3s',
  },
  linkActive: {
    color: '#fff',
  },
  linkHover: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  shadow: {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
    transform: 'translateZ(-1px)',
  },
};

const Header: React.FC<HeaderProps> = ({ style }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header style={styles.header}>
      <div style={styles.shadow} />
      <h1 style={styles.title}>Farm's West</h1>
      <nav style={styles.nav}>
        <Link
          to="/"
          style={{
            ...styles.link,
            ...(currentPath === '/' ? styles.linkActive : {}),
          }}
        >
          Menu
        </Link>
        <Link
          to="/order"
          style={{
            ...styles.link,
            ...(currentPath === '/order' ? styles.linkActive : {}),
          }}
        >
          Ma Commande
        </Link>
      </nav>
    </header>
  );
};

export default Header;
