<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DepartamentButton',
  props: {
    text: {
      type: String as () => string,
      required: true,
    },
    icon: {
      type: String as () => string,
      required: true,
    },
    class: {
      type: String as () => string,
      required: false,
    }
  },
  computed: {
    formattedButtonText(): string {
      return this.text?.replace(/\*\*([^*]+)\*\*/g, '<br>$1') || '';
    },
    imageSrc(): string {
      return new URL(`/src/assets/images/${this.icon}.svg`, import.meta.url).href;
    }
  },
});
</script>

<template>
  <div class="content-box">
    <a href="/" class="content-departamentButton mb-1" :class="class">
      <img :src="imageSrc"/> 
    </a>
    <span class="text-button" v-html="formattedButtonText"></span> 
  </div>
</template>
  
<style lang="scss">
$content-size: 9rem;
$icon-size: 3.5rem;

.content {
  &-box {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    gap: .5rem;
    place-items: center;
    text-align: center;
    align-items: start;
    justify-content: flex-start;
    margin-right: 0.5rem;

    .text-button {
        color: $text-font-primary;
        font-size: 1.6rem;
        max-width: 20rem;
        font-weight: normal;

        @media (max-width: 768px) {
          font-size: 1.2rem;
        }
      }
    }
    &-departamentButton {
      background-color: $background-extra-light;
      width: $content-size;
      height: $content-size;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease-in-out;
  
      img {
        width: $icon-size;
        transition: transform 0.2s ease-in-out, filter 0.3s ease-in-out;
      }
  
      &.default-hover {
        background-color: $primary; 
  
        .text-button {
          font-weight: bold; 
        }
  
        img {
          filter: brightness(0) saturate(100%) invert(1);
        }
      }
  
      &:hover {
        background-color: $primary;
  
        img {
          filter: brightness(0) saturate(100%) invert(1);
        }
      }
  }
}

@media (max-width: 768px) {
  $content-size: 6rem;
  $icon-size: 2.5rem;

  .content {
    &-departamentButton {
      width: $content-size;
      height: $content-size;

      img {
        width: $icon-size;
      }
    }
  }
}
</style>
  