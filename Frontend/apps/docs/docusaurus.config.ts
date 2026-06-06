import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "saju-me docs",
  tagline: "saju 프론트엔드와 제품 운영을 위한 개발 문서",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.saju-me.com",
  baseUrl: "/",
  organizationName: "proejct-saju",
  projectName: "saju",

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/proejct-saju/saju/tree/main/apps/docs/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/proejct-saju/saju/tree/main/apps/docs/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: [
            require.resolve("@saju/design-tokens/css"),
            "./src/css/custom.css",
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "saju-me docs",
      logo: {
        alt: "saju-me docs logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "문서",
        },
        { to: "/blog", label: "블로그", position: "left" },
        {
          href: "https://github.com/proejct-saju/saju",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "문서",
          items: [
            {
              label: "saju-me 개발 문서",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "프로젝트",
          items: [
            {
              label: "서비스",
              href: "https://saju.me",
            },
          ],
        },
        {
          title: "더보기",
          items: [
            {
              label: "블로그",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/proejct-saju/saju",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} saju-me. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
