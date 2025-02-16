<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CarItem',
  props: {
    img: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: Number, required: true },
    oldPrice: { type: Number, required: false },
    availability: { type: String, required: false },
    quantity: { type: Number, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true},
    shippingCost: { type: String, required: true, default: "" },
    deliveryDate: { type: String, required: false, default: "" }
  },
  emits: ['update-quantity', 'remove-item'],
  computed: {
    imageSrc(): string {
      return new URL(`/src/assets/images/${this.img}.jpg`, import.meta.url).href;
    },
    formattedValue(): string {
      return `R$ ${this.value.toFixed(2).replace('.', ',')}`;
    },
    formattedOldPrice(): string | null {
      return this.oldPrice ? `R$ ${this.oldPrice.toFixed(2).replace('.', ',')}` : null;
    }
  }
});
</script>

<template>
  <div class="car-item w-100">
    <img :src="imageSrc" class="car-img" :alt="title"/> 
    <div class="car-item-body h-100">
      <h5 class="car-title" :title="title">{{ title }}</h5>
      <p v-if="description" class="car-description">{{ description }}</p>
      <p v-if="availability" class="car-availability">{{ availability }}</p>

      <div class="content-box w-100">
        <div class="quantity-controls d-flex align-items-center justify-content-start">
          <button class="quantity-btn" @click.stop="$emit('update-quantity', -1)">
            <i class="bi bi-dash"></i>
          </button>

          <span class="quantity-value">{{ quantity }}</span>
          <button class="quantity-btn" @click.stop="$emit('update-quantity', 1)">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <div class="car-pricing">
          <p v-if="formattedOldPrice" class="old-price">{{ formattedOldPrice }}</p>
          <p class="current-price">{{ formattedValue }}</p>
        </div>
      </div>
    </div>
    <i class="bi bi-trash3 delete-btn" @click="$emit('remove-item', title)"></i>
  </div>
</template>

<style lang="scss">
.car-item {
  padding: 2rem;
  position: relative;
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1rem;
  align-items: center;

  p{
    margin: 0;
  }

  &:not(:last-child) {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -1rem;
      left: 50%;
      width: 80%; 
      height: 1px;
      background-color: #E5E5E5; 
      transform: translateX(-50%);
    }
  }

  img {
    width: 7rem;
  }

  &-body{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;

    .car-img {
      width: 60px;
      height: 60px;
      object-fit: contain;
      border-radius: 5px;
    }

    .car-title {
      font-size: 1.6rem;
      line-height: 1.8rem;
      font-weight: 600;
      color: $text-font-primary;
      display: -webkit-box;
      -webkit-line-clamp: 2; 
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis; 
      white-space: normal;
      max-width: 20rem;
      
    }

    .car-availability {
      font-size: 0.85rem;
      color: $text-font-red;
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 1.4rem;
      position: relative;
      bottom: .5rem;
    }

    .car-description{
      font-size: 0.85rem;
      color: $secondary;
      font-size: 1.4rem;
      line-height: 1.4rem;
      position: relative;
      bottom: .5rem;
    }

    .car-pricing {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.4rem;
      line-height: 1.4rem;
      color: $text-font-primary;

      .old-price {
        text-decoration: line-through!important;
      }

      .current-price {
        font-weight: 600;
      }
    }
    .content-box{
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .quantity-controls{
        font-size: 1.4rem;
        gap: .7rem;
        button {
          width: 2.5rem;               
          height: 2.5rem;              
          padding: 0;                
          border: 1px solid $primary;  
          border-radius: 50%;       
          background-color: transparent;       
          color: $primary;           
          display: flex;             
          align-items: center;     
          justify-content: center;   
          cursor: pointer;          
          transition: all 0.3s ease;
        }
      }
    }
  }

  .delete-btn {
    font-size: 1.4rem;
    cursor: pointer;
    color: $secondary;
    position: absolute;
    top: 15px;
    right: 15px;
  }
}
</style>
