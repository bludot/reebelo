import {create} from 'zustand'

export interface CartItem {
    id: string;
    qauntity: number;
    price: number;
}

export interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    removeAllItems: () => void;
}

const useCartStore = create<CartStore>((set) => ({
    items: [],
    addItem: (item: CartItem) => set((state) => ({items: [...state.items, item]})),
    removeItem: (item: CartItem) => set((state) => ({items: state.items.filter((i) => i.id !== item.id)})),
    removeAllItems: () => set({items: []}),
}))