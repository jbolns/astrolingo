// IMPORTS
import { languages } from './ui'
import { routes } from './routes'
import type { Multi } from "@types"

// FUNCTIONS

// Function to get routes for all language versions of any given page.
//  1. Define current path based on URL information
//  2. Error checks
//    a. Slug is undefined (should not happen): return empty string (force all entries in language picker to point to language's homepage)
//    b. Slug is empty (probably a homepage): return empty string (all entries in picker should point to language's homepage)
//  3. Check if slug is present in routes.ts
//    a. YES (page url varies across languages): Return a dictionary with appropriate paths for all languages (object)
//    b. NO (page url is same across languages). Return the slug (string).

export function getRoutes(url: URL, currentLang: string): Multi | string {
  const pathname = new URL(url).pathname
  const parts = pathname?.split('/')

  const slug = parts.pop() || parts.pop()
  const collection = parts.pop() || parts.pop()
  let path = "" // Gets re-written in normal cases, but line avoids a possibly undefined path

  if ((collection !== undefined && !Object.keys(languages).includes(collection))) {
    path = collection + '/' + slug
  } else if (slug !== undefined) {
    path = slug
  }

  Object.keys(languages).map(
    key => (path = path.replace(key + "/", ""))
  )

  if (slug === undefined) {
    console.log("Path sent to language picker is undefined.")
    return ''
  }

  if (Object.keys(languages).includes(slug)) {
    return ''
  }

  const filtered = Object.values(routes).filter((route) => route[currentLang].split("/").pop() === (slug))
  return filtered.length > 0 ? filtered[0] : path

}

// Function to sanitise routes
//  Ps. Automatically created routes sometimes end up having double slashes ("//").
//  Easiest solution is to run any potentially problematic routes by this function.
export function sanitizeRoutes(url: string): string {
  let sanitizedUrl = url.replace("//", "/")
  return sanitizedUrl
}

