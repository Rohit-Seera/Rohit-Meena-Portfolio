(() => {
  let startY = null;
  const isOverlay = (target) => target?.closest?.('.cinematic-overlay');

  document.addEventListener('touchstart', (e) => {
    if (!isOverlay(e.target) || e.target.closest('button,a,input,select,textarea')) return;
    const touch = e.touches?.[0];
    if (touch) startY = touch.clientY;
  }, { passive: true, capture: true });

  document.addEventListener('touchmove', (e) => {
    if (startY === null || !isOverlay(e.target) || e.target.closest('button,a,input,select,textarea')) return;
    const touch = e.touches?.[0];
    if (!touch) return;
    const delta = startY - touch.clientY;
    if (Math.abs(delta) < 1) return;
    e.preventDefault();
    window.dispatchEvent(new WheelEvent('wheel', {
      deltaY: delta,
      deltaX: 0,
      deltaMode: 0,
      bubbles: false,
      cancelable: true
    }));
    startY = touch.clientY;
  }, { passive: false, capture: true });

  const reset = () => { startY = null; };
  document.addEventListener('touchend', reset, { passive: true, capture: true });
  document.addEventListener('touchcancel', reset, { passive: true, capture: true });
})();
