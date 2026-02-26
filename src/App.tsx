import { type FC } from 'react'
import { AppShell } from './components/layout/AppShell'
import { CRTOverlay } from './components/ui/CRTOverlay'

export const App: FC = () => (
  <>
    <AppShell />
    <CRTOverlay />
  </>
)
