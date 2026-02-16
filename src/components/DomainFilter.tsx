import { Box, Chip } from '@mui/material'
import { getDomainColor } from '../utils/domainColors'

interface DomainFilterProps {
  domains: string[]
  selectedDomains: string[]
  onDomainToggle: (domain: string) => void
}

export function DomainFilter({ domains, selectedDomains, onDomainToggle }: DomainFilterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mb: 3,
      }}
    >
      {domains.map((domain) => {
        const isSelected = selectedDomains.includes(domain)
        return (
          <Chip
            key={domain}
            label={domain}
            onClick={() => onDomainToggle(domain)}
            variant={isSelected ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: isSelected ? getDomainColor(domain) : 'transparent',
              borderColor: getDomainColor(domain),
              color: isSelected ? 'white' : getDomainColor(domain),
              fontWeight: isSelected ? 600 : 400,
              '&:hover': {
                backgroundColor: isSelected ? getDomainColor(domain) : `${getDomainColor(domain)}15`,
              },
            }}
          />
        )
      })}
    </Box>
  )
}
