import { useTranslation as useNextTranslation } from 'next-i18next'

export function useTranslation() {
  const { t } = useNextTranslation('common')
  return { t, loading: false }
}
