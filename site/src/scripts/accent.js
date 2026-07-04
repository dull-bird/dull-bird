/* ============================================================
   dull-bird 呆鸟小筑 — Accent engine
   The signature "random变色": the accent HUE shifts smoothly on
   interaction. Because --accent-h is a registered @property, the
   change animates on its own — we just set a new number.

   Usage:
     <script src="/assets/accent.js"></script>
     dullbirdAccent.init();                 // auto-wires a,button,[data-accent-shift]
     dullbirdAccent.shift();                // advance one stop
     dullbirdAccent.set(150);               // jump to a hue
   ============================================================ */
(function (global) {
  // Curated, harmonious hue stops (deg). Not fully random — a
  // considered spectrum so every state still looks intentional.
  var STOPS = [24, 68, 150, 194, 255, 322]; // coral marigold jade teal cobalt plum
  var idx = 0;
  var root = document.documentElement;

  function ensureTransition() {
    // Declare the transition once so hue changes drift smoothly.
    if (document.getElementById("db-accent-t")) return;
    var s = document.createElement("style");
    s.id = "db-accent-t";
    s.textContent =
      ":root{transition:--accent-h var(--dur-accent,700ms) var(--ease-organic,cubic-bezier(.22,1,.36,1));}";
    document.head.appendChild(s);
  }

  function set(hue) {
    root.style.setProperty("--accent-h", hue);
  }

  function shift() {
    idx = (idx + 1) % STOPS.length;
    set(STOPS[idx]);
    return STOPS[idx];
  }

  function random() {
    // Pick a different stop than the current one.
    var next = idx;
    while (next === idx && STOPS.length > 1) {
      next = Math.floor(Math.random() * STOPS.length);
    }
    idx = next;
    set(STOPS[idx]);
    return STOPS[idx];
  }

  function init(opts) {
    opts = opts || {};
    ensureTransition();
    var selector = opts.selector || "a, button, [data-accent-shift]";
    var mode = opts.mode || "next"; // "next" | "random"
    var doShift = mode === "random" ? random : shift;

    // Only a click commits a fresh hue (touch / keyboard friendly).
    // Hover used to trigger this too, but that made the color shift
    // too easy to fire by accident while just moving the mouse.
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.closest && t.closest(selector)) doShift();
    });

    if (opts.startHue != null) set(opts.startHue);
    return api;
  }

  var api = { init: init, shift: shift, random: random, set: set, STOPS: STOPS };
  global.dullbirdAccent = api;
})(window);
