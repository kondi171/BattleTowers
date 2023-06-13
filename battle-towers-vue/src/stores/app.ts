import { ref } from 'vue'
import { defineStore } from 'pinia'
import { GameResult } from '@/typescript/enums';

export const useAppStore = defineStore('app', () => {
  const isGameStart = ref(false);
  const endGame = ref(GameResult.UNPLAYED);
  const isHelpOpen = ref(false);
  const isLoaded = ref(false);

  const setIsGameStart = (statement: boolean) => {
    isGameStart.value = statement;
  }

  const setEndGame = (statement: GameResult) => {
    endGame.value = statement;
  }

  const setIsHelpOpen = (statement: boolean) => {
    isHelpOpen.value = statement;
  }

  const setIsLoaded = (statement: boolean) => {
    isLoaded.value = statement;
  }

  return { isGameStart, endGame, setIsGameStart, setEndGame, isHelpOpen, setIsHelpOpen, isLoaded, setIsLoaded }
});
