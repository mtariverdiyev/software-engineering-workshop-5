import { useState } from 'react'
import CartScreen from './CartScreen'
import StaffScreen from './StaffScreen'
import WelcomeScreen from './WelcomeScreen'
import type { MealId } from './meals'

type Screen = 'welcome' | 'staff' | 'cart'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(
    'welcome',
  )
  const [quantities, setQuantities] = useState<Record<MealId, number>>({
    'herb-chicken': 3,
    'miso-noodles': 1,
    'vegetable-focaccia': 1,
  })
  const cartCount = Object.values(quantities).reduce(
    (count, quantity) => count + quantity,
    0,
  )

  function updateQuantity(mealId: MealId, quantity: number) {
    setQuantities((current) => ({ ...current, [mealId]: quantity }))
  }

  function addMeal(mealId: MealId) {
    setQuantities((current) => ({
      ...current,
      [mealId]: current[mealId] + 1,
    }))
  }

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onContinue={() => setCurrentScreen('staff')} />
  }

  if (currentScreen === 'cart') {
    return (
      <CartScreen
        onBack={() => setCurrentScreen('staff')}
        onQuantityChange={updateQuantity}
        quantities={quantities}
      />
    )
  }

  return (
    <StaffScreen
      cartCount={cartCount}
      onAddMeal={addMeal}
      onOpenCart={() => setCurrentScreen('cart')}
    />
  )
}

export default App
