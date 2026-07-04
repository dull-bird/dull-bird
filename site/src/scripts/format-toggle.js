// Progressive enhancement for the agent-view format switch (llms.txt /
// JSON-LD). Without JS both documents are simply stacked on the page.
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-format-toggle]');
  const panels = document.querySelectorAll('[data-format-panel]');
  const captions = document.querySelectorAll('[data-format-caption]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const fmt = btn.getAttribute('data-format-toggle');
      buttons.forEach((b) => {
        if (b === btn) b.setAttribute('data-active', 'true');
        else b.removeAttribute('data-active');
      });
      panels.forEach((p) => p.toggleAttribute('hidden', p.getAttribute('data-format-panel') !== fmt));
      captions.forEach((c) => c.toggleAttribute('hidden', c.getAttribute('data-format-caption') !== fmt));
    });
  });
});
