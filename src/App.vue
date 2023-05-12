<template>
  <div>
    <div class="header">
      <div class="content header-content">
        <a class="header__logo-link" @click="goPageMain"> Диксис </a>
        <div class="header__right">
          <a class="pointer header__cart" @click="goCart">
            <span>Корзина</span>
            <div class="header__badge" v-if="allCount">{{ allCount }}</div>
          </a>
        </div>
      </div>
    </div>

    <div class="content">
      <RouterView/>
    </div>

  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import {useRouter} from "@/use/router";
import {cartStore} from "@/stores/cartStore";
import {computed} from "vue";

const cartsStore = cartStore();

const cart = cartsStore.getCart;

const allCount = computed(() => {
  let sum = 0;
  cart.object.forEach((el) => sum += el.count);

  return sum;
});

const {router} = useRouter();

const goPageMain = () => {
  router.push({ name: 'home' })
};

const goCart = () => {
  router.push({ name: 'cart' })
};
</script>

<style scoped lang="scss">

.header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
}

.header {
  width: 100vw;
  overflow: hidden;
  background-color: rgb(82, 196, 148);
  padding: 10px 5px;
  margin-bottom: 50px;
  box-shadow: 3px 11px 11px 11px rgba(166, 166, 166, 0.12), 0 6px 10px 7px rgba(0, 0, 0, 0.07);

  &__logo {
    height: 45px;
    float: left;

    &-link {
      font-size: 25px;
      font-weight: bold;
      cursor: pointer;
    }
  }

  &__right {
    float: right;
  }

  &__cart {
    position: relative;
  }

  &__badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #0ba8ad;
    width: 22px;
    height: 22px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 100%;
  }
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(221, 221, 221, 0.47);
    color: black;
  }
}

.content {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}
</style>
