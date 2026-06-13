// usePageSection.js
// Hook to scroll to a page section by ID.
// Returns a function that, when invoked, smooth‑scrolls the element into view.
// Usage: const scroll = usePageSection('gallery'); scroll();
export const usePageSection = (sectionId) => {
  const scrollToSection = () => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return scrollToSection;
};
