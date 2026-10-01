import Markdown from "react-markdown"

// Raw HTML is skipped and images are dropped: the model's output is untrusted.
// react-markdown's default urlTransform already neutralises javascript: URLs.
const components = {
  p: ({ children }) => <p className="mt-3 first:mt-0">{children}</p>,
  h1: ({ children }) => <p className="mt-4 font-semibold first:mt-0">{children}</p>,
  h2: ({ children }) => <p className="mt-4 font-semibold first:mt-0">{children}</p>,
  h3: ({ children }) => <p className="mt-4 font-semibold first:mt-0">{children}</p>,
  h4: ({ children }) => <p className="mt-3 font-semibold first:mt-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="mt-3 list-disc space-y-1 pl-6 first:mt-0 marker:text-muted">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-1 pl-6 first:mt-0 marker:text-muted">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm text-accent underline decoration-accent/50 underline-offset-2 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded-sm bg-raised px-1 font-mono text-xs text-text">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="mt-3 overflow-x-auto rounded-md bg-raised p-3 first:mt-0">{children}</pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-3 border-l-2 border-line-strong pl-3 text-text-2 first:mt-0">{children}</blockquote>
  ),
  hr: () => <hr className="my-4 border-line" />,
}

export function MarkdownMessage({ content }) {
  return (
    <div className="break-words">
      <Markdown components={components} skipHtml disallowedElements={["img"]} unwrapDisallowed>
        {content}
      </Markdown>
    </div>
  )
}
