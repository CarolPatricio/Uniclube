<script lang="ts">
import { defineComponent } from 'vue';
import CarItem from './CarItem.vue';
import type { CartItem } from '../types/carItem'; 

export default defineComponent({
  name: "Sidebar",
  components: { CarItem },
  props: {
    isOpen: { type: Boolean, required: true }
  },
  emits: ["close-sidebar", "update-quantity", "remove-item"],
  data() {
    return {
      cartItems: [
        { title: "Bolsa Feminina Sacola Grande Matelassê Preto de telinha e couro lorem ipsum dolot sit amet conseqde Jabuti", img: "item-1", value: 195, oldPrice: 200, quantity: 1, description: "G, Azul", category: "Carrinho", shippingCost: "R$ 43,00", deliveryDate: "**Hoje**, 27 de Junho" },
        { title: "Brinquedo de Atividades Bebê Box ", img: "item-2", value: 99, quantity: 1, availability: "Disponível em 10 dias", category: "Carrinho", shippingCost: "R$ 43,00", deliveryDate: "**Hoje**, 27 de Junho" },
        { title: "Lençol Elástico Avulso 300 Fios Casa Rio Bege Claro", img: "item-3", value: 35, quantity: 1, description: "Queen, Bege", category: "Carrinho", shippingCost: "R$ 43,00", deliveryDate: "**Hoje**, 27 de Junho" },
        { title: "Mouse logitech usb bluetooth sem fio adaptador", img: "item-4", value: 99, quantity: 1, category: "Eletrônicos", shippingCost: "Frete grátis", deliveryDate: "**Terça-Feira**, 5 de Novembro" },
        { title: "Voucher Univacinas Hepatite A", img: "item-5", value: 99, quantity: 1, category: "Serviços", shippingCost: "Frete grátis", deliveryDate: "" }
      ],
      zipCode: "",
      shippingDetail: { zip: "Calcule fretes e prazos", price: "---" },
      isShippingOpen: false,
      expandedCategories: [] as string[]
    };
  },
  computed: {
    groupedItems(): Record<string, CartItem[]> {
      return this.cartItems.reduce((acc: Record<string, CartItem[]>, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});
    },
    formattedDeliveryDate() {
      return (items: CartItem[]) => {
        return items[0].deliveryDate
          ? items[0].deliveryDate.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          : this.getDeliveryDate();
      };
    }
  },
  methods: {
    closeSidebar() {
      this.$emit("close-sidebar");
    },
    formatZipCode() {
      this.zipCode = this.zipCode.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
    },
    toggleShipping() {
      this.isShippingOpen = !this.isShippingOpen;
    },
    setShippingDetail() {
      if (this.zipCode.length === 9) {
        this.shippingDetail = { zip: this.zipCode, price: "R$ 43,00" };
      }
    },
    updateQuantity(category: string, index: number, change: number) {
      const items = this.cartItems.filter(item => item.category === category);
      if (items[index].quantity + change >= 1) {
        items[index].quantity += change;
      }
    },
    removeItem(title: string) {
      this.cartItems = this.cartItems.filter(item => item.title !== title);
    },
    getDeliveryDate() {
      const today = new Date();
      today.setDate(today.getDate() + 5);
      return today.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    },
    toggleCategoryDetails(category: string) {
      if (this.expandedCategories.includes(category)) {
        this.expandedCategories = this.expandedCategories.filter(cat => cat !== category);
      } else {
        this.expandedCategories.push(category);
      }
    }
  }
});
</script>

<template>
    <div class="sidebar-overlay" v-if="isOpen" @click="closeSidebar"></div>
    <div class="sidebar" :class="{ 'open': isOpen }">
        <div class="sidebar-content">
            <i class="bi bi-x close-button" @click="closeSidebar"></i>
            <div class="menu-header d-flex align-items-center justify-content-start">
                <img class="logo" src="/logo-minimalista.svg" alt="">
                <img class="status" src="/src/assets/images/status-bar.png" alt="">
            </div>
            <div class="info d-flex align-items-center justify-content-start my-4">
                <h2>Carrinho</h2>
                <span>({{ Object.values(groupedItems).flat().length }} itens)</span>
            </div>
            <div v-if="Object.keys(groupedItems).length > 0" class="items">
              <div v-for="([category, items]) in Object.entries(groupedItems)" :key="category" class="category-group">
                  <div class="category-items" @click="toggleCategoryDetails(category)">
                      <CarItem 
                        v-for="(item, index) in items"
                        :key="index"
                        :img="item.img"
                        :title="item.title"
                        :value="item.value"
                        :oldPrice="item.oldPrice"
                        :availability="item.availability"
                        :quantity="item.quantity"
                        :description="item.description"
                        :category="item.category"
                        :shippingCost="item.description"
                        :deliveryDate="item.deliveryDate"
                        @update-quantity="updateQuantity(category, index, $event)"
                        @remove-item="removeItem"
                      />
                    </div>
                    <div v-if="expandedCategories.includes(category)" class="category-details">
                      <div class="d-flex align-items-center justify-content-between w-100">
                        <p v-html="formattedDeliveryDate(items)"></p>
                        <a href="/" class="link-underline">Alterar</a>
                      </div>
                      <p> {{ items[0].shippingCost }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="empty-cart">
                <p>O carrinho está vazio.</p>
            </div>
        </div>
        <div class="checkout-section w-100">
            <div class="checkout-section-content">
                <div class="shipping-box">
                    <div class="shipping-box-toggle w-100" @click="toggleShipping">
                        <div class="toggle-btn d-flex align-items-center justify-content-between w-100">
                            <div>
                                <svg class="me-2" width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1H16.2525V11.6586" stroke="#F47920" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9.2688 13.9636H14.0639" stroke="#F47920" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.77754 6.8396H2.8551V13.9639H5.2899" stroke="#F47920" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16.5656 4.32568H19.0923L22 7.40545V14.0334H18.3172" stroke="#F47920" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16.2534 15.9998C17.2788 15.9998 18.1101 15.1194 18.1101 14.0332C18.1101 12.9471 17.2788 12.0667 16.2534 12.0667C15.2279 12.0667 14.3966 12.9471 14.3966 14.0332C14.3966 15.1194 15.2279 15.9998 16.2534 15.9998Z" stroke="#F47920" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7.15191 15.9998C8.17737 15.9998 9.00866 15.1194 9.00866 14.0332C9.00866 12.9471 8.17737 12.0667 7.15191 12.0667C6.12646 12.0667 5.29517 12.9471 5.29517 14.0332C5.29517 15.1194 6.12646 15.9998 7.15191 15.9998Z" stroke="#F47920" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1.96045 4.03345H6.57167" stroke="#F47920" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>{{ shippingDetail.zip }}</span>
                                <i class="bi ms-2" :class="isShippingOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                            </div>
                            <span id="detail">{{ shippingDetail.price }}</span>
                        </div>
                    </div>

                    <div class="shipping-content w-100" v-show="isShippingOpen">
                        <input class="w-100 p-3" type="text" v-model="zipCode" placeholder="Digite seu CEP" maxlength="9" @input="formatZipCode" />
                        <i class="bi bi-arrow-right icon" @click="setShippingDetail"></i>
                    </div>
                </div>

                <div class="order-summary ">
                    <div class="summary-line w-100 d-flex align-items-center justify-content-between">
                        <span>Subtotal</span>
                        <span>R$ 439,90</span>
                    </div>
                </div>
            </div>
            <button class="proceed-btn">
                PROSSEGUIR 
                <i class="bi bi-arrow-right"></i>
            </button>
        </div>
    </div>
  </template>


<style lang="scss">
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100%;
  background: $background-menu!important;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  background-color: $background-light;
  border-top: 8px solid $primary;

  @media(max-width: 399px){
    width: auto;
  }

  &-content{
    padding: 2rem;
    flex: 1;
    overflow-y: auto; 
    overflow-x: hidden;
    height: 100vh;


    .items{
      max-height: calc(100vh - 300px);  
      overflow-y: auto; 
      overflow-x: auto; 
      white-space: nowrap; 
      display: flex;
      flex-direction: column;
      gap: 1rem;
      cursor: pointer;

      .category-details {
        background-color: $background-menu;
        padding: 1rem 1.5rem;
        font-size: 1.4rem;
        color: $secondary;
        border-radius: 0 0 5px 5px; 
        border-top: none;
        border: 1px solid #E5E5E5; 
        border-top: none;
        overflow: hidden;
        position: relative;
        bottom: 2rem;

        a{
          color: $secondary;
          text-decoration: underline!important;
        }
      }
    }

    .close-button {
      color: $border-gray;
      font-size: 1.5rem;
      position: absolute;
      top: 5px;
      right: 10px;
      background: none;
      border: none;
      cursor: pointer;
    }
    .menu-header{
      gap: 1rem;
  
      .logo{
          width: 45px;
      }
      .status {
          width: 25rem;
      }
    }
    .info{
      gap: .5rem;
        h2{
          color: $primary;
          font-size: 3rem;
        }
        span{
          font-size: 1.4rem;
          color: $secondary;
        }
  
    }
    .category-items{
        background-color: #FFF;
        border-radius: 5px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
    }
  }

  &.open {
    right: 0;
  }

  .checkout-section {
    bottom: 0;
    position: absolute;
    background: $background-menu!important;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);

    &-content{
        padding: 1.5rem;

        .shipping-box {
          &-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .toggle-btn {
                color: $secondary;
                font-size: 1.6rem;
                cursor: pointer;

                .detail{
                    color: $secondary;
                }
            }
          }
          .shipping-content{
            padding: 1rem;
            position: relative;
            display: inline-block;

            input{
                border: 1px solid transparent;
                border-radius: 3rem;
                color: $border-gray!important;
                font-size: 1.4rem;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            }

            .icon {
                position: absolute;
                top: 50%;
                right: 2rem; 
                transform: translateY(-50%);
                font-size: 1.6rem; 
                color: $primary; 
                cursor: pointer;
            }
          }
        }
        .order-summary {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #E5E5E5; 

          .summary-line{
            font-size: 1.6rem;
            color: $secondary;
            font-weight: 500;
          }
        }
    }

  .proceed-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1.6rem;
    color: white;
    background: $primary;
    border: none;
    font-weight: bold;
    margin-top: 1.5rem;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    &:hover {
      background: darken($primary, 10%);
    }

    i {
      font-size: 1.8rem;
    }
  }
}
}

</style>
