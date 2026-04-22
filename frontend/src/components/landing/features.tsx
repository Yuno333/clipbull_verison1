"use client";

export function Features() {
  const features = [
    {
      number: "01",
      title: "CAMPAIGN CREATION",
      desc: "Launch campaigns with custom budgets, CPM rates, and niche targeting.",
    },
    {
      number: "02",
      title: "EARNER NETWORK",
      desc: "Thousands of earners amplify your content across every platform.",
    },
    {
      number: "03",
      title: "REAL-TIME TRACKING",
      desc: "Monitor impressions, payouts, and ROI with live analytics.",
    },
  ];

  return (
    <section className="features" id="features">
      <div className="features__inner">
        <div className="features__header">
          <span className="features__label">WHAT WE DO</span>
          <h2 className="features__title">Built for<br />Viral Scale</h2>
        </div>

        <div className="features__grid">
          {features.map((f) => (
            <div key={f.number} className="features__card">
              <span className="features__card-number">{f.number}</span>
              <h3 className="features__card-title">{f.title}</h3>
              <p className="features__card-desc">{f.desc}</p>
              <div className="features__card-line" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features {
          padding: 120px 48px;
          position: relative;
        }

        .features__inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .features__header {
          margin-bottom: 80px;
        }

        .features__label {
          font-size: 11px;
          font-weight: 600;
          color: #ff2d78;
          letter-spacing: 4px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 16px;
        }

        .features__title {
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -2px;
        }

        .features__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255, 255, 255, 0.06);
        }

        .features__card {
          padding: 48px 40px;
          background: #0a0a0a;
          position: relative;
          transition: background 0.3s ease;
        }

        .features__card:hover {
          background: #111;
        }

        .features__card-number {
          font-size: 48px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.04);
          display: block;
          margin-bottom: 24px;
        }

        .features__card-title {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .features__card-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.7;
          max-width: 280px;
        }

        .features__card-line {
          width: 32px;
          height: 2px;
          background: #ff2d78;
          margin-top: 32px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .features__card:hover .features__card-line {
          opacity: 1;
        }

        @media (max-width: 900px) {
          .features {
            padding: 80px 24px;
          }

          .features__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
