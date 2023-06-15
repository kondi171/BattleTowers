<template>
    <div v-if="presentTower.level !== 3" ref="menuRef" class="upgradeTowerMenu"
        :style="{ left: `${position.x.toFixed()}px`, top: `${position.y.toFixed()}px` }">
        <h2>Upgrade the {{ presentTower.name }}</h2>
        <div class="upgradeTower">
            <div class="imageWrapper">
                <p class="name">Level {{ presentTower.level }}</p>
                <img :src="presentTower.image" :alt="`${presentTower.name} Level ${presentTower.level}`" />
            </div>
            <div class="infoWrapper">
                <p class="health">Damage: {{ presentTower.damage }}</p>
                <p class="money">Money: {{ presentTower.money }}</p>
                <p class="speed">Speed: {{ presentTower.speed }} FPS</p>
            </div>
        </div>
        <i class="fa fa-angle-double-down" aria-hidden="true"></i>
        <div class="upgradeTower">
            <div class="imageWrapper">
                <p class="name">Level {{ nextTower.level }}</p>
                <img :src="nextTower.image" :alt="`${nextTower.name} Level ${nextTower.level}`" />
            </div>
            <div class="infoWrapper">
                <p class="health">Damage: {{ nextTower.damage }}</p>
                <p class="money">Money: {{ nextTower.money }}</p>
                <p class="speed">Speed: {{ nextTower.speed }} FPS</p>
            </div>
        </div>
        <button v-if="nextTower && player.getMoney() >= Number(nextTower.money)" @click="upgradeTower">Upgrade</button>
        <button v-else class="error" @click="upgradeTower">Upgrade</button>
    </div>
    <div v-else ref="menuRef" class="maxLevel"
        :style="{ left: `${position.x.toFixed()}px`, top: `${position.y.toFixed()}px` }">
        <h2>{{ presentTower.name }} Tower Level {{ presentTower.level }}</h2>
        <img :src="presentTower.image" :alt="`${presentTower.name} Level ${presentTower.level}`" />
        <h2>Level of this {{ presentTower.name }} is maxed out!</h2>
    </div>
</template>
  
<script lang="ts">
import { ref, reactive, onMounted, watch, getCurrentInstance, type PropType } from 'vue';
import type { Mouse, Position, TowerStats } from '@/typescript/types';
import Tower from '@/classes/towers/Tower';
import Substructure from '@/classes/Substructure';
import Player from '@/classes/Player';
import { CanvasBounding, ContextMenu, LogType } from '@/typescript/enums';
import addToLogs from '@/scripts/addToLogs';
import towerPlace from '@/assets/audio/effects/towerPlace.wav';
import { useGameStore } from '@/stores/game';

export default {
    name: 'UpgradeTowerMenu',
    props: {
        contextMenuPosition: {
            type: Object,
            required: true,
        },
        currentSubstructure: {
            type: Object,
            required: true,
        },
        towers: {
            type: Array as PropType<Tower[]>,
            required: true,
        },
        currentTower: {
            type: Object,
            required: true,
        },
        player: {
            type: Object,
            required: true
        },
        towerSetted: {
            type: Function,
            required: true,
        }
    },
    setup(props) {
        const gameStore = useGameStore();
        const towerPlaceEffect = new Audio(towerPlace);
        const { logs, setMoney } = gameStore;
        const menuRef = ref<HTMLDivElement | null>(null);
        const position = reactive({ x: 0, y: 0 });
        const presentTower = reactive<TowerStats>({
            name: '',
            level: 0,
            damage: 0,
            money: 0,
            speed: 0,
            image: ''
        });
        const nextTower = reactive<TowerStats>({
            name: '',
            level: 0,
            damage: 0,
            money: 0,
            speed: 0,
            image: ''
        });
        const isMoneyChanged = ref(false);
        const towerValue = ref<number | null | undefined>(null);

        const upgradeTower = () => {
            const clickedTower = props.towers.filter(tower => tower.getPosition().x === props.currentSubstructure.getPosition().x && tower.getPosition().y === props.currentSubstructure.getPosition().y);
            const activeTower = clickedTower[0];
            if (!nextTower.money) return;
            if (props.player.getMoney() < nextTower.money) {
                isMoneyChanged.value = true;
                addToLogs(logs, 'Not enough money!', LogType.FAILURE);
            } else {
                activeTower.upgradeTower();
                towerPlaceEffect.play();
                props.towerSetted(props.player.getMoney() - nextTower.money);
                setMoney(props.player.getMoney());
                addToLogs(logs, `${activeTower.getName()} Tower has been upgraded to level ${activeTower.getCurrentLevelInfo().level}`, LogType.SUCCESS);
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
            position.x = updatedPosition.x;
            position.y = updatedPosition.y;

            const presentTowerData = {
                name: props.currentTower.getName(),
                level: props.currentTower.getCurrentLevelInfo().level,
                damage: props.currentTower.getCurrentLevelInfo().damage,
                money: props.currentTower.getCurrentLevelInfo().money,
                speed: props.currentTower.getCurrentLevelInfo().speed,
                image: props.currentTower.getCurrentLevelInfo().image
            };
            const nextTowerData = {
                name: props.currentTower.getName(),
                level: props.currentTower.getNextLevelInfo().level,
                damage: props.currentTower.getNextLevelInfo().damage,
                money: props.currentTower.getNextLevelInfo().money,
                speed: props.currentTower.getNextLevelInfo().speed,
                image: props.currentTower.getNextLevelInfo().image
            };
            presentTower.name = presentTowerData.name;
            presentTower.level = presentTowerData.level;
            presentTower.damage = presentTowerData.damage;
            presentTower.money = presentTowerData.money;
            presentTower.speed = presentTowerData.speed;
            presentTower.image = presentTowerData.image;
            nextTower.name = nextTowerData.name;
            nextTower.level = nextTowerData.level;
            nextTower.damage = nextTowerData.damage;
            nextTower.money = nextTowerData.money;
            nextTower.speed = nextTowerData.speed;
            nextTower.image = nextTowerData.image;
        });

        watch(() => props.currentTower, () => {
            if (!props.currentTower) return;
            const presentTowerData = {
                name: props.currentTower.getName(),
                level: props.currentTower.getCurrentLevelInfo().level,
                damage: props.currentTower.getCurrentLevelInfo().damage,
                money: props.currentTower.getCurrentLevelInfo().money,
                speed: props.currentTower.getCurrentLevelInfo().speed,
                image: props.currentTower.getCurrentLevelInfo().image
            };
            const nextTowerData = {
                name: props.currentTower.getName(),
                level: props.currentTower.getNextLevelInfo().level,
                damage: props.currentTower.getNextLevelInfo().damage,
                money: props.currentTower.getNextLevelInfo().money,
                speed: props.currentTower.getNextLevelInfo().speed,
                image: props.currentTower.getNextLevelInfo().image
            };
            presentTower.name = presentTowerData.name;
            presentTower.level = presentTowerData.level;
            presentTower.damage = presentTowerData.damage;
            presentTower.money = presentTowerData.money;
            presentTower.speed = presentTowerData.speed;
            presentTower.image = presentTowerData.image;
            nextTower.name = nextTowerData.name;
            nextTower.level = nextTowerData.level;
            nextTower.damage = nextTowerData.damage;
            nextTower.money = nextTowerData.money;
            nextTower.speed = nextTowerData.speed;
            nextTower.image = nextTowerData.image;
        });

        watch(() => isMoneyChanged.value, () => {
            if (isMoneyChanged.value) {
                props.player.setMoney(props.player.getMoney() + towerValue.value);
                setMoney(props.player.getMoney());
                isMoneyChanged.value = false;
            }
        });

        return {
            menuRef,
            position,
            presentTower,
            nextTower,
            player: props.player,
            upgradeTower
        };
    },
};
</script>
<style scoped>
@import '@/assets/scss/_variables.scss';
</style>