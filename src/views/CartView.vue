<template>
  <div>
    <div class="cart">
      <div class="cart__element cart-element" v-for="item in cart.object" :key="item.id">
        <div class="cart-element__image">
          <img alt="img" :src="productsStore.getProductById(item.id).image" />
        </div>
        <div class="cart-element__title">{{ productsStore.getProductById(item.id).name }}</div>
        <div class="cart-element__right">
          <div class="cart-element__buttons">
            <div class="cart-element__button untouchable" @click="removeItemFromCart(productsStore.getProductById(item.id))">-</div>
            <div class="cart-element__count">{{ item.count }}</div>
            <div class="cart-element__button untouchable" @click="addItemToCart(productsStore.getProductById(item.id))">+</div>
          </div>
          <div class="cart-element__price">{{ productsStore.getProductById(item.id).price * item.count + ' ₽' }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span class="footer__sum" v-html="'Общая стоимость: ' + allPrice + ' ₽'" />
      <div class="footer__next" @click="router.push({ name: 'checkout' })">Оформить</div>
    </div>
  </div>
</template>

<script setup>
import { cartStore } from '@/stores/cartStore';
import { productStore } from "@/stores/productStore";
import { computed, ref, watch } from "vue";
import { useRouter } from "@/use/router";

const { router } = useRouter();

const store = cartStore();

const cart = store.getCart;

const productsStore = productStore();

if (cart.object.length < 1) {
  router.push({ name: 'home' });
}

watch(cart.object, () => {
  if (cart.object.length < 1) {
    router.push({ name: 'home' });
  }
});

const addItemToCart = (product) => {
  store.addItemToCart(product);
};

const removeItemFromCart = (product) => {
  store.removeItemFromCart(product);
};

const allPrice = computed(() => {
  let sum = 0;
  cart.object.forEach((el) => sum += (productsStore.getProductById(el.id).price) * el.count);

  return sum;
});
</script>

<style scoped lang="scss">
.cart {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &__sum {
    font-weight: 700;
  }

  &__next {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    --color: #560bad;
    font-family: inherit;
    width: 8em;
    height: 2.6em;
    line-height: 2.5em;
    margin: 20px;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--color);
    transition: color .5s;
    z-index: 1;
    font-size: 17px;
    border-radius: 6px;
    font-weight: 500;
    color: var(--color);

    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      background: var(--color);
      height: 150px;
      width: 200px;
      border-radius: 50%;
    }

    &:hover {
      color: #fff;
    }

    &:before {
      top: 100%;
      left: 100%;
      transition: all .7s;
    }

    &:hover:before {
      top: -30px;
      left: -30px;
    }

    &:active:before {
      background: #3a0ca3;
      transition: background 0s;
    }
  }
}

.cart-element {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  border: 1px #242424 solid;
  border-radius: 8px;
  padding: 20px;
  justify-content: space-between;

  &__image {
    & img {
      width: 100px;
    }
  }

  &__right {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
  }

  &__button {
    background: bisque;
    padding: 15px;
    border-radius: 5px;
    width: 6px;
    height: 6px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }
}
</style>