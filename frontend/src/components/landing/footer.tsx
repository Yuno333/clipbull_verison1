"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">TUKKA<span className="footer__logo-dot" /></span>
            <p className="footer__tagline">The Distribution Engine<br />for Viral Content</p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <span className="footer__col-title">Platform</span>
              <Link href="/auth/signup" className="footer__link">Get Started</Link>
              <Link href="#features" className="footer__link">Features</Link>
              <Link href="#how-it-works" className="footer__link">Process</Link>
            </div>
            <div className="footer__col">
              <span className="footer__col-title">Connect</span>
              <a href="#" className="footer__link">Twitter</a>
              <a href="#" className="footer__link">Instagram</a>
              <a href="#" className="footer__link">Discord</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">© 2026 TUKKA. All rights reserved.</span>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Privacy</a>
            <a href="#" className="footer__legal-link">Terms</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          padding: 80px 48px 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .footer__inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 64px;
        }

        .footer__brand {
          max-width: 280px;
        }

        .footer__logo {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .footer__logo-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ff2d78;
          display: inline-block;
          margin-top: 8px;
        }

        .footer__tagline {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.3);
          line-height: 1.6;
          margin-top: 16px;
        }

        .footer__links {
          display: flex;
          gap: 80px;
        }

        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer__col-title {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .footer__link {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.35);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer__link:hover {
          color: #fff;
        }

        .footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .footer__copy {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.2);
        }

        .footer__legal {
          display: flex;
          gap: 24px;
        }

        .footer__legal-link {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.2);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer__legal-link:hover {
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .footer {
            padding: 60px 24px 32px;
          }

          .footer__top {
            flex-direction: column;
            gap: 48px;
          }

          .footer__links {
            gap: 48px;
          }

          .footer__bottom {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
