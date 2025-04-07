// utils/scrollUtils.ts
export const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    const headerOffset = 80; // Adjust based on your header height
    
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };