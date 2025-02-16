
<script lang="ts">
import HeaderButton from './HeaderButton.vue';
import ItemsMenu from './ItemsMenu.vue';
import MenuButton from './MenuButton.vue';

export default {
  name: "Header",
  components: {
    HeaderButton,
    ItemsMenu,
    MenuButton,
  },
  emits: ["toggle-sidebar"],
  data() {
    return {
      menu_buttons: [
        {
          text: "**Onde** você está?",
          icon: "local-icon",
          alt: "Botão de localização",
          clickable: false
        },
        {
          text: "**Faça login** ou cadastre-se",
          icon: "login-icon",
          alt: "Botão de login e cadastro",
          clickable: false
        },
        {
          icon: "car-icon",
          alt: "Botão de carrinhos de compras",
          clickable: true
        },
      ],
    };
  },
};

</script>

<template>
    <div class="header">
        <div class="header-top p-4">
            <div class="header-top-content container">
                <div class="logo">
                    <img src="/logo.svg" alt="" >
                </div>
                <div class="search w-100">
                    <input 
                        type="text" 
                        class="w-100 p-3"
                        placeholder="O que você gostaria de ver hoje?"
                    >
                    <i class="bi bi-search search-icon p-1"></i>
                </div>
                <nav>
                    <HeaderButton
                        v-for="(menu_button, index) in menu_buttons" 
                        :key="index"
                        :text="menu_button.text" 
                        :icon="menu_button.icon"
                        :alt="menu_button.alt"
                        :clickable="menu_button.clickable"
                        @toggle-sidebar="$emit('toggle-sidebar')"
                    />
                </nav>
            </div>
        </div>
        <div class="header-bottom p-3">
            <div class="header-bottom-content container">
                <div class="buttons">
                    <nav style="--bs-breadcrumb-divider: '|';" aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"> 
                                <div class="dropdown">  
                                    <a class="fw-bold dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-list mx-2"></i>
                                        Departamentos
                                        <i class="bi bi-chevron-down mx-2 mt-1"></i>
                                    </a>
                                    <div class="dropdown-menu m-0 p-0 border-0" aria-labelledby="dropdownMenuButton1">
                                        <ItemsMenu/>
                                        <MenuButton/>
                                    </div>
                                </div>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page"> 
                                <a href="/">
                                    <img class="mx-2" src="@/assets/images/e-icon.svg" alt="Ícone">
                                    Desconto Cliente Unimed Natal
                                </a>
                            </li>
                        </ol>
                    </nav>       
                </div>
                <p class="info m-0">Venda no Uniclube</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .header{
        font-size: 1.8rem;

        &-top{
            background-color: $background-light;
            border-top: 8px solid $primary;

        &-content{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;

            @media (max-width: 992px) {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .logo img {
                max-width: 150px; 
            }

            .search{
                position: relative;
                display: inline-block;
    
                input{
                    border: 1px solid transparent;
                    border-radius: 3rem;
                    color: $border-gray;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
    
                &-icon {
                    position: absolute;
                    top: 50%;
                    right: 2rem; 
                    transform: translateY(-50%);
                    font-size: 1.6rem; 
                    color: $border-gray; 
                }
            }
    
            nav{
                display: flex;
                gap: 1rem; 
                justify-content: center;

                @media (max-width: 480px) {
                    flex-wrap: wrap;
                }
            }
        }

        }
        &-bottom{
            background-color: $background-light-40;
           
            &-content{
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: $text-font-primary;

                .dropdown{
                    cursor: pointer;
                    &-toggle::after{
                        display: none;
                    }
                }

                .breadcrumb-item + .breadcrumb-item::before{
                    color: $background-light;

                    @media (max-width: 768px) {
                        display: none;
                    }
                }

                .buttons {
                    display: flex;
                    align-items: center;
                    a {
                        color: $text-font-primary;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 1rem 0 1rem;
    
                        i, img{
                            color: $primary;
                        }

                        img {
                            width: 1.6rem;
                        }
                    }
                }
                .info{
                    font-size: 1.6rem;
                    color: $secondary;
                }
            }
        }
    }
</style>
  