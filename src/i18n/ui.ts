// THIS FILE IS FOR LANGUAGE DEFAULTS AND TOP-LEVEL NAVIGATION

// IMPORTS
import type { Multi, Links } from "@types"


// ALL LANGUAGES
export const languages: Multi = {
  en: 'English',
  es: 'Español',
  fi: 'Suomi',
};


// DEFAULT LANGUAGE
export const defaultLang = 'en';


// TOP-LEVEL NAVIGATION
//
// Each entry requires:
//  - TEXT (to render in menus)
//  - HREF (where link points to)
//  - LANGUAGES (array) (languages where item will show)
//    - E.g.
//      - `LANGUAGES: ["es"]` => item shows only on "es" version of site.
//      - `LANGUAGES: ["es", "en"]` => item shows on "es" and "en" versions of site.

export const navLinks: Links = [
  {
    TEXT: "Home",
    HREF: "/",
    LANGUAGES: ["en"]
  },
  {
    TEXT: "Inicio",
    HREF: "/",
    LANGUAGES: ["es"]
  },
  {
    TEXT: "Etusivu",
    HREF: "/",
    LANGUAGES: ["fi"]
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
    LANGUAGES: ["en", "es", "fi"]
  },
  {
    TEXT: "About",
    HREF: "/about",
    LANGUAGES: ["en"]
  },
  {
    TEXT: "Acerca",
    HREF: "/acerca",
    LANGUAGES: ["es"]
  },
  {
    TEXT: "Minusta",
    HREF: "/minusta",
    LANGUAGES: ["fi"]
  },
]