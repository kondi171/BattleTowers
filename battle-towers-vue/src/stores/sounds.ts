import { defineStore } from 'pinia'
import { PlayFunction } from '@/typescript/enums';
import playMenu from './../assets/audio/tracks/menuSoundtrack.mp3';

export const useSoundsStore = defineStore('app', () => {
    const menuSountrack = (playFunction: PlayFunction) => {
        const audio = new Audio(playMenu);
        if (playFunction === PlayFunction.PLAY) audio.play();
        else audio.pause();
    }

    return { menuSountrack }
});
