/**
 * Page interactions ported from the Framer site:
 * overlays, dragging, the tea press, and scroll reveals.
 */

/* ---------------- Overlays ---------------- */
let lastTrigger: HTMLElement | null = null;

function fitStage(ov: HTMLElement) {
  ov.querySelectorAll<HTMLElement>('[data-fit]').forEach((stage) => {
    const [w, h] = stage.dataset.fit!.split(',').map(Number);
    const s = Math.min(1, (window.innerWidth - 32) / w, (window.innerHeight - 32) / h);
    stage.style.setProperty('--fit', String(s));
  });
}

function openOverlay(id: string, trigger?: HTMLElement | null) {
  const ov = document.getElementById(id);
  if (!ov) return;
  lastTrigger = trigger ?? null;
  ov.hidden = false;
  fitStage(ov);
  ov.querySelectorAll<HTMLIFrameElement>('iframe[data-src]').forEach((f) => { if (!f.src) f.src = f.dataset.src!; });
  ov.querySelectorAll<HTMLVideoElement>('video[data-autoplay]').forEach((v) => { v.play().catch(() => {}); });
  ov.focus({ preventScroll: true });
}

function closeOverlay(ov: HTMLElement) {
  ov.hidden = true;
  // Stop anything playing inside
  ov.querySelectorAll<HTMLIFrameElement>('iframe[data-src]').forEach((f) => f.removeAttribute('src'));
  ov.querySelectorAll<HTMLVideoElement>('video').forEach((v) => v.pause());
  ov.querySelectorAll<HTMLElement>('.yt.playing').forEach((yt) => {
    yt.classList.remove('playing');
    yt.querySelector('iframe')?.remove();
  });
  lastTrigger?.focus({ preventScroll: true });
  lastTrigger = null;
}

document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const close = t.closest<HTMLElement>('[data-overlay-close]');
  if (close) {
    closeOverlay(close.closest<HTMLElement>('.overlay')!);
    return;
  }
  const opener = t.closest<HTMLElement>('[data-overlay-open]');
  if (opener && !opener.dataset.drag) {
    e.preventDefault();
    openOverlay(opener.dataset.overlayOpen!, opener);
    return;
  }
  const yt = t.closest<HTMLElement>('[data-youtube]');
  if (yt && !yt.classList.contains('playing')) {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube.com/embed/${yt.dataset.youtube}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    f.title = 'YouTube video';
    f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    yt.append(f);
    yt.classList.add('playing');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll<HTMLElement>('.overlay:not([hidden])').forEach(closeOverlay);
});

window.addEventListener('resize', () => {
  document.querySelectorAll<HTMLElement>('.overlay:not([hidden])').forEach(fitStage);
});

/* ---------------- Dragging ----------------
 * data-drag="snap": springs back on release (the cat)
 * data-drag="free": stays where dropped (the photo strips); a plain click
 *                   still opens its overlay.
 */
document.querySelectorAll<HTMLElement>('[data-drag]').forEach((el) => {
  let startX = 0, startY = 0, baseX = 0, baseY = 0, dx = 0, dy = 0;
  let pointerId: number | null = null;
  let moved = false;

  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    pointerId = e.pointerId;
    startX = e.clientX; startY = e.clientY;
    moved = false;
    el.style.transition = 'none';
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointerId) return;
    const mx = e.clientX - startX, my = e.clientY - startY;
    if (!moved && Math.hypot(mx, my) < 4) return;
    moved = true;
    el.classList.add('dragging');
    dx = baseX + mx; dy = baseY + my;
    el.style.translate = `${dx}px ${dy}px`;
  });

  const end = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    el.classList.remove('dragging');
    el.style.transition = '';
    if (!moved) {
      if (e.type === 'pointerup' && el.dataset.overlayOpen) openOverlay(el.dataset.overlayOpen, el);
      return;
    }
    if (el.dataset.drag === 'snap') {
      // inertia-style bounce back to where it started
      el.style.transition = 'translate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.translate = '0px 0px';
      baseX = baseY = 0;
    } else {
      baseX = dx; baseY = dy;
    }
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  // keyboard users can still open it
  el.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && el.dataset.overlayOpen) {
      e.preventDefault();
      openOverlay(el.dataset.overlayOpen, el);
    }
  });
  el.addEventListener('dragstart', (e) => e.preventDefault());
});

/* ---------------- Tea: press to pour ---------------- */
document.querySelectorAll<HTMLElement>('[data-tea]').forEach((tea) => {
  const on = () => tea.classList.add('pouring');
  const off = () => tea.classList.remove('pouring');
  tea.addEventListener('pointerdown', on);
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((t) => tea.addEventListener(t, off));
  tea.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') on(); });
  tea.addEventListener('keyup', off);
});

/* ---------------- Reveal on load / scroll ---------------- */
const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
requestAnimationFrame(() => {
  document.querySelectorAll<HTMLElement>('[data-reveal="load"]').forEach((el) => el.classList.add('in'));
});
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0 });
  reveals.forEach((el) => { if (el.dataset.reveal !== 'load') io.observe(el); });
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

/* ---------------- Inline videos: play while on screen ---------------- */
if ('IntersectionObserver' in window) {
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = en.target as HTMLVideoElement;
      if (v.closest('.overlay')) return;
      if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
    });
  }, { threshold: 0.2 });
  document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]').forEach((v) => { if (!v.closest('.overlay')) vio.observe(v); });
}
