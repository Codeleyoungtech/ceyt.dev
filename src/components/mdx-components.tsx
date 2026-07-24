import type { MDXRemoteProps } from "next-mdx-remote/rsc";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  p: (props) => <p {...props} />,
  ul: (props) => <ul className="ml-5 list-disc space-y-2" {...props} />,
  ol: (props) => <ol className="ml-5 list-decimal space-y-2" {...props} />,
  a: (props) => (
    <a
      {...props}
      className="underline decoration-[color-mix(in_oklab,var(--accent-indigo)_70%,transparent)]"
    />
  ),
};
