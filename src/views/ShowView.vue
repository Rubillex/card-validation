<template>
  <div>
    <div class="item-block">
        <img class="untouchable item-block__image" :src="product?.image" alt="image"/>
        <span class="item-block__name" v-html="product?.name"/>
        <span class="item-block__price" v-html="convertPrice(product?.price) + ' ₽'"/>
        <span class="item-block__description" v-html="product?.description"/>
    </div>
    <template v-if="!itemInCart">
      <span class="item-block__button" @click="addItemToCart">Купить</span>
    </template>
    <template v-else>
      <div class="item-block__footer">
        <span class="item-block__button untouchable" @click="removeItemFromCart">-</span>
        <span class="untouchable">{{ cart.object.find((el) => el.id === product?.id).count }}</span>
        <span class="item-block__button untouchable" @click="addItemToCart">+</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from '@/use/router';
import {computed} from 'vue';
import {productStore} from '@/stores/productStore';
import {cartStore} from '@/stores/cartStore';
import {useNumberDelimiter} from "@/use/number";

const {router} = useRouter();

const itemId = computed(() => parseInt(router.currentRoute.value.params.itemId));
const productsStore = productStore();

const product = productsStore.getProductById(itemId.value);

const cartsStore = cartStore();

const cart = cartsStore.getCart;

const convertPrice = (price: number) => useNumberDelimiter(price);

const itemInCart = computed(() => {
  return !!cart.object.find((el) => el.id === product?.id);
});

const addItemToCart = () => {
    if (product) {
        cartsStore.addItemToCart(product);
    }
};

const removeItemFromCart = () => {
    if (product) {
        cartsStore.removeItemFromCart(product);
    }
};
</script>

<style scoped lang="scss">

.item-block {
  padding: 12px;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "image name" "image price" "image ." "desc desc";

  &__name {
    grid-area: name;
    font-size: 21px;
    font-weight: 600;
    color: #000;
    font-style: normal;
    margin-left: auto;
    margin-right: auto;
  }

  &__price {
    grid-area: price;
    font-size: 21px;
    font-weight: 600;
    color: #000;
    font-style: normal;
    padding-top: 24px;
  }

  &__image {
    grid-area: image;
    border-radius: 3px;
    width: 60%;
    margin: 25px auto;
  }

  &__description {
    grid-area: desc;
    margin-left: auto;
    margin-right: auto;
    font-size: 21px;
    font-weight: 300;
    color: #000;
    font-style: normal;
  }

  &__button {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    --color: #560bad;
    font-family: inherit;
    max-width: 8em;
    min-width: 2rem;
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

  &__footer {
    display: flex;
    flex-direction: row;
    gap: 5px;

    align-items: center;
  }
}
</style>