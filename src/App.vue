<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from './components/Header.vue';
import Card from './components/Card.vue';
import DepartamentButton from './components/DepartamentButton.vue';
import Carousel from './components/Carousel.vue';
import Sidebar from './components/Sidebar.vue';

// Importando as interfaces
import type { Department } from './types/department';
import type { Product } from './types/product';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Card,
    DepartamentButton,
    Carousel,
    Sidebar,
  },
  setup() {
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return { isSidebarOpen, toggleSidebar };
  },
  data() {
    return {
      departments: [
        { text: 'Arte, Papelaria **e Armarinhos**', icon: 'departament-icon' },
        { text: 'Saúde', icon: 'icon-button-2' },
        { text: 'Calçados, **Roupas e Bolsas**', icon: 'icon-button-3' },
        { text: 'Bebês', icon: 'icon-button-4' },
        { text: 'Casa, Móveis e **Decoração**', icon: 'icon-button-5' },
        { text: 'Esportes e **Fitness**', icon: 'icon-button-6' },
        { text: 'Beleza e **Cuidado Pessoal**', icon: 'icon-button-7' },
        { text: 'Imóveis', icon: 'icon-button-8' },
        { text: 'Óculos', icon: 'icon-button-9' },
        { text: 'Serviços', icon: 'icon-button-10', class: 'default-hover' },
      ] as Department[], 
      products: [
        {
          img: 'card-image-1',
          title: 'Garrafa de areia colorida',
          value: 32.90,
          discount: true,
          percentage: 10,
          installments: '**3x R$ 6,33 sem juros** no cartão ou **R$ 18,50 no Pix**',
          seller: 'Sr. Castanha',
        },
        {
          img: 'card-image-2',
          title: 'Bolsas variadas de fibra de Açaí',
          value: 49.90,
          additionalText: "A partir de",
          discount: false,
          installments: '**2x R$ 24,95 sem juros** no cartão ou **R$ 35,50 no Pix**',
          seller: 'Dandara',
          class: "default-hover",
        },
        {
          img: 'card-image-3',
          title: 'Galinha e pintinhos de barro feitas a mão',
          value: 14.90,
          discount: true,
          percentage: 10,
          installments: 'ou **R$ 13,00 no Pix**',
          seller: 'Patrícia Arte',
        },
        {
          img: 'card-image-4',
          title: 'Panelas de barro de São Gonçado do Amarante',
          value: 29.90,
          additionalText: "Apenas",
          discount: false,
          installments: '**2x R$ 16,95** no cartão ou **R$ 23,90 no Pix**',
          seller: 'Sebastião Salgado',
          class: "default-hover",
        },
        {
          img: 'card-image-5',
          title: 'Artesanato de bonecas negras feitas com cabaça',
          value: 9.90,
          additionalText: "A partir de",
          discount: false,
          installments: 'ou **2x R$ 7,45** no cartão',
          seller: 'Manu Intimates',
        },
      ] as Product[],
    };
  },
});
</script>

<template>
  <Header @toggle-sidebar="toggleSidebar" />
  <div class="container">
    <section class="banner container">
      <Carousel/>
    </section>
    <section class="departaments">
      <nav class="departaments-content my-5">
        <DepartamentButton 
          v-for="(department, index) in departments" 
          :key="index"
          :text="department.text" 
          :icon="department.icon"
          :class="department.class" 
        />
      </nav>
    </section>
    <section class="unimed-natal card-group w-100 p-5 my-5">
      <div class="unimed-natal-bg"></div> <!-- 🔹 Nova camada de fundo -->
      <h1 class="w-100 mb-5 ms-4">Descontos cliente <span>Unimed Natal</span></h1>
      <div class="unimed-natal-cards w-100 p-2">
        <Card
          v-for="(product, index) in products"
          :key="index"
          :img="product.img"
          :title="product.title"
          :value="product.value"
          :additionalText="product.additionalText"
          :discount="product.discount"
          :percentage="product.percentage"
          :installments="product.installments"
          :seller="product.seller"
          :class="product.class"
        />
      </div>
    </section>
  </div> 
  <Sidebar :isOpen="isSidebarOpen" @close-sidebar="toggleSidebar" />
</template>

<style lang="scss">
.container{
  @media (max-width: 770px) {
    max-width: 100%!important;
    padding-right: 2rem !important;
    padding-left: 2rem !important;
  }
  .banner{
    @media (max-width: 570px) {
      padding: 2rem; 
    }
  }
  .departaments{
     &-content{
      display: grid;
      grid-template-columns: repeat(10, 1fr);

      @media (max-width: 992px) {
        grid-template-columns: repeat(5, 1fr); 
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
  .unimed-natal {
    position: relative;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    h1{
      color: #FFF;
      font-weight: 300;
      display: inline-block;
      justify-items: start;
      span{
        font-weight: bold;
      }
    }

    &-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("/src/assets/images/unimed_natal.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        z-index: -1;
    }

    &-cards {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        width: 100%;
        min-height: 100%; 
        justify-content: center; 
        place-items: center; 

        @media (max-width: 1224px) {
          grid-template-columns: repeat(4, 1fr);
        }
    
        @media (max-width: 990px) {
          grid-template-columns: repeat(3, 1fr);
        }
    
        @media (max-width: 770px) {
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }
    }
  }
}
</style>




