## AstroLingo: Multilingual Astro Blog
[**AstroLingo**](https://github.com/jbolns/astrolingo) adds multilingual support to Astro's [minimalistic blog template](https://astro.build/themes/details/blog/). It packs all (or at least much of) the functionality needed for a multilingual personal, blog, or portfolio website.

If your website does not need multiple languages, *AstroLingo* is probably a bit of an overkill.

If it does, *AstroLingo* might save you many hours of work.

## 📱Features
Inherited features (from Astro's minimalistic blog template):
- ✅ Minimal styling (make it your own!)
- ✅ Outstanding Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

Added features:
- ✅ Multilingual pages
- ✅ Multilingual blogs
- ✅ Multilingual tags (tags can be different across languages)
- ✅ Multilingual paths (URLs can be different across languages)
- ✅ Multilingual pagination (blogs and tag lists paginated by language)
- ✅ Independently customisable pages (pages can look different across languages).

## 🚀 Guidance
To keep things simple, *AstroLingo* relies on Astro's underlying functionality.

### Standard structure
Since it relies heavily on Astro's functionality, understanding the structure of an *AstroLingo* is important.

The standard *AstroLingo* project looks as follows.

```text
├── public/ 
├── src/
│   ├── components/
│   ├── content/
|   |   ├── lang_1
|   |   ├── lang_2
|   |   ├── ...
|   |   └── lang_N
│   ├── i18n/
│   ├── layouts/
│   ├── pages/
|   |   ├── blog
|   |   |   ├── [...page].astro
|   |   |   └── [...slug].astro
|   |   └── tags
|   |   |   └── [lang]
|   |   |   |   └── [tags]
|   |   |   |       └── [...page].astro
|   |   lang_1
|   |   └──  index.astro
|   |   └──  about.astro
|   |   lang_2
|   |   └──  index.astro
|   |   └──  acerca.astro
|   |   ...
|   |   lang_N
|   |   └──  index.astro
|   |   └──  minusta.astro
│   ├── styles/
│   └── consts.ts 
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

#### Internationalisation
Key language configuration files are in the `src\i18n` folder.

=> The file `src\i18n\ui.ts` is for language defaults and top-level navigation links to show in header.
- `languages`: a list of all languages supported
  - Used variously across AstroLingo to render the correct string or path for a given language
- `defaultLang`: the site's default language
  - Used variously across AstroLingo when there is a need of a language fallback
- `listOfCollections`: a list of the names for all collection names in the site
  - Used in the component that generates top-level navigation links to render each link with the appropriate URL format
- `navLinks`: top-level links for the entire website
  - Used in the component that generates top-level navigation links to render the correct links for each language.

=> The file `src\i18n\sections.ts` is for general website info needed across the site, like the website name and description.

=> The file `src\i18n\routes.ts` is for redirection rules when changing between languages.
- If you want URLs across languages to be the same (e.g. `en\about\`, `es\about\`), this file is not needed.
- Use to define equivalent routes across different languages (e.g. `en\about\` <---> `es\acerca\`).

=> The file `src\i18n\utils.ts` contains utility functions needed to support internationalization.

#### Content
The `src\content\` directory contains "collections" of related Markdown and MDX documents that eventually become blog, portfolio, and/or collection entries. 

This folder follows the same rationale as the pages folder.
- To add a new collection, create a folder named after the collection
- To add a language, create a folder with add an `.md` or `.mdx` file under the desired `[collection]/[language]` folder
- You do not need to translate every entry
  - Entries in each folder will show on the respective blog regardless of whether they have equivalents in other languages.
- To avoid image duplication, all images for blogs go to Astro's standard `public\` directory.

Do **NOT** name collection files with the exact acronym of any language or collection used in the site. For example:
- If you use `en` as a language, avoid naming files `\en.md`, `\en.astro`, or `\en.whatever`
- If you have a collection named `blog`, files named `\blog.md`, `\blog.astro`, or `\blog.whatever` could be problematic.

#### Pages
Files in `src\pages\lang_1`, `src\pages\lang_2`, `...`, to `src\pages\lang_N` automatically become top-level pages with the URL format `./[lang]/[filename]/`.
- To add a new language, add a folder named with the language code of the new language. 
- To create pages for that language, add files inside that folder.
- You can use different filenames across language folders (URLs will be different, so you will need to add a route equivalence in `src\i18n\routes.ts`). 

Files in `src\pages\blog\[lang]` generate blog listing with format `blog/[lang]/` and blog entries with format `blog/[lang]/[entry]` from the files in the content folder using the following logic.
- Get all content in the specific collection using Astro's `getCollection()`
- Map content to language using `flatMap()` and `map()`
- Create pages/paths for all possible blog indexes, entries, and tags combinations using Astro's `getStaticPaths()`.

If you want to add collections, simply recreate the logic in the existing blog folder. Paths for additional collection will use the format `./[collection]/[lang]/[entry]/`.
- It is possible to change the folder structure so collection paths have the language at the very beginning of the path, but I cannot recommend it. I tried it, and it makes it really difficult to manage route equivalences with multiple collections.

#### Other folders & files
- The `src\components\` folder is the standard Astro/React/Vue/Svelte/Preact components folder.
  - A few components needed for multilingual functionality are included.
- The `src\layouts\` folder contains layouts that help render pages and blogs across the site.
  - You can create additional layouts and use them as wrappers aroung other components (you might need to slightly adapt the code to use them).
- Hero images referenced in the frontmatter of markdown (blog) files must be placed in the `public\` directory.
  - There are ways around this, but this is not within the scope of this theme.
- CSS styles were removed into a single file in the `src\styles` folders.
  - To use your own styles, recode or replace `src\styles\global.css`.
  - Alternatively, delete the existing styles and use a stylying Astro integration, like Tailwind (that's what I did with my own website).
- The *file* `src\types.ts` if for types additional to what Astro already offers.

## 🛣️ Other
Since *AstroLingo* relies heavily on Astro's underlying functionality, it is possible to do more things such as, for instance:
- Redirect the shared home to the default language
- Hide the default language in URLs

Read [Astro's documentation](https://docs.astro.build/en/guides/internationalization/#prefixdefaultlocale) for details about how to do this and how internalisation works.


## 💻 Commands
All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `.\dist\`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🤗 Credits
*AstroLingo* is based off of Astro's [minimalistic blog template](https://astro.build/themes/details/blog/), itself based off [Bear Blog](https://github.com/HermanMartinus/bearblog/). That said, *AstroLingo* is separate and independent from Astro.

To learn more about me, check out my [website](https:www.josebolanos.xyz/) or [GitHub](https://github.com/jbolns).

To learn more about Astro, check out [their documentation](https://docs.astro.build), in particular, the bits about [internationalization](https://docs.astro.build/en/guides/internationalization/).

## ⚖️ License
This theme is published under a standard [MIT license](./LICENSE).

I am more of an Apache person myself. However, [Astro uses MIT](https://github.com/withastro/astro/blob/main/LICENSE). It made sense to stick with it.