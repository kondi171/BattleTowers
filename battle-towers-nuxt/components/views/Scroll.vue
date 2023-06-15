<template>
    <div class="scrollState" v-show="isShown">
        <img :src="ctrlScroll" alt="Change resolution info" />
        <div>If the game doesn't display correctly, try this combination</div>
    </div>
</template>
  
<script lang="ts">
import CtrlScroll from '~/assets/img/CtrlScroll.png';

export default {
    data() {
        return {
            isShown: false,
        };
    },
    mounted() {
        this.isShown = true;
    },
    computed: {
        ctrlScroll() {
            return CtrlScroll;
        },
    },
};
</script>
  
<style lang="scss" scoped>
@import '~/assets/scss/variables';

.scrollState {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100vw;
    height: 100vh;
    opacity: 0;
    animation: fadeIn .4s ease-out forwards;

    img {
        width: 40vw;
    }

    div {
        color: $primaryColor;
        font-size: 5vmin;
        text-align: center;
        font-family: $primaryFont;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
}
</style>