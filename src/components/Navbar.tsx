import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Logo } from '../assets/images/index.js'

interface NavbarProps {
  whatWeDoItems: Record<string, string[]>;
}

const Navbar: React.FC<NavbarProps> = ({ whatWeDoItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="DYAD" className="h-[44px] xl:h-[90px]" />
            </Link>
          </div>

          {/* Hamburger Menu Button */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <div className="nav-link flex items-end gap-1">
                About Us <ChevronDown className="w-4 h-4" />
              </div>
              <div className="dropdown-menu">
                <a href="#story" className="dropdown-item">Our Story & Inspiration</a>
                <a href="#clarity" className="dropdown-item">Clarity & Accountability</a>
                <a href="#tech" className="dropdown-item">Innovative Technology</a>
                <a href="#autonomy" className="dropdown-item">Empowering Physician Autonomy</a>
                <a href="#why" className="dropdown-item">Why Dyad?</a>
                <a href="#process" className="dropdown-item">Our Process</a>
              </div>
            </div>

            <div className="relative group">
              <div className="nav-link flex items-end gap-1">
                What We Do <ChevronDown className="w-4 h-4" />
              </div>
              <div className="dropdown-menu w-[280px]">
                {Object.entries(whatWeDoItems).map(([category, items]) => (
                  <div key={category} className="dropdown-section">
                    <div className="dropdown-header">
                      <span>{category}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <div className="subdropdown-menu">
                      {items.map((item) => (
                        <a
                          key={item}
                          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="dropdown-item"
                          title={item} // Shows full text on hover
                        >
                          {item?.length > 20 ? item.slice(0, 15) + "..." : item}
                        </a>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="nav-link flex items-end gap-1">
                Who We Serve <ChevronDown className="w-4 h-4" />
              </div>
              <div className="dropdown-menu">
                <a href="#surgical" className="dropdown-item">Surgical & Procedural Specialties</a>
                <a href="#interventional" className="dropdown-item">Interventional & Diagnostic Care</a>
                <a href="#perioperative" className="dropdown-item">Perioperative & Supportive Services</a>
                <a href="#outpatient" className="dropdown-item">Outpatient & Specialty Facilities</a>
              </div>
            </div>

            <button className="btn-outline">Login/Register</button>
            <Link to="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
          <div className="flex flex-col space-y-4">
            {/* About Us Section */}
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
                <a href="#story" className="mobile-dropdown-item">Our Story & Inspiration</a>
                <a href="#clarity" className="mobile-dropdown-item">Clarity & Accountability</a>
                <a href="#tech" className="mobile-dropdown-item">Innovative Technology</a>
                <a href="#autonomy" className="mobile-dropdown-item">Empowering Physician Autonomy</a>
                <a href="#why" className="mobile-dropdown-item">Why Dyad?</a>
                <a href="#process" className="mobile-dropdown-item">Our Process</a>
              </div>
            </div>

            {/* What We Do Section */}
            <div className="mobile-dropdown">
              <div className="mobile-dropdown-header" onClick={(e) => {
                const target = e.currentTarget;
                target.classList.toggle('active');
                const content = target.nextElementSibling;
                if (content) {
                  content.classList.toggle('show');
                }
              }}>
                <span className="nav-link">What We Do</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="mobile-dropdown-content">
                {Object.entries(whatWeDoItems).map(([category, items]) => (
                  <div key={category} className="mobile-nested-dropdown">
                    <div className="mobile-dropdown-header" onClick={(e) => {
                      e.stopPropagation();
                      const target = e.currentTarget;
                      target.classList.toggle('active');
                      const content = target.nextElementSibling;
                      if (content) {
                        content.classList.toggle('show');
                      }
                    }}>
                      <span>{category}</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                    <div className="mobile-dropdown-content">
                      {items.map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="mobile-dropdown-item">
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who We Serve Section */}
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
              <div className="mobile-dropdown-content">
                <a href="#surgical" className="mobile-dropdown-item">Surgical & Procedural Specialties</a>
                <a href="#interventional" className="mobile-dropdown-item">Interventional & Diagnostic Care</a>
                <a href="#perioperative" className="mobile-dropdown-item">Perioperative & Supportive Services</a>
                <a href="#outpatient" className="mobile-dropdown-item">Outpatient & Specialty Facilities</a>
              </div>
            </div>

            <div className="flex flex-col space-y-3 pt-4">
              <button className="btn-outline w-full">Login/Register</button>
              <Link to="/contact" className="btn-primary w-full text-center">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;