import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { soldPieces } from '../data/pieceJourneyData';

// QR-like SVG per piece (purely decorative finder-pattern style)
const QR_PATTERNS: Record<string, string> = {
  'AM-001': `
    <rect x="0" y="0" width="21" height="21" fill="none"/>
    <rect x="0" y="0" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="1" y="1" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="2" y="2" width="3" height="3" fill="currentColor"/>
    <rect x="14" y="0" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="15" y="1" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="16" y="2" width="3" height="3" fill="currentColor"/>
    <rect x="0" y="14" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="1" y="15" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="2" y="16" width="3" height="3" fill="currentColor"/>
    <rect x="9" y="0" width="3" height="3" fill="currentColor"/>
    <rect x="9" y="4" width="2" height="2" fill="currentColor"/>
    <rect x="12" y="2" width="1" height="3" fill="currentColor"/>
    <rect x="9" y="9" width="3" height="3" fill="currentColor"/>
    <rect x="13" y="9" width="2" height="2" fill="currentColor"/>
    <rect x="16" y="9" width="3" height="3" fill="currentColor"/>
    <rect x="9" y="13" width="2" height="3" fill="currentColor"/>
    <rect x="12" y="14" width="3" height="2" fill="currentColor"/>
    <rect x="16" y="14" width="2" height="3" fill="currentColor"/>
    <rect x="9" y="17" width="3" height="3" fill="currentColor"/>
    <rect x="13" y="18" width="2" height="2" fill="currentColor"/>
    <rect x="17" y="17" width="3" height="3" fill="currentColor"/>
  `,
  'AM-002': `
    <rect x="0" y="0" width="21" height="21" fill="none"/>
    <rect x="0" y="0" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="1" y="1" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="2" y="2" width="3" height="3" fill="currentColor"/>
    <rect x="14" y="0" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="15" y="1" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="16" y="2" width="3" height="3" fill="currentColor"/>
    <rect x="0" y="14" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="1" y="15" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="2" y="16" width="3" height="3" fill="currentColor"/>
    <rect x="9" y="1" width="2" height="4" fill="currentColor"/>
    <rect x="12" y="0" width="1" height="2" fill="currentColor"/>
    <rect x="10" y="9" width="4" height="2" fill="currentColor"/>
    <rect x="9" y="12" width="2" height="2" fill="currentColor"/>
    <rect x="14" y="10" width="3" height="3" fill="currentColor"/>
    <rect x="18" y="9" width="2" height="4" fill="currentColor"/>
    <rect x="9" y="15" width="3" height="2" fill="currentColor"/>
    <rect x="13" y="16" width="2" height="4" fill="currentColor"/>
    <rect x="16" y="15" width="4" height="2" fill="currentColor"/>
    <rect x="9" y="18" width="2" height="2" fill="currentColor"/>
    <rect x="17" y="18" width="3" height="2" fill="currentColor"/>
  `,
  'AM-003': `
    <rect x="0" y="0" width="21" height="21" fill="none"/>
    <rect x="0" y="0" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="1" y="1" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="2" y="2" width="3" height="3" fill="currentColor"/>
    <rect x="14" y="0" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="15" y="1" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="16" y="2" width="3" height="3" fill="currentColor"/>
    <rect x="0" y="14" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="1" y="15" width="5" height="5" rx="0.5" fill="white"/>
    <rect x="2" y="16" width="3" height="3" fill="currentColor"/>
    <rect x="9" y="0" width="4" height="2" fill="currentColor"/>
    <rect x="10" y="3" width="2" height="3" fill="currentColor"/>
    <rect x="12" y="5" width="2" height="2" fill="currentColor"/>
    <rect x="9" y="9" width="2" height="5" fill="currentColor"/>
    <rect x="12" y="10" width="4" height="2" fill="currentColor"/>
    <rect x="17" y="9" width="2" height="3" fill="currentColor"/>
    <rect x="16" y="13" width="4" height="2" fill="currentColor"/>
    <rect x="9" y="14" width="4" height="3" fill="currentColor"/>
    <rect x="14" y="16" width="2" height="4" fill="currentColor"/>
    <rect x="9" y="18" width="3" height="2" fill="currentColor"/>
    <rect x="17" y="17" width="3" height="3" fill="currentColor"/>
  `,
};

export const PieceJourney = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('pj-visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="piece-journey" className="pj-section">
      <div className="wrap">
        {/* Header */}
        <div className="pj-header pj-reveal" ref={headerRef}>
          <div className="pj-header-left">
            <div className="tag-label">The Piece's Journey</div>
            <h2 className="sec-h2 mt-2">Every Piece Carries <em>Its Own Memory</em></h2>
          </div>
          <div className="pj-header-cols">
            <p className="pj-header-p">
              Each commissioned piece receives a permanent digital memory page. A QR code is given
              to every owner — linking them to the full story of their piece: when it was made, the
              weather that morning, the material it came from, and a personal note written for them alone.
            </p>
            <p className="pj-header-p pj-header-muted">
              Scan any of the codes below to see an example of what every owner receives. This is not
              a receipt. It is a provenance record — a digital soul for every physical piece.
            </p>
          </div>
        </div>

        {/* Pieces Grid */}
        <div className="pj-grid">
          {soldPieces.map((piece, i) => (
            <div
              key={piece.id}
              className="pj-card pj-reveal"
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Image */}
              <div className="pj-card-img-wrap">
                <img src={piece.image} alt={piece.name} className="pj-card-img" />
                <div className="pj-status-badge">
                  <span className="pj-status-dot">●</span> With its owner
                </div>
              </div>

              {/* Info */}
              <div className="pj-card-info">
                <span className="pj-piece-id">{piece.id}</span>
                <h3 className="pj-piece-name">{piece.name}</h3>
                <p className="pj-piece-meta">{piece.type} · Made {piece.dateMade.split(',')[0].split(' ').slice(0, 2).join(' ')} {piece.dateMade.split(',')[1]}</p>

                <div className="pj-divider" />

                <div className="pj-qr-row">
                  {/* QR Visual */}
                  <div className="pj-qr-visual">
                    <svg
                      viewBox="0 0 21 21"
                      width="64"
                      height="64"
                      className="pj-qr-svg"
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: QR_PATTERNS[piece.id] || QR_PATTERNS['AM-001'] }}
                    />
                  </div>

                  <div className="pj-qr-text">
                    <span className="pj-qr-scan">Scan to see full provenance</span>
                    <span className="pj-qr-url">artisana.in/piece/{piece.id}</span>
                    <Link to={`/piece/${piece.id}`} className="pj-view-link">
                      View Memory Page →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PieceJourney;
