// SPDX-FileCopyrightText: 2026 Yaoyao(Freax) Qian <limyoonaxi@gmail.com>
// SPDX-License-Identifier: GPL-3.0-only

// ============================================================
// Data loader
//
// Loads content from two sources:
//   - Markdown files (content/**/*.md) → parsed by Vite plugin
//   - JSON files (content/*.json)      → imported directly
//
// Users edit files in content/. Type safety applied here.
// ============================================================

import type {
  Research, Experience, NewsItem, About, Publication,
  ProjectItem, Award, ExperienceEntry,
} from '../types'

// ── Markdown glob imports (each .md → { frontmatter..., body: html }) ──

const projectMds = import.meta.glob('/content/projects/*.md', { eager: true }) as Record<string, { default: Record<string, unknown> }>
const articleMds = import.meta.glob('/content/articles/*.md', { eager: true }) as Record<string, { default: Record<string, unknown> }>
const publicationMds = import.meta.glob('/content/publications/*.md', { eager: true }) as Record<string, { default: Record<string, unknown> }>

function collectMd(modules: Record<string, { default: Record<string, unknown> }>): Record<string, unknown>[] {
  return Object.values(modules).map(m => {
    const { body, ...frontmatter } = m.default
    // Map body → summary for project/article cards, body → abstract for publications
    return { ...frontmatter, _body: body }
  })
}

// Convert Markdown body into the fields components expect
function mdToProject(raw: Record<string, unknown>): ProjectItem {
  const { _body, ...rest } = raw
  const bodyStr = (_body as string) || ''

  // Extract highlights from Markdown list items
  const highlights: string[] = []
  const lines = bodyStr.replace(/<[^>]+>/g, '').split('\n')
  for (const line of lines) {
    const m = line.match(/^[-*]\s+(.+)/)
    if (m) highlights.push(m[1].trim())
  }

  // Summary is the first paragraph (non-list, non-heading text)
  const summary = lines
    .filter(l => l.trim() && !l.match(/^[-*#]/) && !l.match(/^</) )
    .map(l => l.trim())
    .join(' ')

  return {
    summary,
    highlights: highlights.length > 0 ? highlights : undefined,
    ...rest,
  } as unknown as ProjectItem
}

function mdToPublication(raw: Record<string, unknown>): Publication {
  const { _body, ...rest } = raw
  const bodyStr = (_body as string) || ''
  // Strip HTML tags for plain text abstract
  const abstract = bodyStr.replace(/<[^>]+>/g, '').trim()
  return { abstract, ...rest } as unknown as Publication
}

function mdToAbout(raw: Record<string, unknown>): About {
  const { _body, ...rest } = raw
  const bodyStr = (_body as string) || ''
  const journey = bodyStr.replace(/<[^>]+>/g, '').trim()
  return { journey, ...rest } as unknown as About
}

// ── JSON imports (structured data that stays as JSON) ──

import experienceJson from '@content/experience.json'
import newsJson from '@content/news.json'
import awardsJson from '@content/awards.json'
import researchJson from '@content/research.json'
import logosJson from '@content/logos.json'

// Import about.md
const aboutMd = import.meta.glob('/content/about.md', { eager: true }) as Record<string, { default: Record<string, unknown> }>

// ── Exports ──

export const projects: ProjectItem[] = collectMd(projectMds).map(mdToProject)
export const articles: ProjectItem[] = collectMd(articleMds).map(mdToProject)
export const publications: Publication[] = collectMd(publicationMds).map(mdToPublication)

const aboutRaw = Object.values(aboutMd)[0]?.default ?? {}
export const about: About = mdToAbout(aboutRaw)

export const research: Research = researchJson as Research
export const experience: Experience = {
  ...experienceJson,
  professional: [],
  academic: [],
} as Experience
export const experienceTimeline: ExperienceEntry[] = experienceJson.timeline as ExperienceEntry[]
export const news: NewsItem[] = newsJson as NewsItem[]
export const awards: Award[] = awardsJson as Award[]
export const institutionLogos: Record<string, string> = logosJson as Record<string, string>

// ── Helper functions ──

export const getPublicationsByYear = (year: number) =>
  publications.filter(pub => pub.year === year)

export const getPublicationsByVenue = (venueType: string) =>
  publications.filter(pub => pub.venueType === venueType)

export const getFirstAuthorPublications = () =>
  publications.filter(pub => pub.isFirstAuthor)

export const getPublicationStats = () => {
  const stats = {
    total: publications.length,
    byYear: {} as Record<number, number>,
    byVenue: {} as Record<string, number>,
    firstAuthor: 0,
    correspondingAuthor: 0,
    withCode: 0,
    withDataset: 0,
  }
  publications.forEach(pub => {
    stats.byYear[pub.year] = (stats.byYear[pub.year] || 0) + 1
    stats.byVenue[pub.venueType] = (stats.byVenue[pub.venueType] || 0) + 1
    if (pub.isFirstAuthor) stats.firstAuthor++
    if (pub.isCorrespondingAuthor) stats.correspondingAuthor++
    if (pub.links.code) stats.withCode++
    if (pub.links.dataset) stats.withDataset++
  })
  return stats
}
