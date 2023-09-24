import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    removeAllItems: () => void;
    updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>()(persist(
        (set, get) => ({
            items: [],
            // handle duplicate items increment quantity
            addItem: (item: CartItem) => set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id)
                if (existingItem) {
                    return {
                        items: state.items.map((i) => i.id === item.id ? {
                            ...i,
                            quantity: i.quantity + item.quantity
                        } : i)
                    }
                }
                return {items: [...state.items, item]}
            }),
            removeItem: (id: string) => set((state) => ({items: state.items.filter((i) => i.id !== id)})),
            removeAllItems: () => set({items: []}),
            updateQuantity: (id: string, quantity: number) => set((state) => ({
                items: state.items.map((i) => i.id === id ? {
                    ...i,
                    quantity
                } : i)
            })),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
            partialize: (state) => ({items: state.items}),
        }
    )
)

