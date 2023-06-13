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
import { ref, reactive, } from 'vue';
import type { Position } from '@/typescript/types';
import { ContextMenu, LogType, NewTower, CanvasBounding } from '@/typescript/enums';
import addToLogs from '@/scripts/addToLogs';
import Player from '@/classes/Player';
import towerPlace from '@/assets/audio/effects/towerPlace.wav';
import cannonData from './../../../resources/towers/cannon.json';
import minigunData from './../../../resources/towers/minigun.json';
import missileData from './../../../resources/towers/missile.json';
import Cannon from '@/classes/towers/Cannon';
import Minigun from '@/classes/towers/Minigun';
import Missile from '@/classes/towers/Missile';

export default {
    props: {
        contextMenuPosition: {
            type: Object,
            required: true
        },
        setContextMenu: {
            type: Function,
            required: true
        },
        currentSubstructure: {
            type: Object,
            required: true
        },
        setCurrentSubstructure: {
            type: Function,
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
        }
    },
    setup(props) {
        const menuRef = ref(null);
        const position = reactive({ x: 0, y: 0 });
        const isMoneyChanged = ref(false);
        const towerValue = ref(0);

        const placeTower = (newTower) => {
            let tower = null;
            if (props.currentSubstructure && props.context2D) {
                if (newTower === NewTower.CANNON) tower = new Cannon(props.context2D, { x: props.currentSubstructure.getPosition().x, y: props.currentSubstructure.getPosition().y });
                else if (newTower === NewTower.MINIGUN) tower = new Minigun(props.context2D, { x: props.currentSubstructure.getPosition().x, y: props.currentSubstructure.getPosition().y });
                else if (newTower === NewTower.MISSILE) tower = new Missile(props.context2D, { x: props.currentSubstructure.getPosition().x, y: props.currentSubstructure.getPosition().y });
                if (tower) {
                    if (tower.getMoney() <= props.player.getMoney()) {
                        props.player.setMoney(props.player.getMoney() - tower.getMoney());
                        props.setMoney(props.player.getMoney());
                        props.towers.push(tower);
                        props.setContextMenu(ContextMenu.NONE);
                        playTowerPlace();
                        addToLogs(props.logs, `${tower.getName()} has been placed!`, LogType.SUCCESS);
                        props.currentSubstructure.setOccupied(true);
                        props.setCurrentSubstructure(null);
                    } else {
                        props.player.setMoney(props.player.getMoney() - tower.getMoney());
                        setIsMoneyChanged(true);
                        setTowerValue(tower.getMoney());
                        props.setMoney(props.player.getMoney());
                        addToLogs(props.logs, `Not Enough money`, LogType.FAILURE);
                    }
                }
            }
        };

        watch(isMoneyChanged, (newValue) => {
            if (newValue) {
                props.player.setMoney(props.player.getMoney() + towerValue.value);
                props.setMoney(props.player.getMoney());
                setIsMoneyChanged(false);
            }
        });

        useEffect(() => {
            const menuBounding = {
                width: menuRef.value.clientWidth,
                height: menuRef.value.clientHeight
            };
            const totalWidth = menuBounding.width + props.contextMenuPosition.x;
            const totalHeight = menuBounding.height + props.contextMenuPosition.y;
            let newPosition = { x: props.contextMenuPosition.x, y: props.contextMenuPosition.y };
            if (totalWidth > CanvasBounding.WIDTH) {
                newPosition.x = props.contextMenuPosition.x - (totalWidth - CanvasBounding.WIDTH);
            }
            if (totalHeight > CanvasBounding.HEIGHT) {
                newPosition.y = props.contextMenuPosition.y - (totalHeight - CanvasBounding.HEIGHT) - 50;
            }
            setPosition(newPosition);
        }, [props.contextMenuPosition]);

        return {
            menuRef,
            position,
            placeTower,
            cannonData,
            minigunData,
            missileData,
            isMoneyChanged,
            setIsMoneyChanged,
            towerValue,
            setTowerValue,
            playTowerPlace,
        };
    }
};
</script>
  
<style scoped lang="scss">
@import './../../../assets/scss/_variables.scss';
</style>