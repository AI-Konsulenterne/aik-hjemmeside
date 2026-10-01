/**
 * Minimal markdown → JSX renderer.
 * Understøtter: headings, paragraphs, lists, bold, italic, links, code.
 *
 * Hvis I senere vil have mere avanceret markdown (tables, footnotes, nested lists),
 * kan vi tilføje `react-markdown` + `remark-gfm`.
 */

import React, { type ReactNode } from "react";

function inlineMarkdown(text: string): ReactNode[] {
  // Split on inline patterns while preserving them
  const parts: ReactNode[] = [];
  const regex =
    /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      // Link: [label](url)
      parts.push(
        <a
          key={key++}
          href={match[3]}
          className="text-primary hover:underline"
          target={match[3].startsWith("http") ? "_blank" : undefined}
          rel={match[3].startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      // Bold
      parts.push(
        <strong key={key++} className="font-bold text-gray-900">
          {match[5]}
        </strong>,
      );
    } else if (match[6]) {
      // Italic
      parts.push(<em key={key++}>{match[7]}</em>);
    } else if (match[8]) {
      // Inline code
      parts.push(
        <code
          key={key++}
          className="bg-gray-100 text-primary font-mono text-[0.9em] px-1.5 py-0.5 rounded"
        >
          {match[9]}
        </code>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function renderMarkdown(source: string): ReactNode {
  if (!source?.trim()) return null;

  const blocks: ReactNode[] = [];
  const lines = source.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip blank
    if (!line.trim()) {
      i++;
      continue;
    }

    // Headings
    const h = line.match(/^(#{1,6})\s+(.*)/);
    if (h) {
      const level = h[1].length;
      const content = inlineMarkdown(h[2]);
      const classes: Record<number, string> = {
        1: "text-3xl lg:text-4xl font-bold tracking-heading mt-12 mb-6 leading-tight",
        2: "text-2xl lg:text-3xl font-bold tracking-heading mt-10 mb-4 leading-tight",
        3: "text-xl lg:text-2xl font-bold tracking-heading mt-8 mb-3 leading-snug",
        4: "text-lg font-bold tracking-heading mt-6 mb-2",
        5: "text-base font-bold mt-4 mb-2",
        6: "text-sm font-bold uppercase tracking-wider mt-4 mb-2",
      };
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      blocks.push(
        React.createElement(
          Tag,
          { key: key++, className: classes[level] },
          content,
        ),
      );
      i++;
      continue;
    }

    // Lists (unordered)
    if (/^[-*]\s+/.test(line)) {
      const items: ReactNode[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(
          <li key={items.length} className="mb-2">
            {inlineMarkdown(lines[i].replace(/^[-*]\s+/, ""))}
          </li>,
        );
        i++;
      }
      blocks.push(
        <ul
          key={key++}
          className="list-disc pl-6 my-4 text-body text-gray-700 marker:text-primary"
        >
          {items}
        </ul>,
      );
      continue;
    }

    // Lists (ordered)
    if (/^\d+\.\s+/.test(line)) {
      const items: ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(
          <li key={items.length} className="mb-2">
            {inlineMarkdown(lines[i].replace(/^\d+\.\s+/, ""))}
          </li>,
        );
        i++;
      }
      blocks.push(
        <ol
          key={key++}
          className="list-decimal pl-6 my-4 text-body text-gray-700 marker:text-primary"
        >
          {items}
        </ol>,
      );
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={key++}
          className="border-l-4 border-primary pl-5 my-6 text-body text-gray-700 italic"
        >
          {inlineMarkdown(quoteLines.join(" "))}
        </blockquote>,
      );
      continue;
    }

    // Paragraph — gather until blank line
    const paragraph: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^[#>\-*]|^\d+\./.test(lines[i])) {
      paragraph.push(lines[i]);
      i++;
    }
    blocks.push(
      <p
        key={key++}
        className="text-body text-gray-700 mb-5"
      >
        {inlineMarkdown(paragraph.join(" "))}
      </p>,
    );
  }

  return <>{blocks}</>;
}
