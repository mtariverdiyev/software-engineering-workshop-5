import { useState } from 'react'
import { formatPrice, meals, type MealId } from './meals'
import './StaffScreen.css'

type StaffScreenProps = {
  cartCount: number
  onAddMeal: (mealId: MealId) => void
  onOpenCart: () => void
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 8 2.5 2.5L12 5" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 3h2l1.6 8.1a1.5 1.5 0 0 0 1.5 1.2h6.2a1.5 1.5 0 0 0 1.5-1.2L16 6H5" />
      <circle cx="7.5" cy="15" r="1" />
      <circle cx="13" cy="15" r="1" />
    </svg>
  )
}

function StaffScreen({
  cartCount,
  onAddMeal,
  onOpenCart,
}: StaffScreenProps) {
  const [activeTab, setActiveTab] = useState<'lunch' | 'admin'>('lunch')
  const [selectedMealId, setSelectedMealId] = useState('miso-noodles')
  const [addedToCart, setAddedToCart] = useState(false)
  const selectedMeal = meals.find((meal) => meal.id === selectedMealId)

  return (
    <main className="staff-screen">
      <header className="staff-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span className="brand-name">MealMate</span>
        </div>
        <span className="profile-initials">MT</span>
      </header>

      <nav className="staff-tabs" aria-label="Staff navigation">
        <button
          aria-pressed={activeTab === 'lunch'}
          className={`staff-tab${activeTab === 'lunch' ? ' staff-tab-active' : ''}`}
          onClick={() => setActiveTab('lunch')}
          type="button"
        >
          My lunch
        </button>
        <button
          aria-pressed={activeTab === 'admin'}
          className={`staff-tab${activeTab === 'admin' ? ' staff-tab-active' : ''}`}
          onClick={() => setActiveTab('admin')}
          type="button"
        >
          Admin
        </button>
      </nav>

      <section className="staff-content">
        <p className="staff-date">Thursday, October 8</p>
        <h1>Good morning, Murad</h1>
        <p className="staff-subtitle">Choose your lunch for today.</p>

        <div className="cutoff-notice">
          <span className="notice-check" aria-hidden="true">
            <CheckIcon />
          </span>
          <span>
            <strong>Order by 10:30</strong>
            <small>You can change your choice until the cutoff.</small>
          </span>
        </div>

        <div className="menu-heading">
          <h2>Today’s menu</h2>
          <button
            aria-label={`Cart, ${cartCount} items`}
            className="cart-count"
            onClick={onOpenCart}
            type="button"
          >
            <CartIcon />
            <span>Cart</span>
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>

        <div className="meal-list" role="radiogroup" aria-label="Today’s menu">
          {meals.map((meal) => (
            <button
              aria-checked={selectedMealId === meal.id}
              className={`meal-card${selectedMealId === meal.id ? ' meal-card-selected' : ''}`}
              key={meal.name}
              onClick={() => {
                setSelectedMealId(meal.id)
                setAddedToCart(false)
              }}
              onKeyDown={(event) => {
                const isPreviousKey =
                  event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                const isNextKey =
                  event.key === 'ArrowRight' || event.key === 'ArrowDown'

                if (!isPreviousKey && !isNextKey) {
                  return
                }

                event.preventDefault()
                const currentIndex = meals.findIndex((item) => item.id === selectedMealId)
                const offset = isPreviousKey ? -1 : 1
                const nextIndex = (currentIndex + offset + meals.length) % meals.length
                setSelectedMealId(meals[nextIndex].id)
                setAddedToCart(false)
                event.currentTarget.parentElement
                  ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
                  [nextIndex]?.focus()
              }}
              role="radio"
              tabIndex={selectedMealId === meal.id ? 0 : -1}
              type="button"
            >
              <span
                className={`meal-selector${selectedMealId === meal.id ? ' meal-selector-selected' : ''}`}
                aria-hidden="true"
              >
                {selectedMealId === meal.id && <CheckIcon />}
              </span>
              <span className="meal-copy">
                <strong>{meal.name}</strong>
                <small>{meal.description}</small>
              </span>
              <strong className="meal-price">{formatPrice(meal.price)}</strong>
            </button>
          ))}
        </div>

        <button
          className="order-button"
          disabled={!selectedMeal || addedToCart}
          onClick={() => {
            if (selectedMeal) {
              onAddMeal(selectedMeal.id)
              setAddedToCart(true)
            }
          }}
          type="button"
        >
          <span>
            {addedToCart
              ? 'Added to order'
              : `Add ${selectedMeal?.name ?? 'meal'} to order`}
          </span>
          <span aria-hidden="true">→</span>
        </button>

        <section className="spending-card" aria-label="October spending">
          <div className="spending-topline">
            <span>October spending</span>
            <span className="lunch-count">12 lunches</span>
          </div>
          <strong className="spending-amount">$126.50</strong>
          <div
            className="spending-progress"
            role="img"
            aria-label="Monthly total, 126 dollars and 50 cents of 120 dollar budget"
          >
            <span />
          </div>
          <div className="spending-footer">
            <span>Monthly total</span>
            <span>$120 budget</span>
          </div>
        </section>
      </section>
    </main>
  )
}

export default StaffScreen
