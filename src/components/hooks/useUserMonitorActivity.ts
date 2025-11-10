import { useCallback,useEffect, useRef, useState } from 'react';

function useUserMonitorActivity(inactivityDelay = 60000) {
  const [isInactive, setIsInactive] = useState(false);
  const timerIdRef = useRef<number | null>(null);

  const resetTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    if (isInactive) {
      setIsInactive(false);
    }

    timerIdRef.current = setTimeout(() => {
      setIsInactive(true);
    }, inactivityDelay);
  }, [inactivityDelay, isInactive]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    resetTimer();

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, [resetTimer]);

  return isInactive;
}

export default useUserMonitorActivity;