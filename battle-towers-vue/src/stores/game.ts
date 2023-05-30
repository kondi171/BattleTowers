import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Log } from '@/typescript/types';

export const useGameStore = defineStore('game', () => {
    const wave = ref<number>(1);
    const level = ref<number>(1);
    const world = ref<string>('Desert');
    const life = ref<number>(10);
    const money = ref<number>(100);
    const score = ref<number>(0);
    const logs = ref<Log[]>([])

    const setWave = (value: number) => {
        wave.value = value;
    }
    const setLevel = (value: number) => {
        level.value = value;
    }
    const setWorld = (value: string) => {
        world.value = value;
    }
    const setLife = (value: number) => {
        life.value = value;
    }
    const setMoney = (value: number) => {
        money.value = value;
    }
    const setScore = (value: number) => {
        score.value = value;
    }
    const setLogs = (value: Log[]) => {
        logs.value = value;
    }

    return { wave, level, world, life, money, score, logs, setWave, setLevel, setWorld, setLife, setMoney, setScore, setLogs }
});
