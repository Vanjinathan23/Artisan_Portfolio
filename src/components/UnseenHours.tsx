import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const UnseenHours = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent('artisana:journal-enter'));
  }, []);

  const entries = [
    {
      date: 'May 14, 2026 · 4:12 AM',
      title: 'When the Clay Remembers',
      content: 'The wheel was cold this morning. Sourced a new batch of Rajasthan stoneware, but it carries a different memory. It resists the upward pull. The walls collapsed on the third vessel. Sometimes you have to listen to the clay instead of forcing your shape. I left the pieces on the board to return to the earth.'
    },
    {
      date: 'April 28, 2026 · 3:45 AM',
      title: 'The Unpredictable Kiln',
      content: 'Fired the reduction kiln to 1280°C. Waiting for it to cool is the hardest part. When I opened it at 100°C, the copper red glaze on the three bowls had turned a pale celadon. A draft must have entered. It is not what I planned, but the soft green is beautiful in its own way. A gift from the fire.'
    },
    {
      date: 'March 11, 2026 · 5:20 AM',
      title: 'Solitude in Chennai Rain',
      content: 'Heavy monsoon rains starting early. The sound on the tin roof is deafening. Working on the linen canvases with hand-ground ochre. The humidity slows the drying, giving me more time to sit with the pigment. The ochre matches the wet earth outside. The studio feels like a shelter from time.'
    }
  ];

  return (
    <div className="pm-page">
      <div className="pm-header pm-fade pm-visible">
        <div className="pm-top-label-wrap">
          <span className="pm-top-label">artisana studio · private journal</span>
        </div>
        <h1 className="pm-piece-name">Unseen Hours</h1>
        <p className="pm-type-pill" style={{ textTransform: 'uppercase' }}>unfiltered process diary</p>
      </div>

      <div className="pm-provenance pm-fade pm-visible" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '40px' }}>
          {entries.map((entry, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid rgba(245,239,230,0.07)', paddingBottom: '32px' }}>
              <span className="pm-detail-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--color-terra)' }}>
                {entry.date}
              </span>
              <h2 className="pm-detail-value" style={{ margin: '0 0 16px 0', fontFamily: 'var(--font-head)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--color-ondark)' }}>
                {entry.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: '1.7', color: 'rgba(245, 239, 230, 0.75)' }}>
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="pm-footer" style={{ marginTop: '80px' }}>
        <span className="pm-footer-brand">artisana.in</span>
        <span className="pm-footer-ref">UNSEEN HOURS</span>
        <Link to="/" className="pm-back-link">← View Portfolio</Link>
      </footer>
    </div>
  );
};

export default UnseenHours;
