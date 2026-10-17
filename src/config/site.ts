/** Site-wide values. Import them from here; never repeat them in components. */
export const SITE = {
  name: "La Merollissima",
  description:
    "Gazette, history and builds of La Merollissima, a Minecraft republic inspired by Venice.",
  lang: "en",
  ogLocale: "en_US",
} as const;

export interface NavItem {
  /** Always ends with "/" (trailingSlash: "always"). */
  href: string;
  label: string;
}

/** Main navigation, in display order. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/gazette/", label: "Gazette" },
  { href: "/history/", label: "History" },
  { href: "/builds/", label: "Builds" },
];
