<template>
    <section class="endState fade">
        <h2 v-if="endGame === GameResult.WIN">Congratulations!</h2>
        <h2 v-else>Game Over!</h2>
        <h3>
            Your score: {{ score }}
            <span v-if="isNewBest">New Best!</span>
        </h3>
        <h3>Do you want to play again?</h3>
        <div class="btns">
            <Button name="Restart" @click="handleRestart" /><br><br><br><br><br><br>
            <Button name="Back to Menu" @click="handleBackToMenu" />
        </div>
    </section>
</template>
<script lang="ts">
import { ref, reactive, onMounted } from 'vue';

import { GameResult } from '@/typescript/enums';
import Button from '@/components/features/Button.vue';
import { useAppStore } from '@/stores/app';
import { useGameStore } from '@/stores/game';
import winSoundTrack from '@/assets/audio/tracks/winSoundtrack.mp3';
import gameOverSoundTrack from '@/assets/audio/tracks/gameOverSoundtrack.wav';

export default {
    name: 'End',
    components: {
        Button,
    },
    props: {
        gameResult: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const appStore = useAppStore();
        const gameStore = useGameStore();
        const { endGame, setEndGame, setIsGameStart } = appStore;
        const { score } = gameStore;
        const isNewBest = ref(false);

        const winTrack = new Audio(winSoundTrack);
        const gameOverTrack = new Audio(gameOverSoundTrack);

        const handleRestart = () => {
            setEndGame(GameResult.UNPLAYED);
            winTrack.pause();
            gameOverTrack.pause();
        };

        const handleBackToMenu = () => {
            setIsGameStart(false);
            setEndGame(GameResult.UNPLAYED);
            winTrack.pause();
            gameOverTrack.pause();
        };

        onMounted(() => {
            console.log(props.gameResult);
            if (endGame === GameResult.WIN) {
                winTrack.loop = true;
                winTrack.volume = 0.5;
                winTrack.play();
            } else if (endGame === GameResult.DEFEAT) {
                gameOverTrack.loop = true;
                gameOverTrack.volume = 0.5;
                gameOverTrack.play();
            }
        });

        onMounted(() => {
            if (score > Number(localStorage.getItem('score'))) {
                localStorage.setItem('score', `${score}`);
                isNewBest.value = true;
            }
        });

        return {
            endGame,
            score,
            isNewBest,
            handleRestart,
            handleBackToMenu,
            GameResult,
        };
    },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.fade {
    opacity: 0;
    animation: fadeIn .4s ease-out forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
}

.endState {
    font-family: $titleFont;
    text-align: center;
    background-image: linear-gradient(180deg, $primaryColor 0%, $bgColor 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    h2 {
        font-size: 10vmin;
    }

    h3 {
        font-family: $primaryFont;
        font-size: 4vmin;
        color: $fontColor;
        filter: drop-shadow(0 0 2px $secondaryColor);
        margin: 2% 0;

        &:last-of-type {
            padding-bottom: 10%;
            font-family: $supportFont;
        }

        span {
            color: $primaryColor;
        }
    }

    .btns {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        button {
            margin: 100% 0;
        }
    }
}
</style>