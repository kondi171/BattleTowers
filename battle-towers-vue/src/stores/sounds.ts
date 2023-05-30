import { ref } from 'vue'
import { defineStore } from 'pinia'
import { GameResult } from '@/typescript/enums';

export const useAppStore = defineStore('app', () => {
    const isGameStart = ref(false);
    const endGame = ref(GameResult.UNPLAYED);

    const setIsGameStart = (statement: boolean) => {
        isGameStart.value = statement;
    }

    const setEndGame = (statement: GameResult) => {
        endGame.value = statement;
    }

    return { isGameStart, endGame, setIsGameStart, setEndGame }
});
