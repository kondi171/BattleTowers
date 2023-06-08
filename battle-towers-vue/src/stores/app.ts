import { ref } from 'vue'
import { defineStore } from 'pinia'
import { GameResult } from '@/typescript/enums';

export const useAppStore = defineStore('app', () => {
  const isGameStart = ref(false);
  const endGame = ref(GameResult.DEFEAT);
  const isHelpOpen = ref(false);

  const setIsGameStart = (statement: boolean) => {
    isGameStart.value = statement;
  }

  const setEndGame = (statement: GameResult) => {
    endGame.value = statement;
  }

  const setIsHelpOpen = (statement: boolean) => {
    isHelpOpen.value = statement;
  }

  return { isGameStart, endGame, setIsGameStart, setEndGame, isHelpOpen, setIsHelpOpen }
});
