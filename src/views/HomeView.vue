<template>
  <div class="card__wrapper">
    <div class="card" @click="openProductPage(product.id)" v-for="product in allProducts" :key="product.id">
      <img class="card__image untouchable" :src="product.image" alt="image"/>
      <span v-html="product.name"/>
      <span class="card__price" v-html="convertPrice(product.price) + ' ₽'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {productStore} from "@/stores/productStore";
import {storeToRefs} from "pinia";
import {useRouter} from "@/use/router";
import {useNumberDelimiter} from '@/use/number';
import {computed} from "vue";
import {cartStore} from "@/stores/cartStore";

const store = productStore();

const {allProducts} = storeToRefs(store);
const {router} = useRouter();
const convertPrice = (price: number) => useNumberDelimiter(price);

const openProductPage = (id: number) => {
  router.push({
    name: 'show',
    params: {
      itemId: id
    }
  })
};
</script>

<style scoped lang="scss">


.card {
  padding: 12px;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  &__price {
    padding-top: 10px;
    font-weight: 700;
    font-size: 21px;
  }

  &__image {
    border-radius: 3px;
    width: 100%;
    height: 100%;
    align-self: end;
  }

  &__wrapper {
    display: grid;
    padding: 40px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px 50px;
    background-color: #ffffff;
  }
}

</style>