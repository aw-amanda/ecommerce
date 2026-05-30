import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
    id: string
    name: string
    price: number
    image: string | null
    quantity: number
}

interface CartStore {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    clearCart: () => void
}

export const useCartStore = create<CartStore>()(
    persist((set) => ({
        items: [],
        addItem: (item) => set((state) => {
            const existing = state.items.find((i) => i.id === item.id)

            if(existing) {
                return {
                    items: state.items.map((i) => 
                        i.id === item.id 
                            ? {...i, quantity: i.quantity + item.quantity} 
                            : i
                    ),
                }
            }

            return {items: [...state.items, item]}
        }),

        removeItem: (id) => set((state) => {
            const existingItem = state.items.find((item) => item.id === id)
            if (existingItem && existingItem.quantity === 1) {
                return {
                    items: state.items.filter((item) => item.id !== id)
                }
            }
            return {
                items: state.items.map((item) => item.id === id 
                    ? {...item, quantity: item.quantity - 1} 
                    : item
                ),
            }
        }),
        clearCart: () => set(() => {
            return {items: [] }
        }),
    }), {name: "cart"})
)