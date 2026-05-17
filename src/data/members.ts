/**
 * Loads member and organization cards from `_members/**` markdown files.
 * Schema mirrors PyTorchKR's `_members/` Jekyll collection so future
 * synchronization stays trivial.
 */

export interface MemberLinks {
  github?: string
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  youtube?: string
  homepage?: string
}

export interface Member {
  id: string
  name: string
  title: string
  team: string
  joined: string
  role: 'maintainer' | 'alumni' | 'advisory'
  links: MemberLinks
}

export interface Organization {
  id: string
  name: string
  title: string
  joined: string
  description: string
  links: MemberLinks
}

function parseFrontmatter(raw: string): Record<string, string> {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!m) return {}
  const out: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i < 0) continue
    const key = line.slice(0, i).trim()
    const value = line.slice(i + 1).trim()
    if (key) out[key] = value
  }
  return out
}

function toLinks(fm: Record<string, string>): MemberLinks {
  const pick = (k: string) => (fm[k] && fm[k].length > 0 ? fm[k] : undefined)
  return {
    github: pick('link_github'),
    linkedin: pick('link_linkedin'),
    twitter: pick('link_twitter'),
    facebook: pick('link_facebook'),
    instagram: pick('link_instagram'),
    youtube: pick('link_youtube'),
    homepage: pick('link_homepage'),
  }
}

const RAW = import.meta.glob('../../_members/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const allMembers: Member[] = []
const allOrgs: Organization[] = []

for (const [path, raw] of Object.entries(RAW)) {
  const fm = parseFrontmatter(raw)
  if (!fm._id) continue

  if (fm.kind === 'organization' || path.includes('/organizations/')) {
    allOrgs.push({
      id: fm._id,
      name: fm.name || fm._id,
      title: fm.title || '',
      joined: fm.joined || '',
      description: fm.description || '',
      links: toLinks(fm),
    })
    continue
  }

  const role = (fm.role as Member['role']) || 'maintainer'
  allMembers.push({
    id: fm._id,
    name: fm.name || fm._id,
    title: fm.title || '',
    team: fm.team || '',
    joined: fm.joined || '',
    role,
    links: toLinks(fm),
  })
}

const byJoined = (a: { joined: string }, b: { joined: string }) =>
  a.joined.localeCompare(b.joined)

export const MAINTAINERS: Member[] = allMembers
  .filter((m) => m.role === 'maintainer')
  .sort(byJoined)

export const ALUMNI: Member[] = allMembers
  .filter((m) => m.role === 'alumni')
  .sort(byJoined)

export const ADVISORY: Member[] = allMembers
  .filter((m) => m.role === 'advisory')
  .sort(byJoined)

export const ORGANIZATIONS: Organization[] = allOrgs.sort(byJoined)
