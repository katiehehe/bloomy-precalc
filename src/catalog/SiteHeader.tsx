type SitePage = "lessons" | "map";

function BrandMark() {
  return (
    <svg className="catalog__mark" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <g fill="var(--primary)">
        <circle cx="12" cy="6.4" r="4.1" opacity="0.9" />
        <circle cx="17.6" cy="12" r="4.1" opacity="0.72" />
        <circle cx="12" cy="17.6" r="4.1" opacity="0.9" />
        <circle cx="6.4" cy="12" r="4.1" opacity="0.72" />
      </g>
      <circle cx="12" cy="12" r="2.4" fill="var(--surface)" />
    </svg>
  );
}

export default function SiteHeader({ current }: { current: SitePage }) {
  return (
    <header className="catalog__top">
      <a className="catalog__brand" href="#/">
        <BrandMark />
        Bloomy
      </a>
      <nav className="site-nav" aria-label="Site">
        <a href="#/" aria-current={current === "lessons" ? "page" : undefined}>
          Lessons
        </a>
        <a href="#/map" aria-current={current === "map" ? "page" : undefined}>
          Curriculum map
        </a>
      </nav>
    </header>
  );
}
