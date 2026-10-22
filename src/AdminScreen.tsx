import { meals, type MealId } from './meals'
import './AdminScreen.css'

type AdminScreenProps = {
  demoTime: string
  isMenuPublished: boolean
  onDemoTimeChange: (time: string) => void
  onNavigateToStaff: () => void
  onTogglePublished: () => void
}

const orderCounts: Record<MealId, number> = {
  'herb-chicken': 8,
  'miso-noodles': 6,
  'vegetable-focaccia': 4,
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  )
}

function AdminScreen({
  demoTime,
  isMenuPublished,
  onDemoTimeChange,
  onNavigateToStaff,
  onTogglePublished,
}: AdminScreenProps) {
  const totalOrders = Object.values(orderCounts).reduce(
    (total, quantity) => total + quantity,
    0,
  )

  return (
    <main className="admin-screen">
      <header className="admin-header">
        <div className="admin-brand">
          <span className="admin-brand-mark" aria-hidden="true">
            M
          </span>
          <span className="admin-brand-name">MealMate</span>
        </div>
        <span className="admin-profile-initials">MT</span>
      </header>

      <nav className="admin-tabs" aria-label="Staff navigation">
        <button className="admin-tab" onClick={onNavigateToStaff} type="button">
          My lunch
        </button>
        <span
          aria-current="page"
          className="admin-tab admin-tab-active"
        >
          Admin
        </span>
      </nav>

      <section className="admin-content">
        <p className="admin-date">Thursday, October 8</p>
        <h1>Lunch admin</h1>
        <p className="admin-subtitle">
          Publish today’s menu and track orders.
        </p>

        <label className="demo-clock-card">
          <span className="demo-clock-icon">
            <ClockIcon />
          </span>
          <span className="demo-clock-copy">
            <strong>Demo clock</strong>
            <small>Sets the staff ordering state</small>
          </span>
          <input
            aria-label="Demo clock time"
            className="cutoff-time-input"
            onChange={(event) => onDemoTimeChange(event.target.value)}
            type="time"
            value={demoTime}
          />
        </label>

        <div className="admin-menu-heading">
          <div>
            <h2>Today’s menu</h2>
            <p>Staff can order until 10:30</p>
          </div>
          <span
            className={`publish-status${isMenuPublished ? ' publish-status-live' : ''}`}
          >
            {isMenuPublished ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="admin-menu-list">
          {meals.map((meal, index) => (
            <article className="admin-menu-item" key={meal.id}>
              <span className="menu-number">{index + 1}</span>
              <span className="admin-menu-name">{meal.name}</span>
              <span className="admin-menu-price">
                <span aria-hidden="true">$</span>
                {meal.price.toFixed(2).replace(/\.00$/, '')}
              </span>
            </article>
          ))}
        </div>

        <button
          aria-pressed={isMenuPublished}
          className="publish-button"
          onClick={onTogglePublished}
          type="button"
        >
          {isMenuPublished ? 'Menu is live' : 'Publish menu'}
          <span aria-hidden="true">{isMenuPublished ? '✓' : '→'}</span>
        </button>

        <div className="order-summary-heading">
          <div>
            <h2>Order summary</h2>
            <p>Live totals for the kitchen</p>
          </div>
          <strong>{totalOrders}</strong>
        </div>

        <div className="admin-order-list">
          {meals.map((meal) => (
            <article
              className="admin-order-item"
              key={meal.id}
            >
              <span className="order-quantity">{orderCounts[meal.id]}</span>
              <span className="admin-menu-name">{meal.name}</span>
              <span className="order-chevron" aria-hidden="true">
                ›
              </span>
            </article>
          ))}
        </div>

        <div className="kitchen-cutoff">
          <span>Kitchen cutoff</span>
          <span>10:30 today</span>
        </div>
      </section>
    </main>
  )
}

export default AdminScreen
