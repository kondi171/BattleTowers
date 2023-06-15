<template>
    <div class="wrapper">
        <div class="game">
            <template v-if="!appStore.isGameStart">
                <header class="logo">
                    <div class="imageWrapper">
                        <img src="@/assets/img/shield.png" alt="Shield - element of Battle Towers logo" />
                    </div>
                    <h1>Battle Towers</h1>
                </header>
                <template v-if="!changeState">
                    <Intro :setChangeState="setChangeState" />
                </template>
                <template v-else>
                    <Menu />
                </template>
            </template>
            <template v-else>
                <template v-if="appStore.endGame === GameResult.UNPLAYED">
                    <Game />
                </template>
            </template>
            <template v-if="appStore.endGame !== GameResult.UNPLAYED">
                <End :gameResult="appStore.endGame" />
            </template>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, computed } from 'vue';
import Intro from '~/components/views/Intro.vue';
import Menu from '~/components/views/Menu.vue';
import Game from '~/components/views/Game.vue';
import End from '~/components/views/End.vue';
import { GameResult } from '~/typescript/enums';
import { useAppStore } from '~/stores/app';

export default {
    components: {
        Intro,
        Menu,
        Game,
        End,
    },
    setup() {
        const appStore = useAppStore();
        const changeState = ref(false);
        const setChangeState = (accept: boolean) => {
            changeState.value = accept;
        };
        return {
            appStore,
            changeState,
            setChangeState,
            GameResult,
        };
    },
};
</script>
  
<style lang="scss" scoped>
@import '~/assets/scss/variables';

.logo {
    position: relative;
    animation: moveHeader 2s ease-out forwards;
    transform: scale(1.4);

    h1 {
        position: absolute;
        font-family: $titleFont;
        font-size: 12rem;
        width: 300%;
        text-align: center;
        top: 30%;
        left: -100%;
        right: 0;
        background-image: linear-gradient(180deg, $primaryColor 0%, $bgColor 100%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-stroke: 2px $bgColor;
        filter: drop-shadow(0 0 5px $secondaryColor);
    }

    .imageWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        img {
            width: 65%;
            filter: drop-shadow(0 0 5px $primaryColor);
        }
    }

    @keyframes moveHeader {
        0% {
            transform: scale(1.4) translateY(0);
        }

        50% {
            transform: scale(1) translateY(0);
        }

        100% {
            transform: scale(1) translateY(-15vh);
        }
    }
}

.logoMinimized {
    display: flex;
    transform: scale(.9);
    animation: none;

    h1 {
        text-align: center;
        font-size: 3vw;
    }
}
</style>