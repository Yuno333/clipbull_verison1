"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero__inner">
        {/* Left content */}
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">TUKKA</span>
          </h1>

          <p className="hero__accent">THE DISTRIBUTION ENGINE</p>

          <p className="hero__desc">
            VIRAL<br />
            CONTENT<br />
            AMPLIFIED
          </p>

          <div className="hero__socials">
            <a href="#" className="hero__social" aria-label="Twitter">Tw</a>
            <a href="#" className="hero__social" aria-label="Instagram">Ig</a>
            <a href="#" className="hero__social" aria-label="LinkedIn">In</a>
          </div>
        </div>

        {/* Right visual */}
        <div className="hero__visual">
          <div className="hero__visual-frame">
            <div className="hero__visual-content">
              {/* Geometric art element  */}
              <svg viewBox="0 0 400 400" className="hero__artwork">
                {/* Bull silhouette - abstract geometric */}
                <defs>
                  <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff2d78" />
                    <stop offset="100%" stopColor="#ff6ba1" />
                  </linearGradient>
                </defs>
                {/* Abstract geometric bull head */}
                <polygon points="200,40 340,160 320,300 80,300 60,160" fill="none" stroke="white" strokeWidth="1.5" />
                <polygon points="200,80 300,160 285,260 115,260 100,160" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5" />
                {/* Horns */}
                <line x1="60" y1="160" x2="20" y2="80" stroke="white" strokeWidth="2" />
                <line x1="340" y1="160" x2="380" y2="80" stroke="white" strokeWidth="2" />
                {/* Eyes */}
                <circle cx="155" cy="180" r="8" fill="url(#pinkGrad)" />
                <circle cx="245" cy="180" r="8" fill="url(#pinkGrad)" />
                {/* Nose ring */}
                <circle cx="200" cy="240" r="20" fill="none" stroke="url(#pinkGrad)" strokeWidth="2" />
                {/* Detail lines */}
                <line x1="150" y1="300" x2="150" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="250" y1="300" x2="250" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                {/* Accent dots */}
                <circle cx="200" cy="130" r="3" fill="#ff2d78" />
                <circle cx="180" cy="210" r="2" fill="rgba(255,255,255,0.3)" />
                <circle cx="220" cy="210" r="2" fill="rgba(255,255,255,0.3)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero__bottom">
        <span className="hero__counter">0{currentSlide + 1}</span>

        <div className="hero__slides">
          <span className="hero__slide-current">0{currentSlide + 1}</span>
          <div className="hero__slide-track">
            <div
              className="hero__slide-progress"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>
          {Array.from({ length: totalSlides }, (_, i) => (
            <span
              key={i}
              className={`hero__slide-dot ${i === currentSlide ? "hero__slide-dot--active" : ""}`}
              onClick={() => setCurrentSlide(i)}
            >
              0{i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Pink accent bar */}
      <div className="hero__accent-bar" />

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px 48px 0;
          position: relative;
          overflow: hidden;
        }

        .hero__inner {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          flex: 1;
        }

        .hero__content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hero__title {
          font-size: clamp(72px, 10vw, 140px);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -3px;
          color: #fff;
          margin: 0;
        }

        .hero__title-line {
          display: block;
        }

        .hero__accent {
          font-size: 13px;
          font-weight: 600;
          color: #ff2d78;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 8px;
        }

        .hero__desc {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.6;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 16px;
        }

        .hero__socials {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }

        .hero__social {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          letter-spacing: 1px;
          transition: color 0.2s;
        }

        .hero__social:hover {
          color: #ff2d78;
        }

        /* Visual */
        .hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero__visual-frame {
          width: 100%;
          max-width: 500px;
          aspect-ratio: 1;
          position: relative;
        }

        .hero__visual-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero__artwork {
          width: 100%;
          height: 100%;
          opacity: 0.9;
        }

        /* Bottom */
        .hero__bottom {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .hero__counter {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.3);
          font-weight: 500;
          letter-spacing: 2px;
        }

        .hero__slides {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hero__slide-current {
          font-size: 13px;
          color: #fff;
          font-weight: 600;
        }

        .hero__slide-track {
          width: 120px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .hero__slide-progress {
          height: 100%;
          background: #ff2d78;
          transition: width 0.5s ease;
        }

        .hero__slide-dot {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: color 0.2s;
          letter-spacing: 1px;
        }

        .hero__slide-dot--active {
          color: #fff;
        }

        .hero__slide-dot:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Pink accent bar */
        .hero__accent-bar {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 6px;
          background: #ff2d78;
        }

        @media (max-width: 900px) {
          .hero {
            padding: 100px 24px 0;
          }

          .hero__inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .hero__title {
            font-size: 64px;
          }

          .hero__visual {
            order: -1;
          }

          .hero__visual-frame {
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
}
