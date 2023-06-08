<template>
    <div class="fade">
        <div class="btn">
            <Button :click="handleStartGame" @mouseenter="playHoverEffect" name="Play" />
        </div>
        <div class="menuState">
            <div class="powered">
                <span>Powered by Vue</span>
                <img src="@/assets/img/vue.png" alt="React logo" />
            </div>
            <div class="journal">
                <i @click="appStore.setIsHelpOpen(true)" class="fa fa-book" aria-hidden="true"></i>
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
import { useSoundsStore } from '@/stores/sounds';
import type { Resolution } from '@/typescript/types';
import playConfirm from './../../assets/audio/effects/confirmMenu.wav';
import playHover from './../../assets/audio/effects/towerPlace.wav';
import { PlayFunction } from '@/typescript/enums';
import menuSoundtrack from './../../assets/audio/tracks/menuSoundtrack.mp3';

export default {

    components: {
        Button,
        BattleJournal,
    },
    setup() {
        const appStore = useAppStore();
        const soundStore = useSoundsStore();
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
        };
        const playHoverEffect = () => {
            const audio = new Audio(playHover);
            audio.play();
        }
        onMounted(() => {
            // soundStore.menuSountrack(PlayFunction.PLAY);
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
            top: 2rem;
            left: 2rem;
            color: $fontColor;
            font-size: 2rem;
            display: flex;
            align-items: center;

            img {
                margin-left: 20px;
                width: 5%;
                height: 5%;
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

            i {
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