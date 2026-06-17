import React from 'react';

export function ApprenticeHelpButton({ label, guideKey, onHelpRequest }) {
  return (
    <button
      className="apprentice-help-btn"
      onClick={() => onHelpRequest(guideKey)}
    >
      <span className="ahb-icon">✦</span>
      <span className="ahb-label">{label}</span>
    </button>
  );
}
