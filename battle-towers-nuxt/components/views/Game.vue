<template>
    <div v-if="isScroll">
        <Scroll />
    </div>
    <main v-else class="gameState">
        <section class="playground">
            <Playground />
        </section>
        <section class="graphicalInterface">
            <header class="logo logoMinimized">
                <div class="imageWrapper">
                    <img src="~/assets/img/shield.png" alt="Shield - element of Battle Towers logo" />
                </div>
                <h1>Battle Towers</h1>
            </header>
            <div class="worldInfo">
                <h2>World</h2>
                <h3>{{ world }}</h3>
                <h2>Level</h2>
                <h3>{{ level }}</h3>
                <h2>Wave</h2>
                <h3>{{ wave }}</h3>
            </div>
            <div class="levelInfo">
                <div class="life">
                    <Icon name="mdi:heart" />
                    <span>{{ life }}</span>
                </div>
                <div class="money">
                    <Icon name="ph:money-fill" />
                    <span>{{ money }}</span>
                </div>
                <div class="score">
                    <h3>Score: <span>{{ score }}</span></h3>
                </div>
                <Logs />
            </div>
        </section>
    </main>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import Scroll from '~/components/views/Scroll.vue';
import Playground from '~/components/Playground.vue';
import Logs from '~/components/features/Logs.vue';
import { useGameStore } from '~/stores/game';

export default defineComponent({
    name: 'Game',
    components: {
        Scroll,
        Playground,
        Logs
    },
    setup() {
        const gameStore = useGameStore();

        const wave = computed(() => gameStore.wave);
        const level = computed(() => gameStore.level);
        const world = computed(() => gameStore.world);
        const life = computed(() => gameStore.life);
        const money = computed(() => gameStore.money);
        const score = computed(() => gameStore.score);
        const isScroll = ref(true);

        onMounted(() => {
            setTimeout(() => {
                isScroll.value = false;
            }, 2000);
        });

        return {
            wave,
            level,
            world,
            life,
            money,
            score,
            isScroll,
        };
    }
});
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

::selection {
    background-color: $primaryColor;
    color: $bgColor;
}

::-webkit-scrollbar {
    background-color: $bgColor;
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    background: $bgColor;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: $primaryColor;
    transition-duration: .4s;
    border-radius: 100vw;
    border: 3px solid $bgColor;
}

::-webkit-scrollbar-thumb:hover {
    background: $secondaryColor;
}

.gameState {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .playground {
        width: 80%;
        height: 100vh;
        min-width: $canvasWidth;
        min-height: $canvasHeight;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1vw;
    }

    .graphicalInterface {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 20%;
        padding: 2vw;
        margin-top: 4%;
        opacity: 0;
        animation: fadeInterface .4s ease-out forwards;
        animation-delay: 100ms;

        @keyframes fadeInterface {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .worldInfo {

            h2,
            h3 {
                text-align: center;
                line-height: 200%;
                display: block;
                width: 100%;
                color: $primaryColor;
                font-size: 2rem;
            }

            h3 {
                color: $fontColor;
            }
        }

        .levelInfo {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;
            font-size: 1.5rem;
            margin-bottom: 30%;

            .life,
            .money {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: $fontColor;
                font-size: 1.5rem;
                width: 80%;
                line-height: 250%;

                svg {
                    padding-right: .5rem;
                    font-size: 2.5rem;
                }
            }

            .life {
                color: #d81e1e;
            }

            .money {
                color: #00ff22cc
            }

            .score {
                color: $primaryColor;
                line-height: 350%;
                width: 100%;
                text-align: center;
                margin-bottom: 1rem;

                span {
                    color: $fontColor;
                }
            }
        }
    }
}
</style>
  