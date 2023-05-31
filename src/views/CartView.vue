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
            <div class="cart-element__button cart-element__button--remove untouchable" @click="removeAllItemFromCart(productsStore.getProductById(item.id))">удалить</div>
          </div>
          <div class="cart-element__price">{{ productsStore.getProductById(item.id).price * item.count + ' ₽' }}</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer__next" @click="togglePopup">Оформить за {{ allPrice + ' ₽' }}</div>
    </div>

    <CommonPopup @close-popup="togglePopup" :is-visible="popupVisible">
      <CheckoutView/>
    </CommonPopup>
  </div>
</template>

<script setup>
import { cartStore } from '@/stores/cartStore';
import { productStore } from "@/stores/productStore";
import { computed, ref, watch } from "vue";
import { useRouter } from "@/use/router";
import CommonPopup from "@/views/CommonPopup.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import axios from "axios";

const { router } = useRouter();

const store = cartStore();

const cart = store.getCart;

const productsStore = productStore();

const popupVisible = ref(false);

const togglePopup = async () => {


    axios.get('http://95.163.237.54:3456/pay')
        .then((res) => {
            const token = res.data.token;

            const paymentData = {
                token,
                service_name: 'Товар',
                pay_amount: allPrice.value,
            };

            axios.post('http://95.163.237.54:3456/invoice', paymentData)
                .then((res) => {
                    if (res.data.result !== 'fail') {
                        window.open(res.data.invoice_url, '_self');
                        store.clearCart();
                    }
                });
        });
};


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

const removeAllItemFromCart = (product) => {
    store.removeAllItemFromCart(product);
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
  justify-content: center;

  &__sum {
    font-weight: 700;
  }

  &__next {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    --color: #0ba8ad;
    font-family: inherit;
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
    width: fit-content;
    padding: 0 5px;
  }
}

.cart-element {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 20px;
  justify-content: space-between;
  width: 100%;

  &__image {
    width: 15%;
    & img {
      width: 200px;
      height: auto;
    }
  }

  &__right {
    margin-left: auto;
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
  }

  &__title {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
  }

  &__button {
    background: rgb(11, 168, 173);
    color: white;
    padding: 15px;
    border-radius: 5px;
    width: 6px;
    height: 6px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &--remove {
      width: fit-content;
    }
  }
}
</style>