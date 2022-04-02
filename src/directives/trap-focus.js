export default {
  bind: (el, binding) => {
    const focusableElements =
      binding.arg || "button, [href], input, select, textarea";
    const focusableContent = el.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0]; // get first element to be focused el
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside el

    if (!document || !focusableContent.length) return;

    el.trapFocusEvent = (event) => {
      const isEscPressed = event.key === "Escape" || event.keyCode === 27;
      const isTabPressed = event.key === "Tab" || event.keyCode === 9;

      // if Escape key is pressed
      if (isEscPressed && typeof binding.value === "function") {
        binding.value();
      }

      if (!isTabPressed) {
        return;
      }

      // if Shift Key pressed for Shift + Tab combination
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          event.preventDefault();
        }

        return;
      }

      // if Tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing Tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", el.trapFocusEvent);
  },

  unbind: (el) => {
    if (!document) return;

    document.removeEventListener("keydown", el.trapFocusEvent);
  },
};
