import { useState } from 'react'
import AdminScreen from './AdminScreen'
import CartScreen from './CartScreen'
import StaffScreen from './StaffScreen'
import WelcomeScreen from './WelcomeScreen'
import type { MealId } from './meals'

type Screen = 'welcome' | 'staff' | 'cart' | 'admin'

const ORDER_CUTOFF = '10:30'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(
    'welcome',
  )
  const [quantities, setQuantities] = useState<Record<MealId, number>>({
    'herb-chicken': 0,
    'miso-noodles': 0,
    'vegetable-focaccia': 0,
  })
  const [userName, setUserName] = useState('')
  const [demoTime, setDemoTime] = useState('10:30')
  const [isMenuPublished, setIsMenuPublished] = useState(true)
  const canOrder = isMenuPublished && demoTime !== '' && demoTime < ORDER_CUTOFF
  const cartCount = Object.values(quantities).reduce(
    (count, quantity) => count + quantity,
    0,
  )

  function updateQuantity(mealId: MealId, quantity: number) {
    setQuantities((current) => {
      if (quantity > current[mealId] && !canOrder) return current
      return { ...current, [mealId]: quantity }
    })
  }

  function addMeal(mealId: MealId) {
    if (!canOrder) return

    setQuantities((current) => ({
      ...current,
      [mealId]: current[mealId] + 1,
    }))
  }

  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen
        onContinue={(name) => {
          setUserName(name)
          setCurrentScreen('staff')
        }}
      />
    )
  }

  if (currentScreen === 'cart') {
    return (
      <CartScreen
        canAddItems={canOrder}
        onBack={() => setCurrentScreen('staff')}
        onNavigateToAdmin={() => setCurrentScreen('admin')}
        onQuantityChange={updateQuantity}
        quantities={quantities}
        userName={userName}
      />
    )
  }

  if (currentScreen === 'admin') {
    return (
      <AdminScreen
        demoTime={demoTime}
        isMenuPublished={isMenuPublished}
        onDemoTimeChange={setDemoTime}
        onNavigateToStaff={() => setCurrentScreen('staff')}
        onTogglePublished={() =>
          setIsMenuPublished((published) => !published)
        }
      />
    )
  }

  return (
    <StaffScreen
      cartCount={cartCount}
      onAddMeal={addMeal}
      canOrder={canOrder}
      isMenuPublished={isMenuPublished}
      isPastCutoff={demoTime === '' || demoTime >= ORDER_CUTOFF}
      onNavigateToAdmin={() => setCurrentScreen('admin')}
      onNavigateToStaff={() => setCurrentScreen('staff')}
      onOpenCart={() => setCurrentScreen('cart')}
      userName={userName}
    />
  )
}

export default App
