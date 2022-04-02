export default (isScrollDisabled) => {
  if (!document) return;

  const { body } = document;
  let scrollPosition = 0;

  if (isScrollDisabled) {
    scrollPosition = window.pageYOffset;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.width = "100%";

    return;
  }

  body.style.removeProperty("overflow");
  body.style.removeProperty("position");
  body.style.removeProperty("top");
  body.style.removeProperty("width");
  window.scrollTo(0, scrollPosition);
};
