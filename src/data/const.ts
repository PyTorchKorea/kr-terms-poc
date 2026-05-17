export const REPO_URL = 'https://github.com/PyTorchKorea/kr-terms-poc'
export const CONTACT_EMAIL = 'contact@terms.kr'

export const NEW_TERM_URL = createIssueUrl('new-term.yml')
export const FEEDBACK_URL = createIssueUrl('term-feedback.yml')
export const ORGANIZATION_JOIN_URL = createIssueUrl('organization-join.yml')

export const DATA_TREE_URL = `${REPO_URL}/tree/poc/data`
export const ISSUES_URL = `${REPO_URL}/issues`
export const LICENSE_URL = `${REPO_URL}/blob/poc/LICENSE`
export const NEW_TERM_ISSUES_URL = `${REPO_URL}/issues?q=label:"새 용어 요청"`
export const FEEDBACK_ISSUES_URL = `${REPO_URL}/issues?q=label:"용어 피드백"`

export const CONTACT_EMAIL_URL = CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : undefined

export function getNewTermUrl(term: string): string {
  return createIssueUrl('new-term.yml', `[새 용어] ${term}`)
}

export function getFeedbackUrl(term: string): string {
  return createIssueUrl('term-feedback.yml', `[용어 피드백] ${term}`)
}

export function getIssueUrl(issueNumber: number): string {
  return `${ISSUES_URL}/${issueNumber}`
}

function createIssueUrl(template: string, title?: string): string {
  const params = new URLSearchParams({ template })
  if (title) params.set('title', title)
  return `${REPO_URL}/issues/new?${params.toString()}`
}
