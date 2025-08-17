import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import CustomFooter from "./quartz/components/CustomFooter"
import { QuartzComponentConstructor, QuartzComponentProps } from "./quartz/components/types"

// Hide a component when a front-matter flag is set (e.g., hideExplorer / hideToc)
const unlessHidden =
  (flag: "hideExplorer" | "hideToc") =>
  (C: QuartzComponentConstructor): QuartzComponentConstructor =>
  (opts: QuartzComponentProps) =>
    opts.fileData.frontmatter?.[flag] ? null : C(opts)

// Show TOC only if the page actually has enough headings (e.g., 3+)
const onlyIfManyHeadings =
  (min = 3) =>
  (C: QuartzComponentConstructor): QuartzComponentConstructor =>
  (opts: QuartzComponentProps) =>
    (opts.fileData.headings?.length ?? 0) >= min ? C(opts) : null

const isHome = (opts: QuartzComponentProps) =>
  opts.fileData.slug === "index" || opts.fileData.slug === "" || opts.fileData.slug === undefined

const wrap =
  (show: (o: QuartzComponentProps) => boolean, C: QuartzComponentConstructor): QuartzComponentConstructor =>
  (opts) => (show(opts) ? C(opts) : null)

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
      Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'chinhau/chinhau.github.io',
        repoId: 'R_kgDOPb6RyQ',
        category: 'General',
        categoryId: 'DIC_kwDOPb6Ryc4CuQ3V',
        mapping: 'pathname',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '0',
        inputPosition: 'bottom',
        theme: 'preferred_color_scheme',
        lang: 'en'
      }
    })
  ],
  left: [
    // Show Explorer on all pages EXCEPT home, unless page opts out.
    wrap(
      (o) => !isHome(o) && !o.fileData.frontmatter?.hideExplorer,
      Component.Explorer({title: "e³ Library", })
    ),
  ],
  right: [
    // Show TOC only if not home, not hidden, and has enough headings
    wrap(
      (o) => !isHome(o) && !o.fileData.frontmatter?.hideToc && (o.fileData.headings?.length ?? 0) >= 3,
      Component.TableOfContents()
    ),
  ],
  footer: CustomFooter({
    links: {
      GitHub: "https://github.com/chinhau",
      Twitter: "https://twitter.com/elonmusk", // Optional
      LinkedIn: "https://linkedin.com/in/chinhau", 
      Email: "mailto:im.chinhau@gmail.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(), // ✅ Already have reading time!
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({title: "e³ Library"}),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  // ✅ ADD THIS SECTION:
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'chinhau/chinhau.github.io',
        repoId: 'R_kgDOPb6RyQ',
        category: 'General',
        categoryId: 'DIC_kwDOPb6Ryc4CuQ3V',
        mapping: 'pathname',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '0',
        inputPosition: 'bottom',
        theme: 'preferred_color_scheme',
        lang: 'en'
      }
    })
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(), 
    Component.ArticleTitle(), 
    Component.ContentMeta() // ✅ Already have reading time!
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({title: "e³ Library"}),
  ],
  right: [
    // ✅ Add recent posts to right sidebar
    Component.RecentNotes({
      title: "Latest Research",
      limit: 5,
      filter: (f) => f.slug !== "index"
    })
  ],
  afterBody: [
    // ✅ Add comments to bottom of pages
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'chinhau/chinhau.github.io',
        repoId: 'R_kgDOPb6RyQ',
        category: 'General',
        categoryId: 'DIC_kwDOPb6Ryc4CuQ3V',
        mapping: 'pathname',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '0',
        inputPosition: 'bottom',
        theme: 'preferred_color_scheme',
        lang: 'en'
      }
    })
  ],
}
