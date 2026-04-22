"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <span className="navbar__logo-text">TUKKA</span>
          <span className="navbar__logo-dot" />
        </Link>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`navbar__hamburger-line ${menuOpen ? "navbar__hamburger-line--open" : ""}`} />
          <span className={`navbar__hamburger-line ${menuOpen ? "navbar__hamburger-line--open" : ""}`} />
        </button>

        {/* Nav Links */}
        <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
          <Link href="/" className="navbar__link navbar__link--active">Home</Link>
          <Link href="#features" className="navbar__link">Features</Link>
          <Link href="#how-it-works" className="navbar__link">Process</Link>
          <Link href="#contact" className="navbar__link">Contact</Link>
        </nav>

        {/* Auth Actions */}
        <div className="navbar__actions">
          <Link href="/auth/login" className="navbar__link navbar__link--subtle">Log in</Link>
          <Link href="/auth/signup" className="navbar__btn">Get Started</Link>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 0 48px;
          height: 72px;
          display: flex;
          align-items: center;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .navbar__inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
        }

        .navbar__logo-text {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .navbar__logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff2d78;
          margin-top: 8px;
        }

        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .navbar__hamburger-line {
          width: 24px;
          height: 2px;
          background: #fff;
          transition: all 0.3s ease;
        }

        .navbar__nav {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .navbar__link {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: color 0.2s ease;
        }

        .navbar__link:hover {
          color: #fff;
        }

        .navbar__link--active {
          color: #fff;
        }

        .navbar__link--subtle {
          color: rgba(255, 255, 255, 0.6);
        }

        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .navbar__btn {
          font-size: 12px;
          font-weight: 600;
          color: #000;
          background: #ff2d78;
          padding: 10px 24px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: all 0.2s ease;
        }

        .navbar__btn:hover {
          background: #ff4d8e;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 0 24px;
          }

          .navbar__hamburger {
            display: flex;
          }

          .navbar__nav {
            display: none;
          }

          .navbar__nav--open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 72px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            padding: 32px 24px;
            gap: 24px;
          }

          .navbar__actions {
            gap: 16px;
          }
        }
      `}</style>
    </header>
  );
}
