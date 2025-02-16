<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    img: {
      type: String as () => string,
      required: true,
    },
    title: {
      type: String as () => string,
      required: true,
    },
    value: {
      type: Number as () => number,
      required: true,
    },
    additionalText: {
      type: String as () => string,
      required: false,
      default: undefined
    },
    discount: {
      type: Boolean,
      required: true,
    },
    percentage: {
      type: Number as () => number,
      required: false,
      default: 0
    },
    installments: {
      type: String as () => string,
      required: true,
    },
    seller: {
      type: String as () => string,
      required: true,
    },
    class: {
      type: String as () => string,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      isDefaultHover: this.class.includes('default-hover'),
      customClass: this.class || '',
    };
  },
  computed: {
    imageSrc(): string {
      return new URL(`/src/assets/images/${this.img}.jpg`, import.meta.url).href;
    },
    formattedValue(): string {
      return `R$ ${this.value.toFixed(2).replace('.', ',')}`;
    },
    discountedValue(): string {
      if (this.discount && this.percentage > 0) {
        const discountedPrice = this.value - (this.value * this.percentage) / 100;
        return `R$ ${discountedPrice.toFixed(2).replace('.', ',')}`;
      }
      return this.formattedValue;
    },
    formattedText(): string {
      return this.installments?.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') || '';
    }
  },
  watch: {
    class(newValue: string) {
      this.isDefaultHover = newValue.includes('default-hover');
    }
  },
  methods: {
    toggleHover() {
      this.isDefaultHover = !this.isDefaultHover;

      if (this.isDefaultHover) {
        this.customClass = 'default-hover';
      } else {
        this.customClass = this.customClass.replace('default-hover', '').trim();
      }
    }
  }
});
</script>

<template>
    <div class="card" style="width: 20rem;">
      <div class="content-img">
        <img :src="imageSrc" class="card-img-top" :alt="title"/> 
        <div class="svg" :class="[customClass, {'default-hover': isDefaultHover } ]"  @click="toggleHover">
          <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_655)">
            <circle cx="14" cy="14" r="13" fill="white"/>
            </g>
            <path d="M22.0474 13.3589C21.9919 13.6571 21.953 13.959 21.8778 14.2523C21.6791 15.0283 21.2801 15.7143 20.782 16.3495C20.0131 17.3295 19.0782 18.1579 18.1134 18.9567C16.9759 19.8982 15.8325 20.8331 14.6894 21.7686C14.2507 22.1277 13.7789 22.1434 13.3559 21.7944C11.869 20.5678 10.3781 19.3445 8.90887 18.0984C8.15379 17.458 7.47504 16.744 6.92221 15.931C5.93065 14.4735 5.6619 12.9124 6.28989 11.2714C6.85807 9.78736 7.96138 8.81628 9.61752 8.51215C11.3343 8.19717 12.7169 8.78228 13.8151 10.0403C13.8686 10.1016 13.9182 10.1658 13.9701 10.2282C13.9764 10.2357 13.9859 10.2409 14.0115 10.2611C14.0709 10.189 14.1295 10.1158 14.1905 10.0444C14.8271 9.30313 15.6031 8.76024 16.5958 8.53681C18.3267 8.14673 20.1642 8.83422 21.1637 10.2327C21.6571 10.9236 21.9306 11.6858 22.0187 12.5126C22.0242 12.5661 22.0372 12.6187 22.047 12.6718C22.0474 12.9008 22.0474 13.1299 22.0474 13.3589ZM14.0004 21.1421C14.0398 21.1122 14.0689 21.092 14.0961 21.0696C15.2733 20.1037 16.4545 19.142 17.6259 18.1698C18.475 17.4655 19.2943 16.7309 19.9793 15.8738C20.518 15.1998 20.937 14.4708 21.0543 13.6167C21.2129 12.4588 20.9669 11.3977 20.176 10.4808C19.0188 9.1391 16.6592 8.78938 15.1608 10.3605C14.9334 10.5989 14.741 10.8679 14.5411 11.1291C14.436 11.2662 14.3219 11.382 14.1413 11.4205C13.8674 11.4788 13.6443 11.3854 13.4681 11.1223C13.2135 10.7424 12.9172 10.399 12.5643 10.0956C11.1954 8.91829 9.05878 9.1264 7.91573 10.3986C6.77072 11.6731 6.62631 13.131 7.2724 14.6644C7.59426 15.4281 8.13883 16.0577 8.72197 16.6547C9.57856 17.5324 10.5355 18.3081 11.4873 19.0886C12.3199 19.7708 13.1545 20.4508 14.0004 21.1421Z" fill="#00995D"/>
            <defs>
            <filter id="filter0_d_1_655" x="0.5" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="0.5"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_655"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_655" result="shape"/>
            </filter>
            </defs>
          </svg>
        </div>
      </div>
    <div class="card-body my-1">
        <h5 class="card-title" v-html="title"></h5>
        <div class="text" v-if="discount">
          <div class="text-discount-box d-flex align-items-center justify-content-start">
            <span class="text-discount-box-value">{{ formattedValue }}</span>
            <span class="text-discount-box-percentage">{{ percentage }}% OFF</span>
          </div>
          <p class="text-value m-0">{{ discountedValue }}</p>
        </div>
        <div class="text" v-else>
          <p class="text-info m-0">{{ additionalText }}</p>
          <p class="text-value m-0">{{ formattedValue }}</p>
        </div>
        <p class="text-payment m-0" v-html="formattedText" :title="installments"></p>
        <p class="text-seller ms-3 m-0 mt-5">Vendido por <span>{{ seller }}</span></p>
    </div>
    </div>
</template>

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 380px;
    max-width: 100%;
    width: 100%; 
    box-sizing: border-box;
    position: relative;

    @media (max-width: 768px) {
      width: 80%!important;
      max-height: auto;

      &-body{
        min-height: 15rem;
      }
    }

    .content-img{
      position: relative;

      img {
        width: 100%; 
        height: auto;
        object-fit: cover;
      }

      .svg {
        position: absolute;
        bottom: .5rem;
        right: .5rem;
        cursor: pointer;

        svg path {
          fill: #000; 
          transition: fill 0.3s ease; 
        }

        &:hover svg path {
          fill: #00995D;
        }
        
        &.default-hover svg path {
            fill: #00995D;
        }
      }
    }
    &-title{
      font-size: 1.8rem!important;
      color: $text-font-primary;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal; 

      @media (max-width: 992px) {
        font-size: 1.2rem!important;
      }
    }
    &-body{
      color: $secondary!important;
    
      .text {
        @media (max-width: 992px) {
          font-size: 1.2rem!important;
        }

        &-discount-box{
          gap: .5rem;
          position: relative;
          top: 1rem;
          &-value{
            font-size: 1.4rem;
            text-decoration:line-through!important;
          }
          &-percentage{
            font-size: 1.2rem;
            color: $text-font-red;
          }
        }
        &-info{
          font-size: 1.4rem;
          color: $secondary!important;
          position: relative;
          top: 1rem;
        }
        &-value{
          font-size: 2.6rem;
          font-weight: bold;
          color: $text-font-primary;
        }
        &-payment{
          font-size: 1.4rem;
          display: -webkit-box;
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
        &-seller {
          font-size: 1.4rem;
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis;
          position: absolute;
          bottom: 1rem; 
          left: 0;
          right: 0;
          max-width: 100%; 

          span {
            text-decoration: underline !important;
          }
        }
      }
    }
  }
</style>
