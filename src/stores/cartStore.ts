import {defineStore} from "pinia"
import type {TCart} from '@/types/TCart';
import type {TProduct} from "@/types/TProduct";

type  State = {
    cart: TCart
}

export const cartStore = defineStore({
    id: 'cart',
    state: (): State => {
        return {
            cart: {
                object: []
            }
        }
    },
    getters: {
        getCart({cart}): TCart {
            return cart
        },
    },
    actions: {
        //функция добавления продукта в корзину
        addItemToCart(item: TProduct) {
            const cartItem = this.cart.object.find((el) => el.id === item.id);

            if (cartItem) {
                cartItem.count++;
                return;
            }

            this.cart.object.push({id: item.id, count: 1});
        },
        //функция удаления продукта из корзины
        removeItemFromCart(item: TProduct) {
            //получаем продукт из корзины
            const cartItem = this.cart.object.find((el) => el.id === item.id);
            //если он там есть заходим в функцию
            if (cartItem) {
                //уменьшаем число данных товарав на 1
                cartItem.count--;
                //если товаров осталось 0
                if (cartItem.count === 0) {
                    //удаляем запись о данном товаре из корзины
                    this.cart.object.splice(this.cart.object.indexOf(cartItem), 1);
                }
            }
        },
        //очистка корзины
        clearCart() {
            this.cart.object = [];
        },
    },
    persist: true,
});