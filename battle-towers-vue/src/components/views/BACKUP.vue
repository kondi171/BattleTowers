<script lang="ts">
import type Substructure from '@/classes/Substructure';
import TransitionInfo from './features/TransitionInfo.vue';
import NewTowerMenu from './features/towerMenu/NewTowerMenu.vue';
// import UpgradeTowerMenu from './features/towerMenu/UpgradeTowerMenu.vue';
import { ref, reactive, onMounted, watch } from 'vue';
import Scene from '@/classes/Scene';
import Player from '@/classes/Player';
import { useGameStore } from '@/stores/game';
import { useAppStore } from '@/stores/app';
import { CanvasBounding, ContextMenu, GamePart, GameResult, LogType, StartingPoint } from '@/typescript/enums';
import fillSubstructures from '@/scripts/fillSubstructures';
import Explosion from '@/classes/Explosion';
import spawnEnemies from '@/scripts/spawnEnemies';
import type Enemy from '@/classes/enemies/Enemy';
import addToLogs from '@/scripts/addToLogs';
import type { Mouse } from '@/typescript/types';
import type Tower from '@/classes/towers/Tower';

export default {
    components: {
        TransitionInfo,
        NewTowerMenu,
        // UpdateTowerMenu,
    },
    setup() {
        const gameStore = useGameStore();
        const appStore = useAppStore();
        const canvasRef = ref<HTMLCanvasElement | null>(null);
        const animationRef = ref(0);

        const context2D = ref<CanvasRenderingContext2D | null>(null);

        const initCanvas = ref(false);
        const isInitialized = ref(false);

        const info = ref('');
        const time = ref(3);
        const isInfoVisible = ref(false);

        const contextMenuPosition = ref({ x: -1000, y: 0 });
        const contextMenu = ref<ContextMenu | null>(null);
        const clickedTower = ref(null);
        const mousePosition = reactive({ x: 0, y: 0 });
        const tacticalMode = ref(false);

        const towers = ref([]);
        const enemies = ref<Enemy[]>([]);
        const explosions = ref<Explosion[]>([]);

        const substructures = ref<Substructure[]>([]);
        const currentSubstructure = ref<Substructure | null>(null);

        const scene = new Scene();
        const player = ref<Player | null>(null);

        const gamePart = ref<GamePart | null>(null);
        const start = ref(false);
        let activeSubstructure = <Substructure | null>null;

        const initialize = () => {
            canvasRef.value!.width = CanvasBounding.WIDTH;
            canvasRef.value!.height = CanvasBounding.HEIGHT;
            context2D.value!.fillRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);
            gameStore.setLife(player.value!.getLife());
            gameStore.setMoney(player.value!.getMoney());
            gameStore.setScore(player.value!.getScore());
            gameStore.setWave(scene.getWave());
            gameStore.setLevel(scene.getLevel());
            gameStore.setWorld(scene.getWorldName());
            substructures.value = fillSubstructures(context2D.value!, scene);
            enemies.value = spawnEnemies(context2D.value!, scene);
            explosions.value = [];
            isInitialized.value = true;
        }

        const animate = () => {
            animationRef.value = requestAnimationFrame(animate);
            const image = new Image();
            image.src = scene.getCurrentMap();
            context2D.value!.drawImage(image, 0, 0);
            updateTowers();
            updateEnemies();
            updateSubstructures({ x: 0, y: 0 });
            updateExplosions();
        }
        const refreshAssets = () => {
            const image = new Image();
            image.src = scene.getCurrentMap();
            context2D.value!.drawImage(image, 0, 0);
            updateTowers();
            updateEnemies();
            updateSubstructures({ x: 0, y: 0 });
            updateExplosions();
        }

        const checkSubstructure = (activeSubstructure: Substructure) => {
            currentSubstructure.value = activeSubstructure;
            if (!activeSubstructure.getOccupied()) contextMenu.value = ContextMenu.NEW_TOWER;
            else {
                const tower = towers.value.filter((tower: Tower) => tower.getPosition().x === activeSubstructure.getPosition().x && tower.getPosition().y === activeSubstructure.getPosition().y);
                clickedTower.value = tower[0];
                contextMenu.value = ContextMenu.UPGRADE_TOWER;
            }
        }

        // const setStart = (state: boolean) => start.value = state;
        const placementClicked = () => {
            for (let i = 0; i < substructures.value.length; i++) {
                const tile = substructures.value[i];
                if (
                    mousePosition.x > tile.getPosition().x &&
                    mousePosition.x < tile.getPosition().x + tile.getSize() &&
                    mousePosition.y > tile.getPosition().y &&
                    mousePosition.y < tile.getPosition().y + tile.getSize()
                ) {
                    activeSubstructure = tile
                    break;
                }
            }
            if (activeSubstructure) {
                contextMenuPosition.value = { x: mousePosition.x, y: mousePosition.y };
                checkSubstructure(activeSubstructure);
            } else {
                contextMenuPosition.value = { x: -1000, y: 0 };
                contextMenu.value = ContextMenu.NONE;
            }
        }
        const updateEnemies = () => {
            for (let i = enemies.value.length - 1; i >= 0; i--) {
                const enemy = enemies.value[i];
                enemy.update();
                decreasePlayerLife(enemy, i);
            }
        }

        const updateSubstructures = (mouse: Mouse) => { substructures.value.forEach(substructure => substructure.update(mouse)); }

        const updateTowers = () => {
            towers.value.forEach((tower: Tower) => {
                tower.update();
                tower.setTarget(null);
                const validEnemies = enemies.value.filter(enemy => {
                    const xDifference = (enemy.getPosition().x + enemy.getBounding().width / 2) - tower.getPosition().x - tower.getSize() / 2;
                    const yDifference = (enemy.getPosition().y + enemy.getBounding().height / 2) - tower.getPosition().y - tower.getSize() / 2;
                    const distance = Math.hypot(xDifference, yDifference);
                    return distance < enemy.getBounding().radius + tower.getRadius();
                });
                tower.setTarget(validEnemies[validEnemies.length - 1]);
                updateBullet(tower, enemies.value);
            });
        }

        const updateBullet = (tower: Tower, enemies: any) => {
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
                    // playEnemyHit();
                    if (bullet.getEnemy().getHealth() <= 0) {
                        const enemyIndex = enemies.findIndex((enemy: Enemy) => {
                            return bullet.getEnemy() === enemy;
                        });
                        if (enemyIndex > -1) {
                            const targetedEnemy = enemies[enemyIndex];
                            enemies.splice(enemyIndex, 1);
                            // playEnemyDead();
                            addToLogs(gameStore.logs, `${targetedEnemy.getName()} has been eliminated!`, LogType.SUCCESS);
                            player.value!.setMoney(player.value!.getMoney() + targetedEnemy.getMoney());
                            player.value!.setScore(player.value!.getScore() + targetedEnemy.getScore());
                            gameStore.setScore(player.value!.getScore());
                            gameStore.setMoney(player.value!.getMoney());
                        }
                    }
                    if (enemies.length === 0) increaseWave();
                }
            }
        }
        const updateExplosions = () => {
            for (let i = explosions.value.length - 1; i >= 0; i--) {
                const explosion = explosions.value[i];
                explosion.update();
                if (explosion.getFrames().current >= explosion.getFrames().max - 1) explosions.value.splice(i, 1);
            }
        }

        const gameTransition = (part: GamePart) => {
            console.log(part);
            setTimeout(() => {
                appStore.setIsLoaded(true);
            }, 2000);
            // playNextGamePart(); sound
            isInfoVisible.value = true;
            info.value = part;
            if (part === GamePart.START && start) {
                // if (scene.value!.getWorldName() === 'Desert') playDesert();
                // if (scene.value!.getWorldName() === 'Forest') playForest();
                // if (scene.value!.getWorldName() === 'Underworld') playUnderworld();
                isInfoVisible.value = false;
                animate();
            } else if ((part === GamePart.WAVE || part === GamePart.LEVEL) && start) {
                if (player.value!.getLife() <= 0) return;
                setTimeout(() => {
                    isInfoVisible.value = false;
                    animate();
                    if (part === GamePart.WAVE) {
                        gameStore.setWave(scene.getWave());
                        addToLogs(gameStore.logs, 'Next Wave!', LogType.SUCCESS);
                    } else if (part === GamePart.LEVEL) {
                        gameStore.setMoney(player.value!.getMoney());
                        gameStore.setLevel(scene.getLevel());
                        gameStore.setWave(1);
                        addToLogs(gameStore.logs, 'Next Level!', LogType.SUCCESS);
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
                // stopDesert();
                // stopForest();
                // stopUnderworld();
                // if (scene.value!.getWorldName() === 'Desert') playDesert();
                // if (scene.value!.getWorldName() === 'Forest') playForest();
                // if (scene.value!.getWorldName() === 'Underworld') playUnderworld();
                gameStore.setWave(1);
                gameStore.setLevel(1);
                gameStore.setWorld(scene.getWorldName());
                gameStore.setLife(player.value!.getLife());
                gameStore.setMoney(player.value!.getMoney());
                addToLogs(gameStore.logs, 'Next World!', LogType.SUCCESS);
                cancelAnimationFrame(animationRef.value);
            }
            gamePart.value = null;
        }
        const gameReset = () => {
            // stopDesert();
            // stopForest();
            // stopUnderworld();
            cancelAnimationFrame(animationRef.value);
            scene.setWave(1);
            scene.setLevel(1);
            scene.setWorld(1);
            gameStore.setWave(1);
            gameStore.setLevel(1);
            gameStore.setWorld(scene.getWorldName());
            gameStore.logs.slice(0, gameStore.logs.length);
            gameStore.setLogs([]);
        }
        const decreasePlayerLife = (enemy: any, index: number) => {
            const worldData = scene.getCurrentWorldData();
            if (enemy.getWaypointIndex() === worldData.waypoints.length - 1) {
                player.value!.setLife(player.value!.getLife() - 1);
                addToLogs(gameStore.logs, 'Lost life!', LogType.FAILURE);
                gameStore.setLife(player.value!.getLife());
                enemies.value.splice(index, 1);
                // playLostLife();
                if (player.value!.getLife() <= 0) {
                    appStore.setEndGame(GameResult.DEFEAT)
                    gameReset();
                }
                if (enemies.value.length === 0) increaseWave();
            }
        }

        const increaseWave = () => {
            if (scene.getWave() >= scene.getCurrentWorldData().enemies.length) increaseLevel();
            else {
                gamePart.value = GamePart.WAVE;
                scene.setWave(scene.getWave() + 1);
                enemies.value = spawnEnemies(context2D.value!, scene);
            }
        }

        const increaseLevel = () => {
            if (scene.getLevel() >= scene.getMaps().length) changeWorld();
            else {
                gamePart.value = GamePart.LEVEL;
                scene.setLevel(scene.getLevel() + 1);
                towers.value.splice(0, towers.value.length);
                towers.value = [];
                activeSubstructure = null;
                substructures.value = fillSubstructures(context2D.value!, scene!);
                scene.setWave(1);
                enemies.value = spawnEnemies(context2D.value!, scene!);
                player.value!.setMoney(((scene.getWorld() * 100) + ((scene.getLevel() - 1) * 20)));
                contextMenu.value = null;
            }
        }

        const changeWorld = () => {
            if (scene.getWorld() >= scene.getWorldsLength()) {
                appStore.setEndGame(GameResult.WIN);
                player.value!.setScore(player.value!.getScore() + player.value!.getLife() * 100);
                gameStore.setScore(player.value!.getScore());
                gameReset();
            } else {
                scene.setWave(1);
                scene.setLevel(1);
                scene.setWorld(scene.getWorld() + 1);
                towers.value.splice(0, towers.value.length);
                towers.value = [];
                activeSubstructure = null;
                start.value = false;
                substructures.value = fillSubstructures(context2D.value!, scene!);
                enemies.value = spawnEnemies(context2D.value!, scene!);
                player.value!.setLife(player.value!.getLife() + 3);
                player.value!.setMoney(100 * scene.getWorld());
                contextMenu.value = null;
            }
        }
        const handleTacticalMode = () => {
            if (!tacticalMode) animate();
            else cancelAnimationFrame(animationRef.value);
            tacticalMode.value = !tacticalMode;
            refreshAssets();
        }
        onMounted(() => {
            const canvas = <HTMLCanvasElement>document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvasRef.value = canvas;
            context2D.value = ctx;
            initCanvas.value = true;
            // console.log('mounted');
        });

        watch(initCanvas, () => {
            // scene.value = new Scene();
            player.value = new Player();
            if (initCanvas) initialize();
        });

        watch(isInitialized, () => {
            if (isInitialized) {
                const image = new Image();
                image.src = scene.getCurrentMap();
                image.onload = () => { gameTransition(GamePart.START); }
                console.log('mou');
            }
        });

        watch(start, () => {
            console.log(start.value);
            if (isInitialized) {
                if (start) gameTransition(GamePart.START);
                else gameTransition(GamePart.WORLD);
            }
        });
        watch(gamePart, () => {
            if (initCanvas && gamePart) {
                cancelAnimationFrame(animationRef.value);
                gameTransition(gamePart);
            }
        });
        return {
            activeSubstructure,
            info,
            time,
            start,
            // setStart,
            isInfoVisible,
            tacticalMode,
            handleTacticalMode,
        }
    }
}

</script>
<template>
    <div class="canvasWrapper">
        <div class="tacticalModeBtn">
            <i @click="handleTacticalMode" class="fa fa-pause-circle-o" aria-hidden="true"></i>
        </div>
        <span v-if="tacticalMode" class="tacticalMode">Tactical Mode is Active</span>
        <TransitionInfo v-if="isInfoVisible" :info="info" :time="time" :start="start" :setStart="setStart" />
        <canvas id="canvas" ref="canvasRef" class="sceneCanvas"></canvas>
    </div>
</template>
<style lang="scss">
@import '../assets/scss/_variables.scss';

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
        animation-delay: 3000ms;
        animation-name: myAnimation;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        transform: scale(0);
        z-index: 100;

        i {
            transition-duration: .4s;

            &:hover {
                cursor: pointer;
                color: $primaryColor;
            }
        }

        @keyframes myAnimation {
            0% {
                transform: scale(0);
            }

            100% {
                transform: scale(1);
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
        z-index: 3;

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

        i {
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