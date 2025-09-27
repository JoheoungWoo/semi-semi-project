// src/mainpage/MainLayout.js
import React from "react";
import { Link } from "react-router-dom";
import products from "../dummydata/products"; // 경로 맞게 수정

const h = React.createElement;

/* ---------- UI helpers ---------- */
function Card(children, className = "") {
  return h("div", { className: "relative rounded-2xl border border-gray-200 bg-white shadow-md " + className }, children);
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/* ---------- HeroCarousel: 자동재생 + 버튼 + 도트 + 호버정지 + 스와이프 ---------- */
function HeroCarousel({ items }) {
  const len = Array.isArray(items) ? items.length : 0;
  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef(null);
  const hoverRef = React.useRef(false);
  const touchStartX = React.useRef(null);

  const go = React.useCallback(
    (delta) => setIndex((prev) => (len ? (prev + delta + len) % len : 0)),
    [len]
  );
  const next = React.useCallback(() => go(1), [go]);
  const prev = React.useCallback(() => go(-1), [go]);

  // 자동재생 (호버 중엔 멈춤)
  React.useEffect(() => {
    if (!len) return;
    timerRef.current = setInterval(() => {
      if (!hoverRef.current) next();
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [len, next]);

  // 터치 스와이프
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const start = touchStartX.current;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    // 스와이프 임계값 40px
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  if (!len) {
    return Card(
      h("div", { className: "h-80 md:h-[28rem] flex items-center justify-center text-gray-500" }, "No products")
    );
  }

  const cur = items[index];

  return Card(
    h(
      "div",
      {
        className: "relative h-80 md:h-[28rem] overflow-hidden rounded-2xl",
        onMouseEnter: () => (hoverRef.current = true),
        onMouseLeave: () => (hoverRef.current = false),
        onTouchStart,
        onTouchEnd,
      },
      // 이미지
      h("img", { src: cur.imageUrl, alt: cur.name, className: "h-full w-full object-cover" }),
      // 하단 오버레이
      h(
        "div",
        { className: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6" },
        h("h2", { className: "text-2xl font-semibold text-white drop-shadow" }, cur.name),
        h("p", { className: "text-sm text-gray-200" }, `₩ ${cur.price}`)
      ),
      // 전체 클릭 시 상세로
      h(Link, { to: `/product/${cur.id}`, className: "absolute inset-0", "aria-label": cur.name }),

      // 좌우 버튼
      h(
        "div",
        { className: "absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2" },
        h(
          "button",
          {
            type: "button",
            onClick: prev,
            className:
              "h-9 w-9 rounded-full bg-white/90 text-gray-800 shadow ring-1 ring-gray-300 hover:bg-white",
            "aria-label": "Previous",
          },
          "‹"
        ),
        h(
          "button",
          {
            type: "button",
            onClick: next,
            className:
              "h-9 w-9 rounded-full bg-white/90 text-gray-800 shadow ring-1 ring-gray-300 hover:bg-white",
            "aria-label": "Next",
          },
          "›"
        )
      ),

      // 도트 인디케이터
      h(
        "div",
        { className: "absolute bottom-3 left-0 right-0 flex justify-center gap-1.5" },
        items.map((_, i) =>
          h("button", {
            key: i,
            type: "button",
            onClick: () => setIndex(clamp(i, 0, len - 1)),
            className:
              "h-1.5 w-6 rounded-full transition " + (i === index ? "bg-blue-500" : "bg-gray-300/80 hover:bg-gray-400"),
            "aria-label": `Go to slide ${i + 1}`,
          })
        )
      )
    )
  );
}

/* ---------- Side mini slider: Prev/Next로 3개 순환 ---------- */
function SideSlider({ items }) {
  const len = Array.isArray(items) ? items.length : 0;
  const [offset, setOffset] = React.useState(0);
  const inc = () => setOffset((v) => (len ? (v + 1) % len : 0));
  const dec = () => setOffset((v) => (len ? (v - 1 + len) % len : 0));

  const pick = (k) => (len ? items[(offset + k) % len] : null);
  const a = pick(0), b = pick(1), c = pick(2);

  return Card(
    h(
      "div",
      { className: "p-4 h-56 md:h-full" },
      h("h3", { className: "mb-3 text-sm font-semibold text-gray-700" }, "슬라이더"),
      h(
        "div",
        { className: "mb-3 flex justify-end gap-2" },
        h(
          "button",
          { type: "button", onClick: dec, className: "rounded-md border border-gray-300 bg-white px-2 py-1 text-sm" },
          "‹"
        ),
        h(
          "button",
          { type: "button", onClick: inc, className: "rounded-md border border-gray-300 bg-white px-2 py-1 text-sm" },
          "›"
        )
      ),
      h(
        "ul",
        { className: "grid grid-cols-3 gap-3" },
        [a, b, c].filter(Boolean).map((p) =>
          h(
            "li",
            { key: p.id },
            h(
              Link,
              { to: `/product/${p.id}`, className: "group block" },
              h("img", {
                src: p.imageUrl,
                alt: p.name,
                className: "aspect-square w-full rounded-lg object-cover transition group-hover:scale-105",
              }),
              h("p", { className: "mt-1 truncate text-xs text-gray-600" }, p.name)
            )
          )
        )
      )
    )
  );
}

/* ---------- Content grid ---------- */
function ContentGrid({ items }) {
  return Card(
    h(
      "div",
      { className: "p-4 h-72 md:h-full" },
      h("h3", { className: "mb-3 text-sm font-semibold text-gray-700" }, "콘텐츠"),
      h(
        "div",
        { className: "grid grid-cols-2 gap-3" },
        items.slice(0, 4).map((p) =>
          h(
            Link,
            {
              key: p.id,
              to: `/product/${p.id}`,
              className: "block rounded-lg border border-gray-200 bg-white p-3 hover:border-blue-400",
            },
            h("img", { src: p.imageUrl, alt: p.name, className: "h-20 w-full rounded-md object-cover" }),
            h("p", { className: "mt-2 truncate font-medium text-gray-800" }, p.name),
            h("span", { className: "text-sm text-gray-500" }, `₩ ${p.price}`)
          )
        )
      )
    )
  );
}

/* ---------- Main page ---------- */
export default function MainLayout() {
  const items = Array.isArray(products) ? products : [];
  return h(
    "main",
    { className: "relative z-0 isolate bg-white text-black" },
    h(
      "div",
      { className: "mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12" },
      h(
        "div",
        { className: "grid grid-cols-1 gap-6 md:grid-cols-3" },
        // mainSlider (left, 2 cols)
        h("section", { id: "mainSlider", className: "md:col-span-2" }, h(HeroCarousel, { items })),

        // right column: slider + content
        h(
          "div",
          { className: "grid grid-rows-2 gap-6 md:col-span-1" },
          h("section", { id: "slider" }, h(SideSlider, { items })),
          h("section", { id: "content" }, h(ContentGrid, { items }))
        )
      )
    )
  );
}
