import { NavLink } from './types';

// FIX: Export missing color constants to resolve import errors.
export const PRIMARY_COLOR = '#5aace6';
export const ACCENT_COLOR = '#f7b731';
export const ACCENT_YELLOW = '#f7b731';

export const NAV_LINKS: NavLink[] = [
  { href: "#services", label: "Services" },
  { href: "#merchandise", label: "Merchandise" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];
