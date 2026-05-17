/**
 * Affiliated PyTorchKR channels and external resources.
 * Individual maintainer roster is not duplicated here — refer to the GitHub
 * organization for an authoritative, up-to-date list.
 */

export interface PartnerOrg {
  name: string
  href: string
  description: string
}

export const PARTNER_ORGS: PartnerOrg[] = [
  {
    name: '파이토치 한국 사용자 모임',
    href: 'https://pytorch.kr',
    description: '본 프로젝트를 운영하는 한국 PyTorch 커뮤니티의 공식 사이트',
  },
  {
    name: 'PyTorch 한국어 튜토리얼',
    href: 'https://tutorials.pytorch.kr',
    description: 'PyTorch 공식 튜토리얼의 한국어 번역 — 본 용어집의 주된 활용처',
  },
  {
    name: 'PyTorch 한국 사용자 모임 (Discuss)',
    href: 'https://discuss.pytorch.kr',
    description: '질문과 토론이 오가는 커뮤니티 포럼',
  },
  {
    name: 'PyTorchKorea GitHub Organization',
    href: 'https://github.com/PyTorchKorea',
    description: '오픈소스 저장소 모음 — 관리자 목록과 활동 이력은 여기에서 확인',
  },
]
