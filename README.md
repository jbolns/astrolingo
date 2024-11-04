# WARNING !
Do **NOT** use just yet (haha, as if anyone was reading this, lol). It works, but I have to make some changes based on lessons learned by using it in my blog. In particular, the URL schema currently in use in this repository is quite hard to scale when you have multiple collections.

I have already implemented the upgrades on my website, so I just need to port them back here. 

Fully ready end of this or next week.

## AstroLingo: Multilingual Astro Blog
[**AstroLingo**](https://github.com/jbolns/astrolingo) adds multilingual support to Astro's [minimalistic blog template](https://astro.build/themes/details/blog/). It is primarily Astro and TypeScript, with some mildly-annoying but highly-effective vanilla-JS.

The theme has been tested with up to three languages, but the theme is theoretically able to support many many languages.

## 📱Features

Inherited features (from Astro's minimalistic blog template):

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
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

## 👨‍🚀 Use cases

*AstroLingo* packs all (or at least much of) the functionality you will need for a landing page, personal website, blog, or portfolio with many languages. As a sideplus, the code is relatively clean, which should in theory reduce running pains.

If your website does not have or need multiple languages, *AstroLingo* is probably a bit of an overkill.

## 🚀 Guidance
To keep things as simple as possible, *AstroLingo* relies on Astro's underlying functionality. There is one folder with somewhat complex functions needed to generate paths for blog indexes, entries, and tag listings. However, everything else relies entirely on Astro's underlying functionality. 

For this reason, if you get the structure underneath *AstroLingo*, managing an *AstroLingo* website should be easy. 

### Project structure
Inside a *AstroLingo* project, you will see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
|   |   ├── lang_1
|   |   ├── lang_2
|   |   ├── ...
|   |   ├── lang_N
│   ├── i18n/
│   ├── layouts/
│   ├── pages/
|   |   ├── [lang]
|   |   |   ├── blog
|   |   |   |   ├── [...page].astro
|   |   |   |   └── [...slug].astro
|   |   |   └── tags
|   |   |   |   └── [tags]
|   |   |   |   |   └── [...page].astro
|   |   ├── lang_1
|   |   |   └──  index.astro
|   |   |   └──  about.astro
|   |   ├── lang_2
|   |   |   └──  index.astro
|   |   |   └──  about.astro
|   |   ├── ...
|   |   |   └──  ...
|   |   |   └──  ...
|   |   └── lang_N
|   |   |   └──  index.astro
|   |   |   └──  about.astro
│   ├── styles/
│   └── consts.ts 
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

### Folder-by-folder overview
#### Internationalisation
Key language configuration files can be found in the `src\i18n` folder.

The file `src\i18n\ui.ts` is for language defaults and top-level navigation links to show in header.
- `languages`: a list of all languages supported
- `defaultLang`: the site's default language.
- `navLinks`: top-level links for the entire website.

The file `src\i18n\sections.ts` is for general info needed in different languages across the site, like the website name and description. 

The file `src\i18n\routes.ts` is for redirection rules to use when users change between languages.
- If you want URLs across languages to be the same (e.g. `en\about\`, `es\about\`), this file is not needed.
- If you want language-specific URLs (e.g. `en\about\`, `es\acerca\`), use this file to manage redirects between equivalent routes.

The file `src\i18n\utils.ts` contains utility functions needed to support internationalization.

#### Pages
Files in `src\pages\lang_1`, `src\pages\lang_2`, `...`, to `src\pages\lang_N` automatically become top-level pages (because Astro looks for `.astro` or `.md` files in the `src\pages\` directory and exposes them based on their file name).
- To create a language, add a folder with the language code of the new language. 
- To create pages for that language, add files inside that folder. For instance:
  - `src\pages\en\index.astro` will become the homepage for the *en* language.
  - `src\pages\es\acerca.astro` will become the acerca (about) page for the *es* language.
- You can: 
  - Add many language folders
  - Add many files/pages for each language folder
  - Use different names for files/pages across language folders (URLs will be different, so you will need to adjust redirections). 

#### Content
The `src\content\` directory contains "collections" of related Markdown and MDX documents. The folder is typically used for blog entries, and follows the same rationale as the pages folder.
- Blogs for a specific language for inside the folder with the language's code 
- You can have as many blogs per language as desired, and names for blogs in different languages can be different (URLs will differ, so you will need to adjust redirections)
- You do not need to translate every blog entry
  - Entries in each language folder will show on the respective blog regardless of whether they have equivalents in other languages (you will need to adjust redirections, though).
- To avoid image duplication, all images for blogs go to Astro's standard `public\` directory.

Do **NOT** name files with the exact acronym of any language or collection used in the site. For example:
- If you use `en` as a language, avoid naming files `\en.md`, `\en.astro`, or `\en.whatever`
- If you have a collection named `blog`, files named `\blog.md`, `\blog.astro`, or `\blog.whatever` could be problematic.

#### Blog index and tag pages
The files in `src\pages\[lang]` define the functionality for all blog listings, blog entries, and tags. The underlying logic across all files in these folders is the same:
- Get all content in collections (using Astro's `getCollection()`)
- Map content to language (using paths) (using vanilla-JS's `flatMap()` and `map()`)
- Create pages/paths for all possible blog indexes, entries, and tags combinations using Astro's `getStaticPaths()`.

The files in this folder are arguably the most complex bit of *AstroLingo*. They have been purposedly condensed to reduce the amount of code that needs changing if one wishes to add features.

#### Other folders & files
- The `src\components\` folder works as standard in any Astro/React/Vue/Svelte/Preact project.
  - A few components needed for multilingual functionality are included (e.g. language picker, tag list, and pagination).
- The `src\layouts\` folder contains layouts that help render pages and blogs across the site.
  - You can create additional layouts and use them as wrappers aroung other components (you might need to slightly adapt the code to use them).
- Hero images referenced in the frontmatter of markdown (blog) files must be placed in the `public\` directory.
  - There are ways around this, but this is not within the scope of this theme.
  - To avoid images in the public folder hurting site performance unnecessarily, use .webp images (they're way smaller and render just fine).
- CSS styles were removed into a single file in the `src\styles` folders.
  - To use your own styles, recode or replace `src\styles\global.css`.
- The *file* `src\consts.ts` is for constants that do not require translation (e.g. social media links, which tend to be the same in any language).
- The *file* `src\types.ts` if for types additional to what Astro already offers.

## 🛣️ Default paths
All paths adhere to a `[host]/[code]` format (e.g. *example.com/en/*). If someone visits the shared home at `[host]/` (e.g. *example.com/*), they will see a language selector.

[Astro's documentation](https://docs.astro.build/en/guides/internationalization/#prefixdefaultlocale) contains details about how to:
- Redirect the shared home to the default language (easy: a fairly straightforward change to `src/index.astro` and a minor modification to `astro.config.mjs`).
- Hide the default language code (bit harder: project structure needs to adjusted slightly, so path generation needs to also be adjusted).

Personally, I would just leave it as it is and put a video or animation on top of the language picker in the shared home.

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