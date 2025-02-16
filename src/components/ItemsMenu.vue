<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemsMenu',
  data() {
    return {
        menuSections: [
        {
            title: "Saúde e Bem-estar",
            items: ["Beleza", "Cuidados Pessoais", "Esportes e Aventura"],
        },
        {
            title: "Casa",
            items: ["Casa, Jardim e Limpeza", "Móveis e Decoração", "Construção"],
        },
        {
            title: "Estilo",
            items: ["Vestuário", "Calçados", "Bijuterias e Acessórios"],
        },
        {
            title: "Tincidunt",
            items: ["Tempor", "Consequat"],
        },
        {
            title: "Eletro",
            items: ["Eletrodomésticos", "Celulares, Tablets e Acessórios", "Câmeras e Acessórios"],
        },
        {
            title: "Ipsum Lorem",
            items: ["Sit Amet", "Consequat", "Pellentesque"],
        }
      ], 
      moreDepartments: [
        "Petshop",
        "Produtos Regionais",
        "Brinquedos e Jogos",
        "Livros",
        "Música e Hobbies",
        "Bebês",
        "Alimentos e Bebidas",
        "Agro e Indústria",
     ]
    };
  },
});
</script>

<template>
    <div class="menu-container w-100 p-5">
      <div class="menu-container-grid">
        <div class="menu-container-column" v-for="(section, index) in menuSections" :key="index">
          <h3>{{ section.title }}</h3>
          <ul class="links m-0 p-0">
            <li class="ms-3 mb-4" v-for="(item, itemIndex) in section.items" :key="itemIndex">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
          <a href="/" class="view-more">
              Ver mais
              <i class="bi bi-chevron-down mx-2"></i>
          </a>
        </div>
      </div>
      <div class="menu-container-column more-departments">
          <h3>Mais Departamentos</h3>
          <ul class="links m-0 p-0" >
            <li class="ms-3 mb-4" v-for="(item, index) in moreDepartments" :key="index">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
          <a href="/" class="view-all">Ver todos os departamentos</a>
        </div>
    </div>
  </template>
  
  <style lang="scss">
  .menu {
      &-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 2rem;
        color: $secondary !important;
        font-size: 1.8rem !important;

      a {
          margin: 0!important;
          justify-content: flex-start!important;
          color: $secondary!important;
  
          &.view-all, &.view-more {
              font-size: 1.4rem!important;
              margin-top: 2rem;
          }
  
          &.view-all{
              text-decoration: underline!important;
          }
  
          &:hover{
              color: $text-font-primary;
              font-weight: 500;
          }
      }
  
      h3 {
          font-weight: bold;
          margin-bottom: 2rem;
      }
  
      ul {
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: center;
  
          li{
              &:hover{
                  color: $text-font-primary;
                  font-weight: 500;
              }
          }
      }

      @media (max-width: 992px) {
        .more-departments {
          margin-top: 1.5rem;
        }
      }
  
      &-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr); 
          grid-template-rows: repeat(2, auto); 
          gap: 2rem; 

          @media (max-width: 480px) {
            grid-template-columns: repeat(2, 1fr);
          }
  
          &-column {
          background-color: #f8f9fa;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          min-width: 200px; 
        }
       }
      }
  }
  </style>
  