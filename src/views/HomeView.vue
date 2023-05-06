<template>
  <div class="card__wrapper">
    <div class="card" @click="openProductPage(product.id)" v-for="product in allProducts" :key="product.id">
      <img class="card__image untouchable" :src="product.image" alt="image"/>
      <span class="card__product" v-html="product.name"/>
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
  padding: 20px;
  width: 100%;
  height: 100%;
  background: #fff;
  backdrop-filter: blur(4.6px);
  -webkit-backdrop-filter: blur(4.6px);
  border: 1px solid rgb(11, 168, 173);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease;

  -webkit-animation: shadow-drop-2-center-out 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: shadow-drop-2-center-out 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

  &__product {
    padding-top: 20px;
    font-size: 15px;
    font-weight: 600;
  }

  &__price {
    margin-top: auto;
    padding-top: 20px;
    font-weight: 700;
    font-size: 21px;
  }

  &__image {
    width: 100%;
    height: auto;
    align-self: center;
    //border-bottom: solid 2px rgba(0, 0, 0, 0.25);
  }

  &__wrapper {
    display: grid;
    padding: 40px;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 50px;
    background-color: #ffffff;
  }
}

.card::after {
  content: "Подробнее";
  padding-top: 1.25em;
  text-align: center;
  position: absolute;
  right: 0;
  bottom: -10px;
  font-weight: 700;
  background-color: #0ba8ad;
  color: #fff;
  height: 2.5em;
  width: 50%;
  transition: all 0.4s ease-in-out;
  font-size: 14px;
  text-transform: uppercase;
  opacity: 0;
}

.card:hover::after {
  bottom: 0;
  opacity: 1;
}

.card:hover {
  -webkit-animation: shadow-drop-2-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: shadow-drop-2-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes shadow-drop-2-center {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
    transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}
@keyframes shadow-drop-2-center {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
    transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}

@-webkit-keyframes shadow-drop-2-center-out {
  0% {
    -webkit-transform: translateZ(50px);
    transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
  100% {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
}
@keyframes shadow-drop-2-center-out {
  0% {
    -webkit-transform: translateZ(50px);
    transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
  100% {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
}

</style>