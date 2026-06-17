import React from 'react';

export function PointerArrow({ cutout, fromSide }) {
  if (!cutout) return null;

  // Position the arrow just outside the cutout edge,
  // pointing INWARD toward it. fromSide = where the apprentice
  // is standing (so the arrow points from apprentice → target)
  const positions = {
    left:   { left: cutout.x - 36, top: cutout.y + cutout.height/2 - 12, rotate: 0, axis: 'horizontal' },    // arrow points right →
    right:  { left: cutout.x + cutout.width + 4, top: cutout.y + cutout.height/2 - 12, rotate: 180, axis: 'horizontal' }, // points left ←
    top:    { left: cutout.x + cutout.width/2 - 12, top: cutout.y - 36, rotate: 90, axis: 'vertical' },    // points down ↓
    bottom: { left: cutout.x + cutout.width/2 - 12, top: cutout.y + cutout.height + 4, rotate: -90, axis: 'vertical' } // points up ↑
  };

  const pos = positions[fromSide] || positions.bottom;

  return (
    <div
      className="pointer-arrow"
      data-axis={pos.axis}
      style={{
        left: pos.left,
        top: pos.top,
        '--pa-rotate': `${pos.rotate}deg`
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28">
        <path
          d="M4 14 L20 14 M14 8 L20 14 L14 20"
          stroke="var(--terra)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
