<template>
    <div>
        <div class="btn">
            <Button name="Play" @click="handleStartGame" />
        </div>
        <div class="menuState">
            <div class="powered">
                <span>Powered by React</span>
                <img src="@/assets/img/react.png" alt="React logo" />
            </div>
            <div class="journal">
                <i @click="handleHelpOpen" class="fa fa-book" aria-hidden="true"></i>
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
        <BattleJournal v-if="init" :isHelpOpen="isHelpOpen" @setIsHelpOpen="setIsHelpOpen" />
    </div>
</template>
  
<script lang="ts">
// import { ref, onMounted, onUnmounted, computed, useContext } from 'vue';
import { ref, onMounted, onUnmounted } from 'vue';
import Button from '../features/Button.vue';
import BattleJournal from '../features/BattleJournal.vue';
//   import { AppContext } from '../AppContext';
//   import { AppContextType } from '../AppContext';
import { Resolution } from '../../types';

export default {
    components: {
        Button,
        BattleJournal,
    },
    setup() {
        const resolution = ref<Resolution>({ width: 0, height: 0 });
        const resolutionIsOk = ref(false);
        const isHelpOpen = ref(false);
        //   const { isGameStart, setIsGameStart } = useContext(AppContext) as AppContextType;
        let isGameStart = false;
        const init = ref(false);

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
            // setIsGameStart(!isGameStart);
            isGameStart = !isGameStart;
        };

        const handleHelpOpen = () => {
            isHelpOpen.value = !isHelpOpen.value;
            init.value = true;
        };

        onMounted(() => {
            checkResolution();
            window.addEventListener('resize', checkResolution);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', checkResolution);
        });

        return {
            resolution,
            resolutionIsOk,
            isHelpOpen,
            setIsHelpOpen: (value: boolean) => {
                isHelpOpen.value = value;
            },
            handleStartGame,
            handleHelpOpen,
            init,
            localStorage,
        };
    },
};
</script>
  
<style lang="scss" scoped>
@import './../../assets/scss/variables';

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
            width: 10%;
            height: 10%;
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
</style>