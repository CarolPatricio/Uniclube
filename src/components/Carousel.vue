<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Carousel',
  methods: {
    imageSrc(img: string): string {
      return new URL(`/src/assets/images/${img}.jpg`, import.meta.url).href;
    },
  },
  data() {
    return {
      carousel_banners: [
        { img: 'banner-1', alt: 'Banner 1', active: true },
        { img: 'banner-2', alt: 'Banner 2', active: false },
      ],
    };
  },
});

</script>

<template>
    <div id="carouselInterval" class="carousel slide mt-5" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(banner, index) in carousel_banners"
          :key="index"
          class="carousel-item"
          :class="{ active: banner.active }"
          data-bs-interval="10000"
        >
          <img :src="imageSrc(banner.img)" class="d-block w-100" :alt="banner.alt" />
        </div>
      </div>
      <button
        class="carousel-control-prev custom-prev-btn"
        type="button"
        data-bs-target="#carouselInterval"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next custom-next-btn"
        type="button"
        data-bs-target="#carouselInterval"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </template>

<style lang="scss">
    #carouselInterval {
      position: relative;
      max-width: 100%;

      img {
        max-width: 100%;
        height: auto;
        object-fit: cover; 

        @media (max-width: 992px){
          height: 20rem;
        }

        @media (max-width: 768px){
          height: 15rem;
        }
      }

    .carousel-control-prev,
    .carousel-control-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2.8rem;
        height: 6.3rem;
        background-color: $primary;
        border-radius: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;

        &:hover{
            background-color: $primary!important;
            opacity: 1;
        }

        &.custom-prev-btn {
        left: -1.5rem; 
        }
        &.custom-next-btn {
        right: -1.5rem; 
        }

        &:hover {
        background-color: rgba(0, 0, 0, 0.7);
        }
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        width: 1.5rem;
        height: 1.5rem;
    }
    }
</style>