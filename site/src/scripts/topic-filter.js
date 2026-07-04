// Progressive enhancement for the writing-index topic filter. Without
// JS every post is simply listed (nothing is hidden); with JS, clicking
// a topic pill shows only matching posts.
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-topic-filter]');
  const articles = document.querySelectorAll('[data-topic]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-topic-filter');
      buttons.forEach((b) => {
        if (b === btn) b.setAttribute('data-variant', 'accent');
        else b.removeAttribute('data-variant');
      });
      articles.forEach((a) => {
        const match = topic === 'all' || a.getAttribute('data-topic') === topic;
        a.toggleAttribute('hidden', !match);
      });
    });
  });
});
