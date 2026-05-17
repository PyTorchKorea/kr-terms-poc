import React, { useMemo } from 'react'
import { Typography, Box, Container, Button, Link } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LanguageIcon from '@mui/icons-material/Language'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import AddIcon from '@mui/icons-material/Add'
import { Layout } from '../components/Layout'
import {
  MAINTAINERS,
  ORGANIZATIONS,
  type Member,
  type Organization,
  type MemberLinks,
} from '../data/members'
import { ORGANIZATION_JOIN_URL } from '../data/const'

export function OrganizationsPage(): React.ReactNode {
  const randomizedOrganizations = useMemo(() => shuffleOrganizations(ORGANIZATIONS), [])

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 0, '& > section:last-of-type': { mb: 0 } }}>
        <PageHeader
          eyebrow="Community"
          title="운영 및 기여 조직"
          lead="AI/ML 용어집은 여러 조직과 관리자들의 참여로 함께 만들어 갑니다. 참여 조직 카드는 페이지를 조회할 때마다 다른 순서로 표시됩니다."
        />

        <Section eyebrow="Operation" title="저장소 운영">
          <P>
            아래 관리자들이 이슈 검토와 용어 승인을 담당하며, 자동화 워크플로우가 변경 사항을 데이터 파일에 반영합니다.
          </P>
        </Section>

        <Section eyebrow="Maintainers" title="관리자">
          <MemberGrid members={MAINTAINERS} />
        </Section>

        <Section eyebrow="Organizations" title="참여 조직">
          <P>
            본 용어집을 함께 활용하거나, 데이터 및 도메인 지식을 함께 정리하고 있는 조직들입니다.
          </P>
          <OrgGrid orgs={randomizedOrganizations} />
        </Section>

        <Section eyebrow="Join" title="참여 방법">
          <P>
            본 용어집을 활용하거나, 자체 도메인의 용어를 함께 추가하고 싶으신 조직 및 담당자분께서는 조직 참여 신청 이슈를 작성해주세요.
          </P>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            href={ORGANIZATION_JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 1 }}
          >
            조직 참여 신청
          </Button>
        </Section>
      </Container>
    </Layout>
  )
}

function shuffleOrganizations(orgs: Organization[]): Organization[] {
  const shuffled = [...orgs]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const item = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = item
  }
  return shuffled
}

function MemberGrid({ members }: { members: Member[] }): React.ReactNode {
  if (members.length === 0) return null
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {members.map((m) => (
        <PersonCard key={m.id} member={m} />
      ))}
    </Box>
  )
}

function PersonCard({ member }: { member: Member }): React.ReactNode {
  const avatar = `https://github.com/${member.id}.png?size=160`
  const isLead = /lead/i.test(member.title)
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: '1px solid var(--ptk-line-soft)',
        borderTop: isLead ? '3px solid var(--ptk-orange)' : '1px solid var(--ptk-line-soft)',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'border-color 120ms ease',
        '&:hover': { borderColor: 'var(--fg-1)' },
      }}
    >
      <Box
        component="img"
        src={avatar}
        alt={member.name}
        loading="lazy"
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          mb: 1.5,
          bgcolor: 'var(--bg-2)',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 700,
          fontSize: 15,
          color: 'var(--fg-1)',
          lineHeight: 1.2,
          mb: 0.25,
        }}
      >
        {member.name}
      </Box>
      <Box
        sx={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: isLead ? 'var(--ptk-orange)' : 'var(--fg-3)',
          mb: 0.5,
        }}
      >
        {member.title}
      </Box>
      {member.team && (
        <Box
          sx={{
            fontSize: 12,
            color: 'var(--fg-2)',
            mb: 1.25,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}
          title={`팀: ${member.team}`}
        >
          {member.team}
        </Box>
      )}
      <SocialRow links={member.links} />
    </Box>
  )
}

function OrgGrid({ orgs }: { orgs: Organization[] }): React.ReactNode {
  if (orgs.length === 0) return null
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
        gap: 2,
        mt: 1,
      }}
    >
      {orgs.map((o) => (
        <OrgCard key={o.id} org={o} />
      ))}
    </Box>
  )
}

function OrgCard({ org }: { org: Organization }): React.ReactNode {
  const avatar = getOrganizationImage(org)
  const fallbackAvatar = getGitHubOrganizationImage(org)
  const primary = org.links.homepage || org.links.github
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: '1px solid var(--ptk-line-soft)',
        p: 2.25,
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        transition: 'border-color 120ms ease',
        '&:hover': { borderColor: 'var(--fg-1)' },
      }}
    >
      <Box
        component={primary ? 'a' : 'div'}
        href={primary}
        target={primary ? '_blank' : undefined}
        rel={primary ? 'noopener noreferrer' : undefined}
        sx={{ flexShrink: 0, display: 'block' }}
      >
        <Box
          component="img"
          src={avatar}
          alt={org.name}
          loading="lazy"
          onError={(event) => {
            if (fallbackAvatar && event.currentTarget.src !== fallbackAvatar) {
              event.currentTarget.src = fallbackAvatar
            }
          }}
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'var(--bg-2)',
            border: '1px solid var(--ptk-line-soft)',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box
          sx={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: 16,
            color: 'var(--fg-1)',
            letterSpacing: '-0.005em',
            mb: 0.25,
          }}
        >
          {primary ? (
            <Link href={primary} target="_blank" rel="noopener noreferrer" underline="none" sx={{ color: 'inherit' }}>
              {org.name}
            </Link>
          ) : (
            org.name
          )}
        </Box>
        {org.title && org.title !== org.name && (
          <Box
            sx={{
              fontFamily: 'var(--ff-mono)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              mb: 0.5,
            }}
          >
            {org.title}
          </Box>
        )}
        {org.description && (
          <Box sx={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.55, mb: 1 }}>
            {org.description}
          </Box>
        )}
        <SocialRow links={org.links} />
      </Box>
    </Box>
  )
}

function getOrganizationImage(org: Organization): string {
  return org.image || getHuggingFaceThumbnail(org.links.homepage) || getGitHubOrganizationImage(org) || `https://github.com/${org.id}.png?size=160`
}

function getHuggingFaceThumbnail(homepage: string | undefined): string | undefined {
  if (!homepage) return undefined

  try {
    const url = new URL(homepage)
    if (url.hostname !== 'huggingface.co') return undefined

    const namespace = url.pathname.split('/').filter(Boolean)[0]
    if (!namespace) return undefined

    return `https://cdn-thumbnails.huggingface.co/social-thumbnails/${encodeURIComponent(namespace)}.png`
  } catch {
    return undefined
  }
}

function getGitHubOrganizationImage(org: Organization): string | undefined {
  if (!org.links.github) return undefined
  return `${org.links.github.replace(/\/+$/, '')}.png?size=160`
}

function SocialRow({ links }: { links: MemberLinks }): React.ReactNode {
  const entries: Array<{ href: string; label: string; icon: React.ReactNode }> = []
  if (links.github) entries.push({ href: links.github, label: 'GitHub', icon: <GitHubIcon sx={{ fontSize: 16 }} /> })
  if (links.linkedin) entries.push({ href: links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon sx={{ fontSize: 16 }} /> })
  if (links.twitter) entries.push({ href: links.twitter, label: 'Twitter', icon: <TwitterIcon sx={{ fontSize: 16 }} /> })
  if (links.facebook) entries.push({ href: links.facebook, label: 'Facebook', icon: <FacebookIcon sx={{ fontSize: 16 }} /> })
  if (links.homepage) entries.push({ href: links.homepage, label: 'Homepage', icon: <LanguageIcon sx={{ fontSize: 16 }} /> })
  if (entries.length === 0) return null
  return (
    <Box sx={{ display: 'flex', gap: 0.5, mt: 'auto', flexWrap: 'wrap' }}>
      {entries.map((e) => (
        <Box
          key={e.href}
          component="a"
          href={e.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={e.label}
          sx={{
            display: 'inline-grid',
            placeItems: 'center',
            width: 28,
            height: 28,
            color: 'var(--fg-3)',
            border: '1px solid var(--ptk-line-soft)',
            transition: 'color 120ms ease, border-color 120ms ease',
            '&:hover': { color: 'var(--ptk-orange)', borderColor: 'var(--ptk-orange)' },
          }}
        >
          {e.icon}
        </Box>
      ))}
    </Box>
  )
}

function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead: string
}): React.ReactNode {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ptk-orange)',
          mb: 1.5,
        }}
      >
        {eyebrow}
      </Box>
      <Typography
        component="h1"
        sx={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 300,
          fontSize: 'clamp(34px, 5vw, 52px)',
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          color: 'var(--fg-1)',
          mb: 2.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 16, md: 18 },
          lineHeight: 1.65,
          color: 'var(--fg-2)',
          width: '100%',
        }}
      >
        {lead}
      </Typography>
    </Box>
  )
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}): React.ReactNode {
  return (
    <Box component="section" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ mb: 3, pb: 1.5, borderBottom: '2px solid var(--fg-1)' }}>
        <Box
          sx={{
            fontFamily: 'var(--ff-mono)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ptk-orange)',
            mb: 0.75,
          }}
        >
          {eyebrow}
        </Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: { xs: 24, md: 32 },
            letterSpacing: '-0.015em',
            color: 'var(--fg-1)',
            lineHeight: 1.1,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ '& > * + *': { mt: 2 } }}>{children}</Box>
    </Box>
  )
}

function P({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <Typography component="p" sx={{ my: 0.75, fontSize: 16, lineHeight: 1.75, color: 'var(--fg-1)' }}>
      {children}
    </Typography>
  )
}
