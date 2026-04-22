"use client";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      role: "CREATOR",
      title: "Launch Campaign",
      desc: "Set your budget, CPM, and content link. Define the niche and max earners.",
    },
    {
      step: "02",
      role: "EARNER",
      title: "Claim & Repost",
      desc: "Browse campaigns, accept offers, and repost content across your platforms.",
    },
    {
      step: "03",
      role: "PLATFORM",
      title: "Track & Pay",
      desc: "Impressions verified. Earnings calculated automatically. Payouts released.",
    },
  ];

  return (
    <section className="how" id="how-it-works">
      <div className="how__inner">
        <div className="how__header">
          <span className="how__label">THE PROCESS</span>
          <h2 className="how__title">Three Steps.<br />Zero Friction.</h2>
        </div>

        <div className="how__steps">
          {steps.map((s, i) => (
            <div key={s.step} className="how__step">
              <div className="how__step-header">
                <span className="how__step-num">{s.step}</span>
                <span className="how__step-role">{s.role}</span>
              </div>
              <h3 className="how__step-title">{s.title}</h3>
              <p className="how__step-desc">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="how__step-connector">
                  <div className="how__step-connector-line" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how {
          padding: 120px 48px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .how__inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .how__header {
          margin-bottom: 80px;
          text-align: right;
        }

        .how__label {
          font-size: 11px;
          font-weight: 600;
          color: #ff2d78;
          letter-spacing: 4px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 16px;
        }

        .how__title {
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -2px;
        }

        .how__steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 64px;
          position: relative;
        }

        .how__step {
          position: relative;
        }

        .how__step-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .how__step-num {
          font-size: 64px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          line-height: 1;
        }

        .how__step-role {
          font-size: 10px;
          font-weight: 700;
          color: #ff2d78;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: rgba(255, 45, 120, 0.08);
          padding: 6px 12px;
          border: 1px solid rgba(255, 45, 120, 0.15);
        }

        .how__step-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .how__step-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.7;
          max-width: 300px;
        }

        .how__step-connector {
          position: absolute;
          top: 32px;
          right: -32px;
          width: 64px;
          display: flex;
          align-items: center;
        }

        .how__step-connector-line {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 900px) {
          .how {
            padding: 80px 24px;
          }

          .how__header {
            text-align: left;
          }

          .how__steps {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .how__step-connector {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
