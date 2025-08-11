import { pathToRoot } from "../util/path"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  function PageTitleCH({ fileData, cfg, displayClass }: QuartzComponentProps) {
    const baseDir = pathToRoot(fileData.slug!)
    const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title

    return (
      <h1 class={classNames(displayClass, "page-title")}>
        <a href={baseDir}>{title}</a>
        <span class="ch-badge" aria-label="CH mark">CH</span>
      </h1>
    )
  }

  // component-scoped styles (Quartz will bundle this)
  PageTitleCH.css = `
    .page-title .ch-badge{
      display:inline-flex;align-items:center;justify-content:center;
      width:1.1em;height:1.1em;border-radius:999px;
      border:1.5px solid currentColor;font-size:.55em;font-weight:700;line-height:1;
      vertical-align:super;margin-left:.3em;opacity:.85;
    }
    @media (prefers-color-scheme: dark){
      .page-title .ch-badge{opacity:.9}
    }
  `
  return PageTitleCH
}) satisfies QuartzComponentConstructor

