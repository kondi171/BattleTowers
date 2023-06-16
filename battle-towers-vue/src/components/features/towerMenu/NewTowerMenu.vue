<template>
    <div ref="menuRef" class="newTowerMenu" :style="{ left: `${position.x}px`, top: `${position.y}px` }">
        <h2>Buy a new Tower</h2>
        <div class="newTower" @click="() => placeTower(NewTower.CANNON)">
            <div v-if="player.getMoney() < cannonData.levels[0].money" class="error">Not enough money!</div>
            <div class="imageWrapper">
                <p class="name">{{ cannonData.name }}</p>
                <img src="@/assets/img/towers/structures/cannon/cannon1.png" alt="Cannon level 1" />
            </div>
            <div class="infoWrapper">
                <p class="health">Damage: {{ cannonData.levels[0].damage }}</p>
                <p class="money">Money: {{ cannonData.levels[0].money }}</p>
                <p class="speed">Speed: {{ cannonData.levels[0].speed }} FPS</p>
            </div>
        </div>
        <div class="newTower" @click="() => placeTower(NewTower.MINIGUN)">
            <div v-if="player.getMoney() < minigunData.levels[0].money" class="error">Not enough money!</div>
            <div class="imageWrapper">
                <p class="name">{{ minigunData.name }}</p>
                <img src="@/assets/img/towers/structures/minigun/mg1.png" alt="Minigun level 1" />
            </div>
            <div class="infoWrapper">
                <p class="health">Damage: {{ minigunData.levels[0].damage }}</p>
                <p class="money">Money: {{ minigunData.levels[0].money }}</p>
                <p class="speed">Speed: {{ minigunData.levels[0].speed }} FPS</p>
            </div>
        </div>
        <div class="newTower" @click="() => placeTower(NewTower.MISSILE)">
            <div v-if="player.getMoney() < missileData.levels[0].money" class="error">Not enough money!</div>
            <div class="imageWrapper">
                <p class="name">{{ missileData.name }}</p>
                <img src="@/assets/img/towers/structures/missile/missile1.png" alt="Missile Launcher level 1" />
            </div>
            <div class="infoWrapper">
                <p class="health">Damage: {{ missileData.levels[0].damage }}</p>
                <p class="money">Money: {{ missileData.levels[0].money }}</p>
                <p class="speed">Speed: {{ missileData.levels[0].speed }} FPS</p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import { LogType, NewTower, CanvasBounding } from '@/typescript/enums';
import addToLogs from '@/scripts/addToLogs';

import towerPlace from '@/assets/audio/effects/towerPlace.wav';
import cannonData from '@/resources/towers/cannon.json';
import minigunData from '@/resources/towers/minigun.json';
import missileData from '@/resources/towers/missile.json';
import Cannon from '@/classes/towers/Cannon';
import Minigun from '@/classes/towers/Minigun';
import Missile from '@/classes/towers/Missile';
import { useGameStore } from '@/stores/game';

export default {
    props: {
        contextMenuPosition: {
            type: Object,
            required: true
        },
        currentSubstructure: {
            type: Object,
            required: true
        },
        context2D: {
            type: Object,
            required: true
        },
        towers: {
            type: Array,
            required: true
        },
        player: {
            type: Object,
            required: true
        },
        towerSetted: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const gameStore = useGameStore();
        const { setMoney, logs } = gameStore;
        const menuRef = ref<HTMLDivElement | null>(null);
        const position = ref({ x: 0, y: 0 });
        const towerValue = ref(0);
        const towerPlaceEffect = new Audio(towerPlace);
        const placeTower = (newTower: NewTower) => {
            let tower = null;
            if (props.currentSubstructure && props.context2D) {
                if (newTower === NewTower.CANNON) tower = new Cannon(props.context2D! as CanvasRenderingContext2D, { x: props.currentSubstructure.getPosition().x, y: props.currentSubstructure.getPosition().y });
                else if (newTower === NewTower.MINIGUN) tower = new Minigun(props.context2D! as CanvasRenderingContext2D, { x: props.currentSubstructure.getPosition().x, y: props.currentSubstructure.getPosition().y });
                else if (newTower === NewTower.MISSILE) tower = new Missile(props.context2D! as CanvasRenderingContext2D, { x: props.currentSubstructure.getPosition().x, y: props.currentSubstructure.getPosition().y });
                if (tower) {
                    if (tower.getMoney() <= props.player.getMoney()) {
                        props.towerSetted(props.player.getMoney() - tower.getMoney());
                        setMoney(props.player.getMoney());
                        props.towers.push(tower);
                        towerPlaceEffect.play();
                        addToLogs(logs, `${tower.getName()} has been placed!`, LogType.SUCCESS);
                        props.currentSubstructure.setOccupied(true);
                    } else {
                        towerValue.value = tower.getMoney();
                        addToLogs(logs, `Not Enough money`, LogType.FAILURE);
                    }
                }
            }
        };
        onMounted(() => {
            const menuBounding = {
                width: menuRef.value!.clientWidth,
                height: menuRef.value!.clientHeight
            };
            const totalWidth = menuBounding.width + props.contextMenuPosition.x;
            const totalHeight = menuBounding.height + props.contextMenuPosition.y;
            let updatedPosition = { x: props.contextMenuPosition.x, y: props.contextMenuPosition.y };
            if (totalWidth > CanvasBounding.WIDTH) {
                updatedPosition.x = props.contextMenuPosition.x - (totalWidth - CanvasBounding.WIDTH);
            }
            if (totalHeight > CanvasBounding.HEIGHT) {
                updatedPosition.y = props.contextMenuPosition.y - (totalHeight - CanvasBounding.HEIGHT) - 50;
            }
            position.value = updatedPosition;
        });

        watch(props.contextMenuPosition, (newPosition) => {
            const menuBounding = {
                width: menuRef.value!.clientWidth,
                height: menuRef.value!.clientHeight
            };
            const totalWidth = menuBounding.width + newPosition.x;
            const totalHeight = menuBounding.height + newPosition.y;
            let updatedPosition = { x: newPosition.x, y: newPosition.y };
            if (totalWidth > CanvasBounding.WIDTH) {
                updatedPosition.x = newPosition.x - (totalWidth - CanvasBounding.WIDTH);
            }
            if (totalHeight > CanvasBounding.HEIGHT) {
                updatedPosition.y = newPosition.y - (totalHeight - CanvasBounding.HEIGHT) - 50;
            }
            position.value = updatedPosition;
        });

        return {
            menuRef,
            position,
            placeTower,
            cannonData,
            minigunData,
            missileData,
            towerValue,
            NewTower,
        };
    }
};
</script>
  
<style scoped lang="scss">
@import '@/assets/scss/variables';
</style>