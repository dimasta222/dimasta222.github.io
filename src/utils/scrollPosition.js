let restoreBehavior = null;
let firstFrame = 0;
let secondFrame = 0;

function withoutSmoothScroll(callback) {
  const root = document.documentElement;
  if (restoreBehavior === null) restoreBehavior = root.style.scrollBehavior;
  cancelAnimationFrame(firstFrame);
  cancelAnimationFrame(secondFrame);
  root.style.scrollBehavior = "auto";
  callback();

  firstFrame = requestAnimationFrame(() => {
    callback();
    secondFrame = requestAnimationFrame(() => {
      callback();
      root.style.scrollBehavior = restoreBehavior;
      restoreBehavior = null;
    });
  });
}

export function scrollToPageTop() {
  withoutSmoothScroll(() => window.scrollTo(0, 0));
}

export function scrollToPageElement(element) {
  if (!element) return;
  withoutSmoothScroll(() => element.scrollIntoView({ block: "start" }));
}