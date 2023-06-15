<script lang="ts">
import { ref, watch, reactive, onMounted } from 'vue';

import Enemy from '~/classes/enemies/Enemy';
import Tower from '~/classes/towers/Tower';
import Substructure from '~/classes/Substructure';
import Scene from '~/classes/Scene';
import Player from '~/classes/Player';
import Explosion from '~/classes/Explosion';

import fillSubstructures from '~/scripts/fillSubstructures';
import spawnEnemies from '~/scripts/spawnEnemies';
import addToLogs from '~/scripts/addToLogs';

import TransitionInfo from '~/components/features/TransitionInfo.vue';
import NewTowerMenu from '~/components/features/towerMenu/NewTowerMenu.vue';
import UpgradeTowerMenu from '~/components/features/towerMenu/UpgradeTowerMenu.vue';

import Loading from '~/components/views/Loading.vue';

import { useGameStore } from '~/stores/game';
import { useAppStore } from '~/stores/app';

import lostLife from '~/assets/audio/effects/lostLife.wav';
import enemyDead from '~/assets/audio/effects/enemyDead.wav';
import enemyHit from '~/assets/audio/effects/enemyHit.wav';
import nextGamePart from '~/assets/audio/effects/nextGamePart.wav';

import desertSoundtrack from '~/assets/audio/tracks/world1Soundtrack.mp3';
import forestSoundtrack from '~/assets/audio/tracks/world2Soundtrack.mp3';
import underworldSoundtrack from '~/assets/audio/tracks/world3Soundtrack.wav';
import { CanvasBounding, ContextMenu, GamePart, GameResult, LogType } from '~/typescript/enums';
import type { Mouse } from '~/typescript/types';

export default {
    components: {
        TransitionInfo,
        NewTowerMenu,
        UpgradeTowerMenu,
        Loading,
    },
    methods: {
        mouseMoveHandler(event: MouseEvent) {
            if (!this.canvasRef) return;
            const canvasTopOffset = this.canvasRef!.getBoundingClientRect().top;
            const canvasLeftOffset = this.canvasRef!.getBoundingClientRect().left;
            const x = event.clientX - canvasLeftOffset;
            const y = event.clientY - canvasTopOffset;
            this.mousePosition.x = x;
            this.mousePosition.y = y;
            if (this.tacticalMode) return;
            this.updateSubstructuresInit({ x, y });
        },
        updateSubstructuresInit(mouse: Mouse) {
            this.substructures.forEach(substructure => substructure.update(mouse));
        }
    },
    setup() {
        const gameStore = useGameStore();
        const appStore = useAppStore();
        const { setWave, setLevel, setWorld, setLife, setMoney, setScore, logs, setLogs } = gameStore;
        const { setEndGame } = appStore;

        const lostLifeEffect = new Audio(lostLife);
        const enemyDeadEffect = new Audio(enemyDead);
        const enemyHitEffect = new Audio(enemyHit);
        const nextGamePartEffect = new Audio(nextGamePart);

        const desertTrack = new Audio(desertSoundtrack);
        const forestTrack = new Audio(forestSoundtrack);
        const underworldTrack = new Audio(underworldSoundtrack);

        const canvasRef = ref<HTMLCanvasElement | null>(null);
        const context2D = ref<CanvasRenderingContext2D | null>(null);

        const animationRef = ref(0);
        const isLoaded = ref(false);
        const initCanvas = ref(false);
        const isInitialized = ref(false);

        const info = ref('');
        const time = ref(3);
        const isInfoVisible = ref(false);

        const contextMenuPosition = reactive({ x: -1000, y: 0 });
        const contextMenu = ref<ContextMenu | null>(null);
        const clickedTower = ref<Tower | null>(null);
        const mousePosition = reactive({ x: 0, y: 0 });
        const tacticalMode = ref(false);

        const towers = ref<Tower[]>([]);
        const enemies = ref<Enemy[]>([]);
        const explosions = ref<Explosion[]>([]);
        const substructures = ref<Substructure[]>([]);

        const currentSubstructure = ref<Substructure | null>(null);

        const player = ref<Player | null>(null);
        const scene = ref<Scene | null>(null);

        const gamePart = ref<GamePart | null>(null);
        const start = ref(false);

        let activeSubstructure: null | Substructure = null;

        const initialize = () => {
            canvasRef.value!.width = CanvasBounding.WIDTH;
            canvasRef.value!.height = CanvasBounding.HEIGHT;
            context2D.value!.fillRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);
            setLife(player.value!.getLife());
            setMoney(player.value!.getMoney());
            setScore(player.value!.getScore());
            setWave(scene.value!.getWave());
            setLevel(scene.value!.getLevel());
            setWorld(scene.value!.getWorldName());
            substructures.value = fillSubstructures(context2D.value!, scene.value!);
            enemies.value = spawnEnemies(context2D.value!, scene.value! as Scene);
            explosions.value = [];
            isInitialized.value = true;
        }

        const animate = () => {
            animationRef.value = requestAnimationFrame(animate);
            const image = new Image();
            image.src = scene.value!.getCurrentMap();
            context2D.value!.drawImage(image, 0, 0);
            updateTowers();
            updateEnemies();
            updateSubstructures({ x: 0, y: 0 });
            updateExplosions();
        }

        const refreshAssets = () => {
            const image = new Image();
            image.src = scene.value!.getCurrentMap();
            context2D.value!.drawImage(image, 0, 0);
            updateTowers();
            updateEnemies();
            updateSubstructures({ x: 0, y: 0 });
            updateExplosions();
        }

        const updateTowers = () => {
            towers.value.forEach(tower => {
                tower.update();
                tower.setTarget(null);
                const validEnemies = enemies.value.filter(enemy => {
                    const xDifference = (enemy.getPosition().x + enemy.getBounding().width / 2) - tower.getPosition().x - tower.getSize() / 2;
                    const yDifference = (enemy.getPosition().y + enemy.getBounding().height / 2) - tower.getPosition().y - tower.getSize() / 2;
                    const distance = Math.hypot(xDifference, yDifference);
                    return distance < enemy.getBounding().radius + tower.getRadius();
                });
                tower.setTarget(validEnemies[validEnemies.length - 1]);
                updateBullet(tower as Tower, enemies.value! as Enemy[]);
            });
        }

        const updateBullet = (tower: Tower, enemies: Enemy[]) => {
            for (let i = tower.getBullets().length - 1; i >= 0; i--) {
                const bullet = tower.getBullet(i);
                bullet.update();
                const xDifference = (bullet.getEnemy().getPosition().x + bullet.getEnemy().getBounding().width / 2) - bullet.getPosition().x;
                const yDifference = (bullet.getEnemy().getPosition().y + bullet.getEnemy().getBounding().height / 2) - bullet.getPosition().y;
                const distance = Math.hypot(xDifference, yDifference);
                if (distance < bullet.getEnemy().getBounding().radius) {
                    bullet.getEnemy().decreaseHealth(tower.getDamage());
                    explosions.value.push(new Explosion(
                        context2D.value!,
                        { x: bullet.getEnemy().getPosition().x, y: bullet.getEnemy().getPosition().y },
                        tower.getExplosionImg(),
                        { max: tower.getMaxExplosionFrames() })
                    );
                    tower.getBullets().splice(i, 1);
                    enemyHitEffect.play();
                    if (bullet.getEnemy().getHealth() <= 0) {
                        const enemyIndex = enemies.findIndex((enemy) => {
                            return bullet.getEnemy() === enemy;
                        });
                        if (enemyIndex > -1) {
                            const targetedEnemy = enemies[enemyIndex];
                            enemies.splice(enemyIndex, 1);
                            enemyDeadEffect.play();
                            addToLogs(logs, `${targetedEnemy.getName()} has been eliminated!`, LogType.SUCCESS);
                            player.value!.setMoney(player.value!.getMoney() + targetedEnemy.getMoney());
                            player.value!.setScore(player.value!.getScore() + targetedEnemy.getScore());
                            setScore(player.value!.getScore());
                            setMoney(player.value!.getMoney());
                        }
                    }
                    if (enemies.length === 0) increaseWave();
                }
            }
        }

        const updateEnemies = () => {
            for (let i = enemies.value.length - 1; i >= 0; i--) {
                const enemy = enemies.value[i];
                enemy.update();
                decreasePlayerLife(enemy as Enemy, i);
            }
        }

        const updateSubstructures = (mouse: Mouse) => {
            substructures.value.forEach(substructure => substructure.update(mouse));
        }

        const updateExplosions = () => {
            for (let i = explosions.value.length - 1; i >= 0; i--) {
                const explosion = explosions.value[i];
                explosion.update();
                if (explosion.getFrames().current >= explosion.getFrames().max - 1) explosions.value.splice(i, 1);
            }
        }

        const placementClicked = () => {
            for (let i = 0; i < substructures.value.length; i++) {
                const tile = substructures.value[i];
                if (
                    mousePosition.x > tile.getPosition().x &&
                    mousePosition.x < tile.getPosition().x + tile.getSize() &&
                    mousePosition.y > tile.getPosition().y &&
                    mousePosition.y < tile.getPosition().y + tile.getSize()
                ) {
                    activeSubstructure = tile as Substructure;
                    break;
                }
            }
            if (activeSubstructure) {
                contextMenuPosition.x = mousePosition.x;
                contextMenuPosition.y = mousePosition.y;
                checkSubstructure(activeSubstructure);
            } else {
                contextMenuPosition.x = -1000;
                contextMenuPosition.y = 0;
                contextMenu.value = ContextMenu.NONE;
            }
            activeSubstructure = null;
        }
        const checkSubstructure = (activeSubstructure: Substructure) => {
            currentSubstructure.value = activeSubstructure;
            if (activeSubstructure) {
                if (!activeSubstructure.getOccupied()) contextMenu.value = ContextMenu.NEW_TOWER;
                else if (activeSubstructure.getOccupied()) {
                    const tower = towers.value.filter((tower) => tower.getPosition().x === activeSubstructure.getPosition().x && tower.getPosition().y === activeSubstructure.getPosition().y);
                    clickedTower.value = tower[0];
                    contextMenu.value = ContextMenu.UPGRADE_TOWER;
                }
            } else {
                contextMenuPosition.x = -1000;
                contextMenuPosition.y = 0;
                contextMenu.value = ContextMenu.NONE;
            }
        }
        const decreasePlayerLife = (enemy: Enemy, index: number) => {
            const worldData = scene.value!.getCurrentWorldData();
            if (enemy.getWaypointIndex() === worldData.waypoints.length - 1) {
                player.value!.setLife(player.value!.getLife() - 1);
                addToLogs(logs, 'Lost life!', LogType.FAILURE);
                setLife(player.value!.getLife());
                enemies.value.splice(index, 1);
                lostLifeEffect.play();
                if (player.value!.getLife() <= 0) {
                    setEndGame(GameResult.DEFEAT);
                    gameReset();
                }
                if (enemies.value.length === 0) increaseWave();
            }
        }

        const gameReset = () => {
            desertTrack.pause();
            forestTrack.pause();
            underworldTrack.pause();
            cancelAnimationFrame(animationRef.value);
            scene.value!.setWave(1);
            scene.value!.setLevel(1);
            scene.value!.setWorld(1);
            setWave(1);
            setLevel(1);
            setWorld(scene.value!.getWorldName());
            logs.slice(0, logs.length);
            setLogs([]);
        }

        const increaseWave = () => {
            if (scene.value!.getWave() >= scene.value!.getCurrentWorldData().enemies.length) increaseLevel();
            else {
                gamePart.value = GamePart.WAVE;
                scene.value!.setWave(scene.value!.getWave() + 1);
                enemies.value = spawnEnemies(context2D.value!, scene.value! as Scene);
            }
        }

        const increaseLevel = () => {
            if (scene.value!.getLevel() >= scene.value!.getMaps().length) changeWorld();
            else {
                gamePart.value = GamePart.LEVEL;
                scene.value!.setLevel(scene.value!.getLevel() + 1);
                towers.value.splice(0, towers.value.length);
                towers.value = [];
                activeSubstructure = null;
                substructures.value = fillSubstructures(context2D.value!, scene.value! as Scene);
                scene.value!.setWave(1);
                enemies.value = spawnEnemies(context2D.value!, scene.value! as Scene);
                player.value!.setMoney(((scene.value!.getWorld() * 100) + ((scene.value!.getLevel() - 1) * 20)));
                contextMenu.value = null;
            }
        }

        const changeWorld = () => {
            if (scene.value!.getWorld() >= scene.value!.getWorldsLength()) {
                setEndGame(GameResult.WIN);
                player.value!.setScore(player.value!.getScore() + player.value!.getLife() * 100);
                setScore(player.value!.getScore());
                gameReset();
            } else {
                scene.value!.setWave(1);
                scene.value!.setLevel(1);
                scene.value!.setWorld(scene.value!.getWorld() + 1);
                towers.value.splice(0, towers.value!.length);
                towers.value = [];
                activeSubstructure = null;
                start.value = false;
                substructures.value = fillSubstructures(context2D.value!, scene.value! as Scene);
                enemies.value = spawnEnemies(context2D.value!, scene.value! as Scene);
                player.value!.setLife(player.value!.getLife() + 3);
                player.value!.setMoney(100 * scene.value!.getWorld());
                contextMenu.value = null;
            }
        }
        const gameTransition = (part: GamePart) => {
            setTimeout(() => {
                isLoaded.value = true;
            }, 2000);
            isInfoVisible.value = true;
            info.value = part;

            if (part === GamePart.START && start.value) {
                nextGamePartEffect.play();
                if (scene.value!.getWorldName() === 'Desert') {
                    desertTrack.loop = true;
                    desertTrack.volume = 0.5;
                    desertTrack.play();
                } if (scene.value!.getWorldName() === 'Forest') {
                    forestTrack.loop = true;
                    forestTrack.volume = 0.5;
                    forestTrack.play();
                } if (scene.value!.getWorldName() === 'Underworld') {
                    underworldTrack.loop = true;
                    underworldTrack.volume = 0.5;
                    underworldTrack.play();
                }
                isInfoVisible.value = false;
                animate();
            } else if ((part === GamePart.WAVE || part === GamePart.LEVEL) && start.value) {
                if (player.value!.getLife() <= 0) return;
                setTimeout(() => {
                    isInfoVisible.value = false;
                    animate();
                    if (part === GamePart.WAVE) {
                        setWave(scene.value!.getWave());
                        addToLogs(logs, 'Next Wave!', LogType.SUCCESS);
                    } else if (part === GamePart.LEVEL) {
                        setMoney(player.value!.getMoney());
                        setLevel(scene.value!.getLevel());
                        setWave(1);
                        addToLogs(logs, 'Next Level!', LogType.SUCCESS);
                    }
                }, 4000);

                let index = 3;
                const interval = setInterval(() => {
                    if (index === 0) {
                        clearInterval(interval);
                        time.value = 3;
                    } else {
                        index--;
                        time.value = index;
                    }
                }, 1000);
            } else if (part === GamePart.WORLD) {
                desertTrack.pause();
                forestTrack.pause();
                underworldTrack.pause();
                if (scene.value!.getWorldName() === 'Desert') desertTrack.play();
                if (scene.value!.getWorldName() === 'Forest') forestTrack.play();
                if (scene.value!.getWorldName() === 'Underworld') underworldTrack.play();
                setWave(1);
                setLevel(1);
                setWorld(scene.value!.getWorldName());
                setLife(player.value!.getLife());
                setMoney(player.value!.getMoney());
                addToLogs(logs, 'Next World!', LogType.SUCCESS);
                cancelAnimationFrame(animationRef.value);
            }
            gamePart.value = null;
        }

        const handleTacticalMode = (state: boolean) => {
            tacticalMode.value = state;
            if (!state) animate();
            else cancelAnimationFrame(animationRef.value);
        }

        const mouseMove = (event: MouseEvent) => {
            const canvasTopOffset = canvasRef.value!.getBoundingClientRect().top;
            const canvasLeftOffset = canvasRef.value!.getBoundingClientRect().left;
            const x = event.clientX - canvasLeftOffset;
            const y = event.clientY - canvasTopOffset;
            mousePosition.x = x;
            mousePosition.y = y;
            if (tacticalMode) return;
            updateSubstructures({ x, y });
        };

        const setStart = () => {
            start.value = true;
        }

        const towerSetted = (money: number) => {
            player.value?.setMoney(money);
            contextMenu.value = ContextMenu.NONE;
            contextMenuPosition.x = -1000;
            contextMenuPosition.y = 0;
        }
        onMounted(() => {
            const canvas = canvasRef.value;
            const ctx = canvas?.getContext('2d');
            if (!ctx) return;
            context2D.value = ctx;
            initCanvas.value = true;
            window.addEventListener('mousemove', mouseMove);
        });
        watch(
            () => initCanvas.value,
            (newInitCanvas) => {
                scene.value = new Scene();
                player.value = new Player();
                if (newInitCanvas) initialize();
            }
        );
        watch(
            () => isInitialized.value,
            (newIsInitialized) => {
                if (newIsInitialized) {
                    const image = new Image();
                    image.src = scene.value!.getCurrentMap();
                    image.onload = () => { gameTransition(GamePart.START); };
                }
            }
        );
        watch(
            () => start.value,
            (newStart) => {
                if (isInitialized.value) {
                    if (newStart) gameTransition(GamePart.START);
                    else gameTransition(GamePart.WORLD);
                }
            }
        );
        watch(
            [initCanvas, gamePart],
            ([newInitCanvas, newGamePart]) => {
                if (newInitCanvas && newGamePart) {
                    cancelAnimationFrame(animationRef.value);
                    gameTransition(newGamePart);
                }
            }
        );
        watch(
            () => towers.value.length,
            () => {
                if (isInitialized.value && tacticalMode.value) {
                    refreshAssets();
                }
            }
        );
        return {
            isLoaded,
            setWave,
            setLevel,
            setWorld,
            setLife,
            setMoney,
            setScore,
            setEndGame,
            logs,
            setLogs,
            canvasRef,
            animationRef,
            context2D,
            initCanvas,
            isInitialized,
            info,
            time,
            isInfoVisible,
            contextMenuPosition,
            contextMenu,
            clickedTower,
            mousePosition,
            tacticalMode,
            towers,
            enemies,
            explosions,
            substructures,
            currentSubstructure,
            scene,
            player,
            gamePart,
            start,
            activeSubstructure,
            handleTacticalMode,
            mouseMove,
            placementClicked,
            ContextMenu,
            setStart,
            towerSetted,
        };
    },
};
</script>
<template>
    <div class="canvasWrapper">
        <div class="fade">
            <div v-if="!isInfoVisible" class="tacticalModeBtn">
                <Icon name="material-symbols:pause-circle-outline-rounded" @click="() => handleTacticalMode(!tacticalMode)"
                    class="fa fa-pause-circle-o" aria-hidden="true" />
            </div>
            <span v-if="tacticalMode" class="tacticalMode">Tactical Mode is Active</span>
            <TransitionInfo v-if="isInfoVisible" :info="info" :time="time" :start="start" @setStart="setStart" />
            <NewTowerMenu v-if="contextMenu === ContextMenu.NEW_TOWER" :contextMenuPosition="contextMenuPosition"
                :currentSubstructure="currentSubstructure" :context2D="context2D" :towers="towers" :player="player"
                :towerSetted="towerSetted" />

            <UpgradeTowerMenu v-if="contextMenu === ContextMenu.UPGRADE_TOWER" :contextMenuPosition="contextMenuPosition"
                :currentSubstructure="currentSubstructure" :towers="towers" :currentTower="clickedTower" :player="player"
                :towerSetted="towerSetted" />

            <canvas ref="canvasRef" class="sceneCanvas" @click="placementClicked" @mousemove="mouseMoveHandler"></canvas>
        </div>
        <Loading v-if="!isLoaded" />
    </div>
</template>
<style lang="scss">
@import '../assets/scss/_variables.scss';

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

.canvasWrapper {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .tacticalModeBtn {
        position: absolute;
        right: 2rem;
        bottom: 1rem;
        font-size: 6rem;
        color: $secondaryColor;
        text-shadow: 1px 1px 5px black,
            -1px 1px 5px black,
            1px -1px 5px black,
            -1px -1px 5px black;
        filter: drop-shadow(0 0 0.75rem black);
        z-index: 100;

        svg {
            color: $secondaryColor;
            text-shadow: 1px 1px 5px black,
                -1px 1px 5px black,
                1px -1px 5px black,
                -1px -1px 5px black;
            filter: drop-shadow(0 0 0.75rem black);
            transition-duration: .4s;

            &:hover {
                cursor: pointer;
                color: $primaryColor;
            }
        }
    }

    .tacticalMode {
        position: absolute;
        top: 0;
        left: 0;
        margin: 1rem;
        color: $primaryColor;
        font-size: 2rem;
        background-color: $bgColor;
        padding: 1rem;
        opacity: .7;
        border-radius: 4px;
    }

    .transitionInfo {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        text-align: center;
        color: $fontColor;
        font-family: $titleFont;
        font-size: 8rem;
        background-color: #000;
        opacity: .8;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        z-index: 30;

        h3 {
            width: 100%;
            padding: 20%;
            -webkit-text-stroke: 1px $secondaryColor;
        }
    }

    .newTowerMenu {
        position: absolute;
        border-radius: 8px;
        border: 2px solid $secondaryColor;
        background-color: #202022c3;
        padding: 20px;
        width: 450px;
        height: 440px;

        h2 {
            text-align: center;
            font-size: 2.5rem;
            color: $primaryColor;
            font-family: $primaryFont;
            margin-bottom: 1rem;
            filter: drop-shadow(0 0 0.75rem black);
        }

        .newTower {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            transition-duration: .4s;
            border-radius: 4px;
            margin: 1rem;

            .error {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10;
                background-color: rgba(0, 0, 0, 0.5);
                color: red;
                width: 100%;
                height: 100%;
                font-size: 2rem;
                font-family: $primaryFont;
                border-radius: 4px;
            }

            &:hover {
                cursor: pointer;
                background-color: $primaryColor;
            }

            .imageWrapper {
                width: 80%;
                margin: 20px;
                color: $fontColor;

                p {
                    filter: drop-shadow(0 0 0.75rem black);
                    margin-bottom: 2rem;
                }

                img {
                    width: 50%;
                    height: 50%;
                }
            }

            .infoWrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 100%;
                line-height: 150%;
                font-size: 1.2rem;

                .health {
                    color: $errorColor;
                    filter: drop-shadow(0 0 0.75rem black);
                }

                .money {
                    color: $successColor;
                    filter: drop-shadow(0 0 0.75rem black);
                }

                .speed {
                    color: gold;
                    filter: drop-shadow(0 0 0.75rem black);
                }
            }
        }
    }

    .upgradeTowerMenu {
        position: absolute;
        border-radius: 8px;
        border: 2px solid $secondaryColor;
        background-color: #202022c3;
        padding: 20px;
        width: 470px;
        height: 550px;

        h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: $primaryColor;
            font-family: $primaryFont;
            filter: drop-shadow(0 0 0.75rem black);
        }

        svg {
            display: block;
            color: $secondaryColor;
            font-size: 10rem;
            text-align: center;
        }


        button {
            display: block;
            text-align: center;
            margin: 0 auto;
            margin-top: 2rem;
            width: 80%;
            height: 5vh;
            border-radius: 4px;
            outline: none;
            border: 2px solid $secondaryColor;
            background-color: $primaryColor;
            color: darken($secondaryColor, 10%);
            font-size: 2rem;
            font-weight: bold;
            font-family: $supportFont;
            transition-duration: .4s;
            outline: 2px solid $secondaryColor;

            &.error {
                color: $errorColor;
                font-size: 1.5rem;
                outline: 2px solid $errorColor;
                border: 2px solid $errorColor;
                background-color: darken($errorColor, 30%);
                color: $errorColor;

                &:hover {
                    border-color: $errorColor;
                    background-color: lighten($errorColor, 20%);
                    color: $bgColor;
                    outline-color: $errorColor;
                }
            }

            &:hover {
                cursor: pointer;
                border-color: $primaryColor;
                background-color: $secondaryColor;
                color: $primaryColor;
                outline-offset: 4px;
                outline-color: $primaryColor;
            }
        }

        .upgradeTower {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            transition-duration: .4s;
            border-radius: 4px;
            border: 2px solid $secondaryColor;
            background-color: #00747c4e;
            margin: 4rem 0;

            .imageWrapper {
                width: 80%;
                margin: 20px;
                color: $fontColor;

                p {
                    filter: drop-shadow(0 0 0.75rem black);
                    margin-bottom: 2rem;
                }

                img {
                    width: 50%;
                    height: 50%;
                }
            }

            .infoWrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 100%;
                line-height: 150%;
                font-size: 1.2rem;

                .health {
                    color: $errorColor;
                    filter: drop-shadow(0 0 0.75rem black);
                }

                .money {
                    color: $successColor;
                    filter: drop-shadow(0 0 0.75rem black);
                }

                .speed {
                    color: gold;
                    filter: drop-shadow(0 0 0.75rem black);
                }
            }
        }
    }

    .maxLevel {
        position: absolute;
        border-radius: 8px;
        border: 2px solid $secondaryColor;
        background-color: #202022c3;
        padding: 20px;
        width: 470px;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;

        h2 {

            padding: 2rem 0;

            &:first-child {
                color: $primaryColor;
                font-size: 2rem;
            }

            &:last-child {
                color: $fontColor;
                font-size: 1.7rem;
                filter: drop-shadow(0 0 0.75rem black);
            }
        }

        img {
            width: 30%;
        }
    }

    .sceneCanvas {
        width: $canvasWidth;
        height: $canvasHeight;
        background-color: green;
        border-radius: 5px;
        border: 2px solid $secondaryColor;
        box-shadow: 0 0 4px 2px $secondaryColor;
        z-index: 1;
    }
}
</style>