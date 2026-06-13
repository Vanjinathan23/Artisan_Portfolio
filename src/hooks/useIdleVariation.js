import { useEffect, useRef } from 'react';

export function useIdleVariation(currentState, setPoseName) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (currentState !== 'idle') {
      clearTimeout(intervalRef.current);
      return;
    }

    const idlePoses = ['idle-default', 'idle-glance-gallery', 'idle-examine-hands'];
    let poseIndex = 0;

    function cycle() {
      poseIndex = (poseIndex + 1) % idlePoses.length;
      setPoseName(idlePoses[poseIndex]);

      // Return to idle-default after a brief moment for the
      // 'glance' and 'examine' poses
      if (idlePoses[poseIndex] !== 'idle-default') {
        setTimeout(() => {
          setPoseName('idle-default');
        }, 2200);
      }

      // Schedule next cycle — random 15-22s
      const nextDelay = 15000 + Math.random() * 7000;
      intervalRef.current = setTimeout(cycle, nextDelay);
    }

    // First cycle starts after initial 15-22s
    const firstDelay = 15000 + Math.random() * 7000;
    intervalRef.current = setTimeout(cycle, firstDelay);

    return () => clearTimeout(intervalRef.current);
  }, [currentState, setPoseName]);
}
