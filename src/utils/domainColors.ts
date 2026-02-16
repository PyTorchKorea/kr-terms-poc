const domainColorMap: Record<string, string> = {
  '딥러닝': '#1976d2',
  '머신러닝': '#2e7d32',
  '강화학습': '#9c27b0',
  '자연어처리': '#d32f2f',
  '컴퓨터비전': '#f57c00',
  '신경망': '#0288d1',
  '인공지능': '#5e35b1',
  '데이터과학': '#00796b',
  '최적화': '#c2185b',
  '통계학': '#455a64',
}

export function getDomainColor(domain: string): string {
  return domainColorMap[domain] || '#757575'
}
