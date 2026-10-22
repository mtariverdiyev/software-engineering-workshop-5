export const meals = [
  {
    id: 'herb-chicken',
    name: 'Herb chicken bowl',
    description: 'Roast chicken, greens, lemon rice',
    price: 11.5,
  },
  {
    id: 'miso-noodles',
    name: 'Miso sesame noodles',
    description: 'Soba, edamame, cucumber, sesame',
    price: 10,
  },
  {
    id: 'vegetable-focaccia',
    name: 'Roasted vegetable focaccia',
    description: 'Peppers, courgette, pesto, mozzarella',
    price: 9.5,
  },
] as const

export type MealId = (typeof meals)[number]['id']

export function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`
}
