import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Size } from '@/lib/pricing';

export type CartItem = {
    key: string;
    productId: number;
    name: string;
    imageUrl: string;
    size: Size;
    toppings: string[];
    unitPrice: number;
    qty: number;
};
type NewItem = Omit<CartItem, 'key' | 'qty'>;

type State = {
    items: CartItem[];
    add: (i: NewItem, qty?: number) => void;
    setQty: (key: string, qty: number) => void;
    remove: (key: string) => void;
    clear: () => void;
};

export const useCart = create<State>()(
    persist(
        (set) => ({
            items: [],
            add: (i, qty = 1) =>
                set((s) => {
                    const key = `${i.productId}|${i.size}|${[...i.toppings].sort().join(',')}`;
                    const found = s.items.find((x) => x.key === key);
                    return found
                        ? { items: s.items.map((x) => (x.key === key ? { ...x, qty: x.qty + qty } : x)) }
                        : { items: [...s.items, { ...i, key, qty }] };
                }),
            setQty: (key, qty) =>
                set((s) => ({
                    items:
                        qty <= 0
                            ? s.items.filter((x) => x.key !== key)
                            : s.items.map((x) => (x.key === key ? { ...x, qty } : x)),
                })),
            remove: (key) => set((s) => ({ items: s.items.filter((x) => x.key !== key) })),
            clear: () => set({ items: [] }),
        }),
        { name: 'brewlite-cart' },
    ),
);

export const cartTotal = (items: CartItem[]) =>
    items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
export const cartCount = (items: CartItem[]) =>
    items.reduce((s, i) => s + i.qty, 0);