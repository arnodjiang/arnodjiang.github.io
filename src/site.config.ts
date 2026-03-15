// SPDX-FileCopyrightText: 2026 Yaoyao(Freax) Qian <limyoonaxi@gmail.com>
// SPDX-License-Identifier: GPL-3.0-only

/**
 * Site configuration — imports from content/site.json
 *
 * Users edit content/site.json (pure JSON, no code needed).
 * This file computes derived values used by components.
 */

import siteJson from '@content/site.json'

// ═══════════════════════════════════════════════════════════════
// The config object — mirrors content/site.json
// ═══════════════════════════════════════════════════════════════

export const siteConfig = siteJson

// ═══════════════════════════════════════════════════════════════
// Derived values — computed automatically, do NOT edit
// ═══════════════════════════════════════════════════════════════

/** GitHub username extracted from URL */
export const githubUsername = siteConfig.social.github.split('/').pop() ?? ''

/** Selected publication IDs as a Set for fast lookup */
export const selectedPublicationIds = new Set<string>(siteConfig.selectedPublicationIds)

/** Auto-generated navigation from enabled features */
export const navItems = [
  { path: '/', label: 'Home' },
  ...(siteConfig.features.publications ? [{ path: '/publications', label: 'Publications' }] : []),
  ...(siteConfig.features.experience ? [{ path: '/experience', label: 'Experience' }] : []),
  ...(siteConfig.features.projects ? [{ path: '/projects', label: 'Projects' }] : []),
  ...(siteConfig.features.articles ? [{ path: '/articles', label: 'Articles' }] : []),
  ...(siteConfig.features.guide !== false ? [{ path: '/guide', label: 'Guide' }] : []),
] as const

/** Hero social icons with resolved URLs from social config */
export const heroSocialIcons = siteConfig.heroSocialIcons.map(item => ({
  icon: item.icon,
  label: item.label,
  color: item.color,
  href: (siteConfig.social as Record<string, string>)[item.platform] ?? '',
}))

/**
 * Backward-compatible `siteOwner` — components import this shape.
 */
export const siteOwner = {
  name: siteConfig.name,
  terminalUsername: siteConfig.terminal.username,
  rotatingSubtitles: siteConfig.terminal.rotatingSubtitles,
  contact: {
    email: siteConfig.contact.email,
    academicEmail: siteConfig.contact.academicEmail,
    hiringEmail: siteConfig.contact.hiringEmail,
    location: siteConfig.contact.location,
    linkedin: siteConfig.social.linkedin,
  },
  social: siteConfig.social,
  timezone: siteConfig.terminal.timezone,
  skills: siteConfig.terminal.skills,
  pets: siteConfig.pets as { name: string; emoji: string; image: string; title: string; description: string }[],
} as const
