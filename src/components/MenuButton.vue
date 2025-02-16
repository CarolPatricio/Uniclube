<template>
    <div class="menu-content p-5">
      <div class="menu-content-button" v-for="index in 9" :key="index">
        <img src="/src/assets/images/img-button-menu-1.png" alt="">
        <p class="m-0" style="white-space: pre-line;">Lorem Ipsum</p>
      </div>
      <div class="menu-content-button">
        <img src="/src/assets/images/img-button-menu-2.png" alt="">
        <p class="m-0" style="white-space: pre-line;">Ver mais empresas</p>
      </div>
    </div>
  </template>
  
  <style lang="scss">
  .menu-content{
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 1rem;
    background-color: $background-menu;
    border-radius: 0 0 var(--bs-dropdown-border-radius) var(--bs-dropdown-border-radius);

    @media (max-width: 1200px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 992px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    &-button{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      
        img{
            width: 9rem;
            height: 9rem;
            object-fit: contain; 

            @media (max-width: 768px) {
              width: 6rem;
              height: 6rem;
            }

            @media (max-width: 480px) {
              width: 5rem;
              height: 5rem;
            }

        }
        p{
            font-size: 1.6rem;
            color: $secondary;
            text-align: center;

            @media (max-width: 768px) {
              font-size: 1.2rem;
            }
        }
    }

  }
  </style>
  