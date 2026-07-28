"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3 text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed my-4 text-base sm:text-lg">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2.5 text-muted-foreground my-5 text-base sm:text-lg">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2.5 text-muted-foreground my-5 text-base sm:text-lg">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-foreground">{children}</em>,
          hr: () => <hr className="my-8 border-t border-border" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/60 pl-4 py-1.5 my-6 italic text-muted-foreground bg-muted/20 rounded-r-md">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 border rounded-xl shadow-xs bg-card">
              <table className="w-full text-left text-sm border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b bg-muted/50 text-foreground font-semibold">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border/60">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-muted/30 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="p-3 text-xs uppercase tracking-wider font-bold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="p-3 text-muted-foreground">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
