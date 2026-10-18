/** Site-wide values. Import them from here; never repeat them in components. */
export const SITE = {
  name: "La Merollissima",
  description:
    "La Merollissima, a ducal republic built in Minecraft: its Gazette, its history and its builds.",
  /** Form of government, shown above the name on the home page. */
  government: "Ducal Republic",
  /** Home page introduction, drawn from the History and the builds. */
  intro:
    "From a valley of snow to the beacon of the server: a republic of amethyst, ruled by its Doge.",
  lang: "en",
  ogLocale: "en_US",
} as const;

/** The owner appears only by nickname. */
export const OWNER = { nickname: "mattex125", discord: "mattex125" } as const;

export const REPO_URL = "https://github.com/Mattex125/merollissima";

/** Wording recommended by the Minecraft Usage Guidelines. */
export const DISCLAIMER =
  "Not an official Minecraft website. Not approved by or associated with Mojang or Microsoft.";

export interface NavItem {
  /** Always ends with "/" (trailingSlash: "always"). */
  href: string;
  label: string;
}

export interface Section extends NavItem {
  /** One line, used as the page lead and the meta description. */
  description: string;
}

/** The site's sections, used by the navigation and the section pages. */
export const SECTIONS = {
  gazette: {
    href: "/gazette/",
    label: "Gazette",
    description: "Announcements, public works and official communications, newest first.",
  },
  history: {
    href: "/history/",
    label: "History",
    description: "The story of the republic, chapter by chapter.",
  },
  builds: {
    href: "/builds/",
    label: "Builds",
    description: "An interactive map of the republic's builds.",
  },
} as const satisfies Record<string, Section>;

/** Main navigation, in display order. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  SECTIONS.gazette,
  SECTIONS.history,
  SECTIONS.builds,
];
