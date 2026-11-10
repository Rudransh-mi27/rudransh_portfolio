'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import styles from './Navbar.module.scss';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Achievements', href: '#achievements', id: 'achievements' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id), 140);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className={styles.brand}
        >
          <span className={styles.brandName}>RUDRANSH</span>
          <span className={styles.brandSerif}>Mishra</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className={styles.navItem}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {item.label}
                    {isActive && <span className={styles.activeDot} />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className={styles.navActions}>
          <a
            href={PERSONAL_INFO.resumePath}
            download="Rudransh_Mishra_Resume.pdf"
            className={styles.resumeBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Resume</span>
            <Download size={14} className={styles.btnIcon} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerContent}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerLabel}>NAVIGATION</span>
            <span className={styles.locationTag}>Barabanki, IN</span>
          </div>

          <ul className={styles.mobileNavList}>
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className={styles.mobileNavItem}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`${styles.mobileNavLink} ${isActive ? styles.activeMobile : ''}`}
                  >
                    <span className={styles.mobileNavNumber}>0{index + 1}</span>
                    <span className={styles.mobileNavTitle}>{item.label}</span>
                    {isActive && <span className={styles.mobileActivePill}>Current</span>}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className={styles.drawerFooter}>
            <a
              href={PERSONAL_INFO.resumePath}
              download="Rudransh_Mishra_Resume.pdf"
              className={styles.mobileResumeBtn}
            >
              <span>Download Resume PDF</span>
              <Download size={16} />
            </a>

            <div className={styles.mobileSocials}>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight size={13} />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
