import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { soldPieces } from '../data/pieceJourneyData';

export const PieceMemory = () => {
  const { id } = useParams<{ id: string }>();
  const piece = soldPieces.find((p) => p.id === id);

  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const sections = [
      { ref: headerRef, delay: 0 },
      { ref: imageRef, delay: 200 },
      { ref: detailsRef, delay: 400 },
      { ref: processRef, delay: 600 },
      { ref: noteRef, delay: 800 },
    ];
    sections.forEach(({ ref, delay }) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current?.classList.add('pm-visible');
        }, delay);
      }
    });
  }, [id]);

  if (!piece) {
    return (
      <div className="pm-page">
        <div className="pm-not-found">
          <p className="pm-top-label">artisana studio · provenance record</p>
          <h1 className="pm-not-found-h">This piece has not been registered yet.</h1>
          <p className="pm-not-found-p">The memory page for this piece may not exist or may be added in the future.</p>
          <Link to="/" className="pm-back-link">← View Portfolio</Link>
        </div>
      </div>
    );
  }

  const provenance = [
    { label: 'Date Made', value: `${piece.dateMade} · ${piece.timeStarted}` },
    { label: 'The Weather That Morning', value: piece.weather },
    { label: 'Material & Origin', value: piece.material },
    { label: 'Firing Process', value: piece.firingTemp },
    { label: 'Surface Treatment', value: piece.glaze },
    { label: 'Given to', value: `${piece.givenTo} · ${piece.givenDate}` },
  ];

  return (
    <div className="pm-page">
      {/* Section 1 — Header */}
      <div className="pm-header pm-fade" ref={headerRef}>
        <div className="pm-top-label-wrap">
          <span className="pm-top-label">artisana studio · provenance record</span>
        </div>
        <div className="pm-ghost-id" aria-hidden="true">{piece.id}</div>
        <h1 className="pm-piece-name">{piece.name}</h1>
        <div className="pm-type-pill">{piece.type}</div>
      </div>

      {/* Section 2 — Main Image */}
      <div className="pm-main-img-wrap pm-fade" ref={imageRef}>
        <img src={piece.image} alt={piece.name} className="pm-main-img" />
        <div className="pm-img-gradient" />
        <div className="pm-img-status">
          <span className="pm-status-dot">●</span> With its owner · {piece.givenTo}
        </div>
      </div>

      {/* Section 3 — Provenance Details */}
      <div className="pm-provenance pm-fade" ref={detailsRef}>
        <div className="pm-provenance-grid">
          {provenance.map((item) => (
            <div key={item.label} className="pm-detail">
              <span className="pm-detail-label">{item.label}</span>
              <span className="pm-detail-value">{item.value}</span>
              <div className="pm-detail-rule" />
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 — Process Image */}
      <div className="pm-process pm-fade" ref={processRef}>
        <p className="pm-process-label">During the Making</p>
        <div className="pm-process-img-wrap">
          <img src={piece.processImage} alt={`Making of ${piece.name}`} className="pm-process-img" />
        </div>
        <p className="pm-process-caption">
          The making of {piece.name} — {piece.type} · {piece.dateMade}
        </p>
      </div>

      {/* Section 5 — Artisan's Note */}
      <div className="pm-note pm-fade" ref={noteRef}>
        <p className="pm-note-label">A note from the maker</p>
        <blockquote className="pm-note-text">"{piece.artisanNote}"</blockquote>
        <p className="pm-note-sig">— Studio Artisana, Chennai</p>
      </div>

      {/* Section 6 — Footer */}
      <footer className="pm-footer">
        <span className="pm-footer-brand">artisana.in</span>
        <span className="pm-footer-ref">REF: {piece.id}</span>
        <Link to="/" className="pm-back-link">← View Portfolio</Link>
      </footer>
    </div>
  );
};

export default PieceMemory;
