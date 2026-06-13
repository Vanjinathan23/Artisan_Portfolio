import React from 'react';

interface SpotlightOverlayProps {
  cutout: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  tourActive: boolean;
}

export const SpotlightOverlay = ({ cutout, tourActive }: SpotlightOverlayProps) => {
  return (
    <div className={`spotlight-overlay ${tourActive ? 'active' : ''}`}>
      {/* Dimming layer with cutout */}
      <svg className="spotlight-svg" width="100%" height="100%">
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {cutout && (
              <rect
                x={cutout.x}
                y={cutout.y}
                width={cutout.width}
                height={cutout.height}
                rx="8"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%" height="100%"
          fill="rgba(15,8,5,0.72)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Glowing border around cutout */}
      {cutout && (
        <div 
          className="spotlight-ring"
          style={{
            left: cutout.x - 4,
            top: cutout.y - 4,
            width: cutout.width + 8,
            height: cutout.height + 8
          }}
        />
      )}
    </div>
  );
};

export default SpotlightOverlay;
