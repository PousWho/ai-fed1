'use client';

import { useEffect, useRef } from 'react';

/**
 * NetworkField — генеративная графическая система первого экрана.
 *
 * Метафора: разрозненные участники → связи → единая профессиональная среда.
 * НЕ нейросеть, НЕ звёздное небо, без неона/импульсов/glitch.
 *
 * Реализация — Canvas 2D (лёгкая, быстрый fallback, простая mobile-версия).
 * Все координаты хранятся нормализованными (0..1), поэтому композиция
 * корректно масштабируется при resize и на 2K/4K.
 *
 * Props:
 *  - accent:   HEX фирменного акцента (единственный акцентный цвет).
 *  - density:  'full' | 'light' — базовое количество узлов.
 *  - interactive: реагировать ли на курсор (desktop).
 *  - textSafe: {x,y,rx,ry} нормализованная зона вокруг H1, где графика гасится.
 */
export default function NetworkField({
  accent = '#0039a6',
  density = 'full',
  interactive = true,
  textSafe = { x: 0.28, y: 0.5, rx: 0.34, ry: 0.34 },
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return; // fallback: секция просто без графики

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(max-width: 768px)').matches;

    const lowPower =
      typeof navigator !== 'undefined' &&
      navigator.hardwareConcurrency &&
      navigator.hardwareConcurrency <= 4;

    // ---- Детерминированная генерация (стабильная композиция) ----
    const mulberry32 = (a) => () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const rand = mulberry32(20260901);
    const rrange = (min, max) => min + rand() * (max - min);

    // Базовое количество узлов; на mobile — минус ~50%, на слабых — ещё меньше.
    let nodeCount = density === 'light' ? 56 : 96;
    if (isMobile) nodeCount = Math.round(nodeCount * 0.45);
    else if (lowPower) nodeCount = Math.round(nodeCount * 0.7);

    // Пять смысловых центров (Бизнес/Технологии/Наука/Образование/Государство).
    // Слова НЕ пишем — это внутренний принцип композиции.
    // Смещены вправо/в центр, чтобы не спорить с текстом слева.
    const centers = [
      { x: 0.60, y: 0.30 },
      { x: 0.82, y: 0.44 },
      { x: 0.72, y: 0.68 },
      { x: 0.50, y: 0.62 },
      { x: 0.88, y: 0.22 },
    ];

    // ---- Узлы ----
    // layer: 0 задний (слабый), 1 средний (основная сеть), 2 передний (заметнее).
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const useCenter = rand() < 0.72;
      let nx, ny;
      if (useCenter) {
        const c = centers[Math.floor(rand() * centers.length)];
        // группа вокруг центра
        const a = rand() * Math.PI * 2;
        const r = Math.pow(rand(), 0.7) * rrange(0.04, 0.16);
        nx = c.x + Math.cos(a) * r;
        ny = c.y + Math.sin(a) * r * 0.9;
      } else {
        // редкие фоновые точки по всему полю (смещены вправо)
        nx = rrange(0.18, 1.02);
        ny = rrange(0.05, 0.98);
      }
      nx = Math.min(1.04, Math.max(-0.02, nx));
      ny = Math.min(1.02, Math.max(-0.02, ny));

      const layerRoll = rand();
      const layer = layerRoll < 0.28 ? 0 : layerRoll < 0.8 ? 1 : 2;
      const accented = rand() < 0.16; // «несколько ключевых элементов» с акцентом

      nodes.push({
        bx: nx,
        by: ny,
        layer,
        accented,
        r: layer === 2 ? rrange(2.3, 3.5) : layer === 1 ? rrange(1.7, 2.5) : rrange(1.1, 1.6),
        // медленный дрейф: период 20–40с
        ph: rand() * Math.PI * 2,
        ph2: rand() * Math.PI * 2,
        sp: (Math.PI * 2) / rrange(20000, 40000),
        amp: (layer === 0 ? 0.006 : layer === 1 ? 0.010 : 0.014) * rrange(0.7, 1.3),
        appear: 300 + rand() * 1200, // intro: точки проявляются 0.3–1.5с
        // рабочие поля кадра
        x: 0,
        y: 0,
      });
    }

    // ---- Связи (строятся последовательно) ----
    const links = [];
    const maxDistCluster = 0.17;
    const maxDistLong = 0.42;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].bx - nodes[j].bx;
        const dy = nodes[i].by - nodes[j].by;
        const d = Math.hypot(dx, dy);
        let keep = false;
        let strength = 0;
        if (d < maxDistCluster) {
          keep = rand() < 0.62;
          strength = 1 - d / maxDistCluster;
        } else if (d < maxDistLong && rand() < 0.07) {
          // редкие длинные связи между кластерами
          keep = true;
          strength = 0.35;
        }
        if (keep) {
          const appear =
            Math.max(nodes[i].appear, nodes[j].appear) + 300 + rand() * 800; // 0.7–2.6с
          links.push({ a: i, b: j, s: strength, appear, accent: nodes[i].accented || nodes[j].accented });
        }
      }
    }

    // ---- Размеры/DPR ----
    let W = 0;
    let H = 0;
    let dpr = 1;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      // Во время client-side перехода между страницами layout может быть
      // ещё не стабилен (rect почти нулевой) — пропускаем такой замер,
      // иначе canvas навсегда останется 1px до реального window resize.
      if (rect.width < 10 || rect.height < 10) return;
      W = rect.width;
      H = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    // Догоняющий замер после первой отрисовки — ловит случаи, когда
    // первый resize() пришёлся на нестабильный layout.
    requestAnimationFrame(resize);

    // ---- Курсор ----
    const pointer = { x: 0.5, y: 0.5, active: false };
    const smooth = { x: 0.5, y: 0.5 };
    const canInteract = interactive && !isMobile && !prefersReduced;
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    if (canInteract) {
      window.addEventListener('mousemove', onMove, { passive: true });
      wrap.addEventListener('mouseleave', onLeave);
    }

    // Зона вокруг H1 — гасим плотность/контраст графики.
    const safeFactor = (x, y) => {
      const dx = (x - textSafe.x) / textSafe.rx;
      const dy = (y - textSafe.y) / textSafe.ry;
      const d = Math.hypot(dx, dy);
      if (d >= 1) return 1;
      // внутри окна: от 0.12 в центре до 1 на краю
      return 0.12 + 0.88 * Math.pow(d, 1.6);
    };

    const accentRGB = hexToRgb(accent);

    // Параллакс по слоям (очень лёгкий).
    const parallax = [0.010, 0.020, 0.032];

    let raf = 0;
    let startTs = 0;
    let lastDraw = 0;
    const fpsInterval = lowPower || isMobile ? 1000 / 40 : 1000 / 60;

    const computeXY = (n, t, parX, parY) => {
      let x = n.bx;
      let y = n.by;
      if (!prefersReduced) {
        x += Math.sin(t * n.sp + n.ph) * n.amp;
        y += Math.cos(t * n.sp + n.ph2) * n.amp;
      }
      // параллакс
      x += parX * parallax[n.layer];
      y += parY * parallax[n.layer];
      // мягкая реакция на курсор: лёгкое притяжение (не «убегание»)
      if (pointer.active && !prefersReduced) {
        const ddx = pointer.x - x;
        const ddy = pointer.y - y;
        const d = Math.hypot(ddx, ddy);
        const R = 0.2;
        if (d < R) {
          const k = (1 - d / R) * 0.03; // маленькая сила, большой радиус
          x += ddx * k;
          y += ddy * k;
        }
      }
      n.x = x * W;
      n.y = y * H;
    };

    const draw = (ts) => {
      if (!startTs) startTs = ts;
      const t = ts - startTs;

      if (!prefersReduced && ts - lastDraw < fpsInterval) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastDraw = ts;

      // сглаживание курсора
      smooth.x += (pointer.x - smooth.x) * 0.06;
      smooth.y += (pointer.y - smooth.y) * 0.06;
      const parX = pointer.active ? smooth.x - 0.5 : 0;
      const parY = pointer.active ? smooth.y - 0.5 : 0;

      ctx.clearRect(0, 0, W, H);

      // позиции узлов
      for (let i = 0; i < nodes.length; i++) computeXY(nodes[i], t, parX, parY);

      // ---- связи ----
      ctx.lineWidth = 1.1;
      for (let k = 0; k < links.length; k++) {
        const l = links[k];
        const rev = reveal(t, l.appear, 900, prefersReduced);
        if (rev <= 0) continue;
        const a = nodes[l.a];
        const b = nodes[l.b];
        const mx = (a.bx + b.bx) / 2;
        const my = (a.by + b.by) / 2;
        let alpha = 0.16 + l.s * 0.26;
        alpha *= rev * safeFactor(mx, my);

        // усиление связей рядом с курсором
        if (pointer.active && !prefersReduced) {
          const d = Math.hypot(mx - smooth.x, my - smooth.y);
          if (d < 0.18) alpha *= 1 + (1 - d / 0.18) * 0.9;
        }
        if (alpha < 0.004) continue;

        if (l.accent) {
          ctx.strokeStyle = `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b},${Math.min(0.72, alpha * 1.5)})`;
        } else {
          ctx.strokeStyle = `rgba(33,37,41,${Math.min(0.65, alpha)})`;
        }
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // ---- временные связи рядом с курсором ----
      if (pointer.active && !prefersReduced) {
        const near = [];
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const d = Math.hypot(n.bx - smooth.x, n.by - smooth.y);
          if (d < 0.16) near.push(n);
        }
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const dd = Math.hypot(near[i].bx - near[j].bx, near[i].by - near[j].by);
            if (dd < 0.14) {
              const alpha = (1 - dd / 0.14) * 0.12;
              ctx.strokeStyle = `rgba(33,37,41,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(near[i].x, near[i].y);
              ctx.lineTo(near[j].x, near[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // ---- узлы ----
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const rev = reveal(t, n.appear, 700, prefersReduced);
        if (rev <= 0) continue;
        let alpha = (n.layer === 2 ? 0.9 : n.layer === 1 ? 0.68 : 0.4) * rev * safeFactor(n.bx, n.by);
        if (alpha < 0.004) continue;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        if (n.accented) {
          ctx.fillStyle = `rgba(${accentRGB.r},${accentRGB.g},${accentRGB.b},${Math.min(0.95, alpha * 1.5)})`;
        } else {
          ctx.fillStyle = `rgba(33,37,41,${alpha})`;
        }
        ctx.fill();
      }

      // reduced-motion: рисуем один статичный кадр и останавливаемся
      if (prefersReduced) return;
      raf = requestAnimationFrame(draw);
    };

    // Пауза при уходе вкладки/секции из видимости.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!prefersReduced) {
        lastDraw = 0;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    // подстраховка: не все браузеры дают RO на смену вьюпорта/ориентации
    window.addEventListener('resize', resize, { passive: true });

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (canInteract) {
        window.removeEventListener('mousemove', onMove);
        wrap.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [accent, density, interactive, textSafe.x, textSafe.y, textSafe.rx, textSafe.ry]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', ...style }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}

// Плавное появление 0→1 за duration мс начиная с at.
function reveal(t, at, duration, reduced) {
  if (reduced) return t >= at ? 1 : 1; // в reduced-motion сразу видно
  if (t <= at) return 0;
  const p = Math.min(1, (t - at) / duration);
  // easeOutCubic
  return 1 - Math.pow(1 - p, 3);
}

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : { r: 0, g: 57, b: 166 };
}
