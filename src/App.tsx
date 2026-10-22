import { useState } from 'react'
import StaffScreen from './StaffScreen'
import WelcomeScreen from './WelcomeScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'staff'>(
    'welcome',
  )

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onContinue={() => setCurrentScreen('staff')} />
  }

  return <StaffScreen />
}

export default App
