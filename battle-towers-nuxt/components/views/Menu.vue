<template>
    <div class="fade">
        <div class="btn">
            <Button :click="handleStartGame" @mouseenter="playHoverEffect" name="Play" />
        </div>
        <div class="menuState">
            <div class="powered">
                <span>Powered by Nuxt</span>
                <img src="@/assets/img/nuxt.png" alt="React logo" />
            </div>
            <div class="journal">
                <Icon name="uil:book" @mouseenter="playHoverEffect" @click="handleOpen" />
                <span>Battle Journal</span>
            </div>
            <div :class="[resolutionIsOk ? 'resolutionSuccess' : 'resolutionError']">
                Your resolution: {{ resolution.width }} x {{ resolution.height }}
                <i v-if="resolutionIsOk" class="fa fa-check-circle-o" aria-hidden="true"></i>
                <i v-else class="fa fa-times-circle-o" aria-hidden="true"></i>
            </div>
            <div class="score">Best score: {{ localStorage.getItem('score') === '0' ? 0 : localStorage.getItem('score') }}
            </div>
        </div>
        <BattleJournal v-if="appStore.isHelpOpen" />
    </div>
</template>
  
<script lang="ts">

import { ref, onMounted, onUnmounted } from 'vue';
import Button from '../features/Button.vue';
import BattleJournal from '../features/battleJournal/BattleJournal.vue';
import { useAppStore } from '@/stores/app';
import type { Resolution } from '@/typescript/types';
import playConfirm from './../../assets/audio/effects/confirmMenu.wav';
import playHover from './../../assets/audio/effects/towerPlace.wav';
import menuSoundtrack from './../../assets/audio/tracks/menuSoundtrack.mp3';

export default {

    components: {
        Button,
        BattleJournal,
    },
    setup() {
        const appStore = useAppStore();
        const resolution = ref<Resolution>({ width: 0, height: 0 });
        const resolutionIsOk = ref(false);
        const isHelpOpen = ref(false);
        const init = ref(false);
        const menuAudio = new Audio(menuSoundtrack);

        const checkResolution = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            resolution.value = {
                width: width,
                height: height,
            };
            if (width < 1280 || height < 768) resolutionIsOk.value = false;
            else resolutionIsOk.value = true;
        };

        const handleStartGame = () => {
            appStore.setIsGameStart(!appStore.isGameStart);
            const audio = new Audio(playConfirm);
            audio.play();
            menuAudio.pause();
            console.log(appStore.isGameStart);
        };
        const playHoverEffect = () => {
            const audio = new Audio(playHover);
            audio.play();
            console.log('hover');
        }
        const handleOpen = () => {
            appStore.setIsHelpOpen(true)
            const audio = new Audio(playConfirm);
            audio.play();
        }
        onMounted(() => {
            menuAudio.loop = true;
            menuAudio.volume = 0.5;
            menuAudio.play();
            checkResolution();
            window.addEventListener('resize', checkResolution);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', checkResolution);
        });

        return {
            appStore,
            resolution,
            resolutionIsOk,
            isHelpOpen,
            handleStartGame,
            playHoverEffect,
            init,
            localStorage,
            handleOpen,
        };
    },
};
</script>
  
<style lang="scss" scoped>
@import './../../assets/scss/variables';

.fade {
    opacity: 0;
    animation: fadeIn .4s ease-out forwards;

    .btn {
        position: fixed;
        left: 0;
        right: 0;
    }

    .menuState {
        position: fixed;

        .resolutionSuccess,
        .resolutionError,
        .score {
            color: $primaryColor;
            position: fixed;
            bottom: 2vh;
            font-size: 2rem;
        }

        .resolutionSuccess,
        .resolutionError {
            display: flex;
            justify-content: center;
            align-items: center;
            left: 2vw;

            i {
                padding-left: 1vw;
                font-size: 3rem;
            }
        }

        .resolutionError {
            color: $errorColor;
        }

        .resolutionSuccess {
            color: $successColor;
        }

        .score {
            right: 2vw;
        }

        .powered {
            position: fixed;
            top: 4rem;
            left: 2rem;
            color: $fontColor;
            font-size: 2rem;
            display: flex;
            align-items: center;

            img {
                margin-left: 20px;
                margin-top: -20px;
                width: 15%;
                height: 15%;
            }
        }

        .journal {
            color: $primaryColor;
            position: fixed;
            right: 2rem;
            top: 2rem;
            font-size: 6rem;
            transition-duration: .4s;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                order: 1;
                opacity: 0;
                transition-duration: .4s;
                font-size: 2rem;
                margin-right: 1rem;
                transform: translateY(-200px);
            }

            svg {
                order: 2;

                &:hover {
                    cursor: pointer;
                    color: $secondaryColor;
                    transition-duration: .4s;

                    &+span {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        }
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