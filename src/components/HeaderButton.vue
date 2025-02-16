<script lang="ts">
export default {
  name: "HeaderButton",
  props: {
    text: { type: String, required: false },
    alt: { type: String, required: true },
    icon: { type: String, required: true },
    clickable: { type: Boolean, default: false }
  },
  computed: {
    formattedText() {
      return this.text?.replace(/(\*\*([^*]+)\*\*)/g, '<strong class="block">$2</strong><br>');
    },
    imageSrc() {
      return new URL(`/src/assets/images/${this.icon}.svg`, import.meta.url).href;
    }
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit("toggle-sidebar"); 
      }
    }
  }
};
</script>

<template>
  <a href="javascript:void(0)" class="content-button" @click="handleClick">
    <div class="content-button-icon p-3">
      <img :src="imageSrc" :alt="alt" /> 
    </div>
    <span class="content-button-text" v-if="text" v-html="formattedText"></span> 
  </a>
</template>

  
<style lang="scss">
.content-button{
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: auto;
  max-width: 100%;
  padding: 0.8rem 1rem;

  @media (max-width: 480px) {
    flex: 1 1 45%;
  }

  @media (max-width: 992px) {
    width: 100%;
  }
  &-icon{
      background-color:$background-extra-light;
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      img{
          width: 2.4rem;
      }
  }
  &-text{
      color: $text-font-primary;
      font-size: 1.6rem;
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis; 
  }
}
</style>
  