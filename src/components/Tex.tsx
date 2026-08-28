import katex from "katex";
import { useMemo } from "react";

type Props = {
  children: string;
  display?: boolean;
};

/** Renders a KaTeX expression. Inline by default; pass display for block math. */
export default function Tex({ children, display = false }: Props) {
  const html = useMemo(
    () =>
      katex.renderToString(children, {
        throwOnError: false,
        displayMode: display,
      }),
    [children, display],
  );
  return (
    <span
      className={display ? "math math--block" : "math math--inline"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
