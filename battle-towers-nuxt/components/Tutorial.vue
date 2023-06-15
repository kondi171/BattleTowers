<template>
    <h1 class="elo">Elo</h1>
    <div>{{ appStore.isGameStart }}</div>
    <button @click="handleClick">check</button>
</template>

<script>
import { useAppStore } from '~/stores/app';
export default {
    setup() {
        const appStore = useAppStore();

        const handleClick = () => {
            appStore.setIsGameStart(!appStore.isGameStart);
        }
        return {
            appStore,
            // isGameStart,
            handleClick,
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

.elo {
    color: $primaryColor;
}
</style>