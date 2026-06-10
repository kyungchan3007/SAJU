import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-black tracking-tight text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-black text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-bold text-[#5956E9]">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-sm leading-7 text-gray-600">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="flex flex-col gap-1 pl-4 text-sm leading-7 text-gray-600">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="list-disc text-sm leading-7 text-gray-600">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    hr: () => <hr className="border-gray-100" />,
    ...components,
  };
}
