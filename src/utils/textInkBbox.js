// Measures real ink-bbox of rendered text by drawing on an off-screen canvas
// and scanning alpha pixels. This gives the actual visible bounds (including
// script font flourishes, italic slants, ascenders/descenders) which match
// what Photoshop sees after a Trim operation.
//
// Result is in pixels at the rendering scale (pxPerCm).
// All offsets are measured from the canvas top-left corner.

const cache = new Map();
const MAX_CACHE = 200;

// Шрифты, для которых уже запущена загрузка в document.fonts. Не повторяем.
const fontLoadPromises = new Map();
// Шрифты, для которых fonts.load() уже отработал успешно — значит canvas
// гарантированно может ими отрисовать. document.fonts.check() недостаточно:
// он отдаёт true даже когда canvas всё равно использует fallback (известная
// особенность поведения FontFaceSet).
const fontReadyForCanvas = new Set();

function ensureFontLoaded(fontStr) {
  if (typeof document === "undefined" || !document.fonts) return;
  if (fontReadyForCanvas.has(fontStr)) return;
  if (fontLoadPromises.has(fontStr)) return;
  const promise = document.fonts
    .load(fontStr)
    .then(() => {
      fontReadyForCanvas.add(fontStr);
      // Старые замеры (на fallback-шрифте) невалидны.
      cache.clear();
      // Дёрнем re-render у подписчиков (preview, hooks).
      try {
        window.dispatchEvent(new CustomEvent("textInkBboxFontLoaded", { detail: { fontStr } }));
      } catch {
        // ignore
      }
    })
    .catch(() => {
      // ignore — оставим fallback bbox
    })
    .finally(() => {
      fontLoadPromises.delete(fontStr);
    });
  fontLoadPromises.set(fontStr, promise);
}

function makeCacheKey(opts) {
  return [
    opts.text,
    opts.fontFamily,
    opts.fontSize,
    opts.fontWeight,
    opts.fontStyle,
    opts.lineHeight,
    opts.letterSpacing,
    opts.boxWidthPx,
    opts.uppercase ? 1 : 0,
  ].join("|");
}

// Допуск переноса: ctx.measureText включает trailing letter-spacing после
// последней буквы, а DOM его не рисует — добавляем одну
// letter-spacing к лимиту, иначе короткие строки ложно переносятся.
const WRAP_TOLERANCE_PX = 1;

function wrapText(text, font, boxWidthPx, letterSpacingPx, ctx) {
  ctx.font = font;
  ctx.letterSpacing = `${letterSpacingPx || 0}px`;
  const limit = boxWidthPx + Math.max(0, letterSpacingPx || 0) + WRAP_TOLERANCE_PX;
  const paragraphs = String(text || "").split("\n");
  const out = [];
  const breakLongToken = (token) => {
    // Character-level wrap to mirror DOM `overflow-wrap: anywhere` behavior.
    let buf = "";
    for (const ch of token) {
      const candidate = buf + ch;
      if (buf && ctx.measureText(candidate).width > limit) {
        out.push(buf);
        buf = ch;
      } else {
        buf = candidate;
      }
    }
    return buf;
  };
  for (const para of paragraphs) {
    if (!para.length) {
      out.push("");
      continue;
    }
    const words = para.split(/(\s+)/).filter(Boolean);
    let line = "";
    for (const word of words) {
      const test = line + word;
      if (ctx.measureText(test).width <= limit) {
        line = test;
      } else if (!line) {
        // Word alone exceeds the box — break by characters.
        line = breakLongToken(word);
      } else {
        out.push(line);
        const trimmed = word.trimStart();
        if (ctx.measureText(trimmed).width <= limit) {
          line = trimmed;
        } else {
          line = breakLongToken(trimmed);
        }
      }
    }
    if (line.length) out.push(line);
  }
  return out.length ? out : [""];
}

/**
 * Measure real ink bbox of text (post-render, alpha-scanned).
 *
 * @returns {{
 *   inkWidthPx: number,
 *   inkHeightPx: number,
 *   inkLeftOffsetPx: number,    // from top-left of render canvas
 *   inkTopOffsetPx: number,
 *   lineHeightPx: number,
 *   linesCount: number,
 *   layoutWidthPx: number,      // textbox width (= boxWidthPx)
 *   layoutHeightPx: number,     // lines * lineHeight
 *   pxPerCm: number,
 * } | null}
 */
export function measureTextInkBboxPx(opts) {
  if (typeof document === "undefined") return null;
  const text = String(opts.text || "");
  if (!text.trim()) return null;

  const key = makeCacheKey(opts);
  if (cache.has(key)) return cache.get(key);

  const safeFontSize = Math.max(1, Number(opts.fontSize) || 1);
  const safeLineHeight = Math.max(0.5, Number(opts.lineHeight) || 1.05);
  const safeBoxWidthPx = Math.max(1, Number(opts.boxWidthPx) || 1);
  const fontStyle = opts.fontStyle || "normal";
  const fontWeight = opts.fontWeight || 400;
  const fontFamily = opts.fontFamily || "sans-serif";
  const letterSpacingPx = Number(opts.letterSpacing) || 0;

  const fontStr = `${fontStyle} ${fontWeight} ${safeFontSize}px ${fontFamily}`;

  // Если кастомный шрифт ещё не загружен в FontFaceSet — браузер нарисует
  // fallback-шрифт, у которого descender может быть короче, и alpha-scan
  // недомерит хвост `g`/`y`. Триггерим загрузку и инвалидацию кэша.
  ensureFontLoaded(fontStr);

  // Render at the same px scale that the source provided.
  const measureCanvas = document.createElement("canvas");
  // Generous padding for italic/script overshoot
  const overshoot = Math.ceil(safeFontSize * 0.6);
  const lines = (() => {
    const tmpCtx = measureCanvas.getContext("2d");
    return wrapText(text, fontStr, safeBoxWidthPx, letterSpacingPx, tmpCtx);
  })();
  const lineHeightPx = safeFontSize * safeLineHeight;
  const layoutHeightPx = Math.max(1, lines.length * lineHeightPx);
  const layoutWidthPx = safeBoxWidthPx;

  const canvasW = Math.ceil(layoutWidthPx + overshoot * 2);
  const canvasH = Math.ceil(layoutHeightPx + overshoot * 2);
  measureCanvas.width = canvasW;
  measureCanvas.height = canvasH;
  const ctx = measureCanvas.getContext("2d");

  ctx.font = fontStr;
  ctx.textBaseline = "top";
  ctx.letterSpacing = `${letterSpacingPx}px`;
  ctx.fillStyle = "#000";

  const align = opts.textAlign || "center";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = ctx.measureText(line);
    const lineWidth = m.width;
    let x = overshoot;
    if (align === "center") x = overshoot + (layoutWidthPx - lineWidth) / 2;
    else if (align === "right") x = overshoot + layoutWidthPx - lineWidth;
    const yTop = overshoot + i * lineHeightPx;
    ctx.fillText(line, x, yTop);
  }

  // Scan alpha
  let imgData;
  try {
    imgData = ctx.getImageData(0, 0, canvasW, canvasH);
  } catch {
    return null;
  }
  const data = imgData.data;
  let minX = canvasW;
  let minY = canvasH;
  let maxX = -1;
  let maxY = -1;
  // Stride scan for speed: every 1 px to be precise (text is small enough).
  // Порог alpha=1 вместо 8: тонкие хвосты глифов (descender у `g`/`y`,
  // петли скриптовых шрифтов) часто рендерятся со слабым антиалиасом и
  // при пороге 8 их пиксели режутся, отчего bbox недомеряет хвост по Y.
  for (let y = 0; y < canvasH; y++) {
    const rowStart = y * canvasW * 4;
    for (let x = 0; x < canvasW; x++) {
      if (data[rowStart + x * 4 + 3] >= 1) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Union: alpha-scan + font-metrics. Font-метрики гарантируют что descender
  // (хвост g, p, у, р) учтён, даже если canvas alpha-scan его недомерил.
  // (отключено — actualBoundingBoxAscent сдвигает центр bbox вверх)

  let result;
  if (maxX < 0 || maxY < 0) {
    result = {
      inkWidthPx: 0,
      inkHeightPx: 0,
      inkLeftOffsetPx: overshoot,
      inkTopOffsetPx: overshoot,
      lineHeightPx,
      linesCount: lines.length,
      layoutWidthPx,
      layoutHeightPx,
      pxPerCm: opts.pxPerCm || null,
    };
  } else {
    result = {
      inkWidthPx: maxX - minX + 1,
      inkHeightPx: maxY - minY + 1,
      inkLeftOffsetPx: minX,
      inkTopOffsetPx: minY,
      lineHeightPx,
      linesCount: lines.length,
      layoutWidthPx,
      layoutHeightPx,
      pxPerCm: opts.pxPerCm || null,
    };
  }

  if (cache.size >= MAX_CACHE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, result);
  return result;
}

export function clearTextInkBboxCache() {
  cache.clear();
}
