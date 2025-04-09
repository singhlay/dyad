import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Logo } from '../assets/images/index.ts';

interface AboutUsItem {
  title: string;
  detail: string;
  description: string;
  image: string; // Assuming img1, img2 etc. are string paths
  link?: string; // Optional because not all items have it
}

interface NavbarProps {
  whatWeDoItems: Record<string, string[]>;
  aboutUsItems: AboutUsItem[];
  onServiceClick?: (service: string) => void;
  onAboutClick?: (about: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ whatWeDoItems, onServiceClick  , onAboutClick}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category:any) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleServiceClick = (service: string) => {
    if (onServiceClick) {
      onServiceClick(service);
    }
    scrollToSection('services');
    setIsMenuOpen(false);
  };

  const handleAboutClick = (about : string) =>{
    if (onAboutClick) {
      onAboutClick(about);
    }
    scrollToSection('about');
    setIsMenuOpen(false);
  }

  const handleDesktopDropdownHover = (dropdownName: string) => {
    setActiveDesktopDropdown(dropdownName);
  };

  const handleDesktopDropdownLeave = () => {
    setActiveDesktopDropdown(null);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-end">
          <div className="flex items-end">
            <Link to="/">
              <img src={Logo} alt="DYAD" className="h-[44px] lg:h-[70px] xl:h-[95px]" />
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-gray-600 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="hidden lg:flex items-center gap-[10px]">
            <div
              className="relative group"
              onMouseEnter={() => handleDesktopDropdownHover('about')}
              onMouseLeave={handleDesktopDropdownLeave}
            >
              <div className={`nav-link flex items-center gap-1 py-2 px-3 border-b-[3px]  ${activeDesktopDropdown === 'about' ? 'text-primary  border-secondary' : 'border-white'}`}>
                About Us  <ChevronDown className={`w-5 h-5 duration-300 transform ${activeDesktopDropdown === 'about' ? 'translate-y-1' : 'translate-y-0'}`} />
              </div>
              <div className="dropdown-menu">
                <button onClick={() => handleAboutClick('Our Story & Inspiration')} className="dropdown-item">Our Story & Inspiration</button>
                <button onClick={() => handleAboutClick('Clarity & Accountability')} className="dropdown-item">Clarity & Accountability</button>
                <button onClick={() => handleAboutClick('Innovative Technology')} className="dropdown-item">Innovative Technology</button>
                <button onClick={() => handleAboutClick('Empowering Physician Autonomy')} className="dropdown-item">Empowering Physician Autonomy</button>
                <button onClick={() => handleAboutClick('Why Dyad')} className="dropdown-item">Why Dyad?</button>
                <Link to='/onboarding' className="dropdown-item">Our Process</Link>
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleDesktopDropdownHover('what')}
              onMouseLeave={handleDesktopDropdownLeave}
            >
              <div className={`nav-link flex items-center gap-1 py-2 px-3 border-b-[3px] ${activeDesktopDropdown === 'what' ? 'text-primary  border-secondary' : 'border-white'}`}>
                What We Do <ChevronDown className={`w-5 h-5 duration-300 transform ${activeDesktopDropdown === 'what' ? 'translate-y-1' : 'translate-y-0'}`} />
              </div>
              <div className="dropdown-menu w-[280px]">
                {Object.entries(whatWeDoItems).map(([category, items]) => (
                  <div key={category} className="dropdown-section">
                    <button
                      className="dropdown-header "
                    >
                      <span 
                      title={category.length > 25 ? category : ""} // Show full text as tooltip if truncated
                      >  {category.length > 25 ? `${category.substring(0, 25)}...` : category}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="subdropdown-menu">
                      {items.map((item) => (
                        <button
                          key={item}
                          className="dropdown-item"
                          onClick={() => 
                            handleServiceClick(category)}
                          title={item.length > 25 ? item : ""} // Show full text as tooltip if truncated
                        >
                          {item.length > 25 ? `${item.substring(0, 25)}...` : item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleDesktopDropdownHover('who')}
              onMouseLeave={handleDesktopDropdownLeave}
            >
              <div className={`nav-link flex items-center gap-1 py-2 px-3 border-b-[3px]  ${activeDesktopDropdown === 'who' ? 'text-primary border-secondary' : 'border-white'}`}>
                Who We Serve <ChevronDown className={`w-5 h-5 duration-300 transform ${activeDesktopDropdown === 'who' ? 'translate-y-1' : 'translate-y-0'}`} />
              </div>
              <ul className="dropdown-menu">
                <li  className="dropdown-item">Surgical & Procedural Specialties</li>
                <li className="dropdown-item">Interventional & Diagnostic Care</li>
                <li  className="dropdown-item">Perioperative & Supportive Services</li>
                <li  className="dropdown-item">Outpatient & Specialty Facilities</li>
              </ul>
            </div>

            <Link to="https://dev.dyadmd.com/#/login" className="btn-outline">Login/Register</Link>
            <Link to="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </div>

        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
          <div className="flex flex-col space-y-4">
            <div className="mobile-dropdown">
              <div className="mobile-dropdown-header" onClick={(e) => {
                const target = e.currentTarget;
                target.classList.toggle('active');
                const content = target.nextElementSibling;
                if (content) {
                  content.classList.toggle('show');
                }
              }}>
                <span className="nav-link">About Us</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="mobile-dropdown-content">
                <button onClick={() => handleAboutClick('Our Story & Inspiration')} className="mobile-dropdown-item">Our Story & Inspiration</button>
                <button onClick={() => handleAboutClick('Clarity & Accountability')} className="mobile-dropdown-item">Clarity & Accountability</button>
                <button onClick={() => handleAboutClick('Innovative Technology')} className="mobile-dropdown-item">Innovative Technology</button>
                <button onClick={() => handleAboutClick('Empowering Physician Autonomy')} className="mobile-dropdown-item">Empowering Physician Autonomy</button>
                <button onClick={() => handleAboutClick('Why Dyad')} className="mobile-dropdown-item">Why Dyad?</button>
                <Link to='/onboarding' className="mobile-dropdown-item">Our Process</Link>
                
              </div>
            </div>

    <div className="mobile-dropdown">
      <div
        className="mobile-dropdown-header"
        onClick={(e) => {
          e.currentTarget.classList.toggle("active");
          const content = e.currentTarget.nextElementSibling;
          if (content) content.classList.toggle("show");
        }}
      >
        <span className="nav-link">What We Do</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      <div className="mobile-dropdown-content">
        {Object.entries(whatWeDoItems).map(([category, items]) => (
          <div key={category} className="mobile-nested-dropdown">
            <button
              className={`mobile-dropdown-header ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <span>{category}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div
              className={`mobile-dropdown-content ${
                activeCategory === category ? "show" : ""
              }`}
            >
              {items.map((item) => (
                <button
                  key={item}
                  className="mobile-dropdown-item"
                  onClick={() =>
                    
                    handleServiceClick(category)
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

            <div className="mobile-dropdown">
              <div className="mobile-dropdown-header" onClick={(e) => {
                const target = e.currentTarget;
                target.classList.toggle('active');
                const content = target.nextElementSibling;
                if (content) {
                  content.classList.toggle('show');
                }
              }}>
                <span className="nav-link">Who We Serve</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <ul className="mobile-dropdown-content">
                <li  className="mobile-dropdown-item">Surgical & Procedural Specialties</li>
                <li  className="mobile-dropdown-item">Interventional & Diagnostic Care</li>
                <li className="mobile-dropdown-item">Perioperative & Supportive Services</li>
                <li  className="mobile-dropdown-item">Outpatient & Specialty Facilities</li>
              </ul>
            </div>

            <div className="flex flex-col space-y-3 pt-4">
              <Link to="https://dev.dyadmd.com/#/login" className="btn-outline w-full">Login/Register</Link>
              <Link to="/contact" className="btn-primary w-full text-center">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;