import type { Multi } from "@types"
// Routes to re-direct users to equivalent page when they change language using language picker

// Pattern !!!
//
// routes = { 
//  { lang_1: slug, lang_2: slug, ..., lang_N: slug }  // For top-level pages
//  { lang_1: collection/slug, lang_2: collection/slug, ..., lang_N: collection/slug } // For any page inside a collection
//  ...
// }

// Note.
// You only need to add a route when page has a different slug in some languages.
// If the slug is the same across **all** languages, redirection happens automatically.

export const routes: Multi[] = [
  { en: "about", es: "acerca", fi: "minusta" },
  { en: "blog/one", es: "blog/uno", fi: "blog/yksi" },
  { en: "blog/two", es: "blog/dos", fi: "blog/kaksi" },
  { en: "blog/three", es: "blog/tres", fi: "blog/kolme" },
  { en: "blog/four", es: "blog/cuatro", fi: "blog/nelja" },
  { en: "blog/five", es: "blog/cinco", fi: "blog/viisi" },
]