import { formatPrice, meals, type MealId } from './meals'
import './CartScreen.css'

type CartScreenProps = {
  quantities: Record<MealId, number>
  onBack: () => void
  onQuantityChange: (mealId: MealId, quantity: number) => void
}

function CartScreen({
  quantities,
  onBack,
  onQuantityChange,
}: CartScreenProps) {
  const cartItems = meals.filter((meal) => quantities[meal.id] > 0)
  const mealCount = cartItems.reduce(
    (count, meal) => count + quantities[meal.id],
    0,
  )
  const orderTotal = cartItems.reduce(
    (total, meal) => total + meal.price * quantities[meal.id],
    0,
  )

  return (
    <main className="cart-screen">
      <header className="cart-header">
        <div className="cart-brand">
          <span className="cart-brand-mark" aria-hidden="true">
            M
          </span>
          <span className="cart-brand-name">MealMate</span>
        </div>
        <span className="cart-profile-initials">MT</span>
      </header>

      <nav className="cart-tabs" aria-label="Staff navigation">
        <button className="cart-tab" onClick={onBack} type="button">
          My lunch
        </button>
        <span className="cart-tab">Admin</span>
      </nav>

      <section className="cart-content">
        <button className="cart-back" onClick={onBack} type="button">
          <span aria-hidden="true">←</span> Back to menu
        </button>

        <p className="cart-eyebrow">Today’s order</p>
        <h1>Your cart</h1>
        <p className="cart-description">
          Increase quantities or remove meals before 10:30.
        </p>

        <section className="cart-items" aria-label="Items in your cart">
          {cartItems.length > 0 ? (
            cartItems.map((meal) => {
              const quantity = quantities[meal.id]
              const lineTotal = meal.price * quantity

              return (
                <article className="cart-item" key={meal.id}>
                  <div className="cart-item-heading">
                    <div>
                      <h2>{meal.name}</h2>
                      <p>{formatPrice(meal.price)} each</p>
                    </div>
                    <strong>{formatPrice(lineTotal)}</strong>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control" aria-label={`Quantity: ${quantity}`}>
                      <span className="quantity-value">{quantity}</span>
                      <button
                        aria-label={`Add one ${meal.name}`}
                        className="quantity-increase"
                        onClick={() => onQuantityChange(meal.id, quantity + 1)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${meal.name} from cart`}
                      className="cart-remove"
                      onClick={() => onQuantityChange(meal.id, 0)}
                      type="button"
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3 4h10M6 4V2.5h4V4m2 0-.6 9H4.6L4 4m2.5 2.5v4m3-4v4" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </article>
              )
            })
          ) : (
            <p className="cart-empty">Your cart is empty.</p>
          )}
        </section>

        <section className="cart-total" aria-label="Order total">
          <div className="cart-total-caption">
            <span>{mealCount} {mealCount === 1 ? 'meal' : 'meals'}</span>
            <span>Today</span>
          </div>
          <div className="cart-total-amount">
            <span>Order total</span>
            <strong>{formatPrice(orderTotal)}</strong>
          </div>
        </section>
      </section>
    </main>
  )
}

export default CartScreen
