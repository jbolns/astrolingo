// Simple types
export type Lang = string
export type CollectionName = string

// List of coolections
export type ListOfCollections = CollectionName[]

// Multi-language
export interface Multi {
  [key: string]: string;
}

// Page information
export type Page = {
  TITLE: Multi
  DESCRIPTION: Multi
}

// Site information
export interface Site extends Page {
  AUTHOR: Multi
  CONTACT: Multi
}

// Top-level navigation links
export type Links = {
  TEXT: string
  HREF: string
  LANGUAGES: string[]
}[]

// Social media links
export type Socials = {
  NAME: string
  ICON: string
  TEXT: string
  HREF: string
}[]