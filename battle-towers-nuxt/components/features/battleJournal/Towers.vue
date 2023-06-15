<template>
    <div>
        <h2>Level 1</h2>
        <div class="cards">
            <TowerCard name="Cannon" :img="cannonTower1" :damage="cannonData.levels[0].damage"
                :money="cannonData.levels[0].money" :speed="cannonData.levels[0].speed" opponent="Soldier" />
            <TowerCard name="Minigun" :img="minigunTower1" :damage="minigunData.levels[0].damage"
                :money="minigunData.levels[0].money" :speed="minigunData.levels[0].speed" opponent="Scout" />
            <TowerCard name="Missile" :img="missileTower1" :damage="missileData.levels[0].damage"
                :money="missileData.levels[0].money" :speed="missileData.levels[0].speed" opponent="Warrior" />
        </div>
        <h2>Level 2</h2>
        <div class="cards">
            <TowerCard name="Cannon" :img="cannonTower2" :damage="cannonData.levels[1].damage"
                :money="cannonData.levels[1].money" :speed="cannonData.levels[1].speed" opponent="Soldier" />
            <TowerCard name="Minigun" :img="minigunTower2" :damage="minigunData.levels[1].damage"
                :money="minigunData.levels[1].money" :speed="minigunData.levels[1].speed" opponent="Scout" />
            <TowerCard name="Missile" :img="missileTower2" :damage="missileData.levels[1].damage"
                :money="missileData.levels[1].money" :speed="missileData.levels[1].speed" opponent="Warrior" />
        </div>
        <h2>Level 3</h2>
        <div class="cards">
            <TowerCard name="Cannon" :img="cannonTower3" :damage="cannonData.levels[2].damage"
                :money="cannonData.levels[2].money" :speed="cannonData.levels[2].speed" opponent="Soldier" />
            <TowerCard name="Minigun" :img="minigunTower3" :damage="minigunData.levels[2].damage"
                :money="minigunData.levels[2].money" :speed="minigunData.levels[2].speed" opponent="Scout" />
            <TowerCard name="Missile" :img="missileTower3" :damage="missileData.levels[2].damage"
                :money="missileData.levels[2].money" :speed="missileData.levels[2].speed" opponent="Warrior" />
        </div>
    </div>
</template>
<script lang="ts">
import TowerCard from './TowerCard.vue';

import cannonTower1 from '~/assets/img/journal/towers/cannon1.png';
import minigunTower1 from '~/assets/img/journal/towers/mg1.png';
import missileTower1 from '~/assets/img/journal/towers/missile1.png';

import cannonTower2 from '~/assets/img/journal/towers/cannon2.png';
import minigunTower2 from '~/assets/img/journal/towers/mg2.png';
import missileTower2 from '~/assets/img/journal/towers/missile2.png';

import cannonTower3 from '~/assets/img/journal/towers/cannon3.png';
import minigunTower3 from '~/assets/img/journal/towers/mg3.png';
import missileTower3 from '~/assets/img/journal/towers/missile3.png';

import cannonData from '~/resources/towers/cannon.json';
import minigunData from '~/resources/towers/minigun.json';
import missileData from '~/resources/towers/missile.json';

export default {
    name: 'Towers',
    components: {
        TowerCard
    },
    data() {
        return {
            cannonTower1,
            minigunTower1,
            missileTower1,
            cannonTower2,
            minigunTower2,
            missileTower2,
            cannonTower3,
            minigunTower3,
            missileTower3,
            cannonData,
            minigunData,
            missileData
        };
    }
};
</script>
<style lang="scss" scoped>
@import '~/assets/scss/variables';

h2 {
    text-align: center;
    margin: 1rem;
    color: $fontColor;
    font-size: 5rem;
    font-family: $primaryFont;
}

.cards {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid $primaryColor;
        width: 30%;
        padding: 20px;
        color: $fontColor;
        line-height: 250%;
        font-size: 1.5rem;
        border-radius: 4px;
        background-color: darken($bgColor, 4%);

        .imgWrapper {
            height: 15vh;
            margin: 1rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .health {
            color: $errorColor;
        }

        .money {
            color: $successColor;
        }

        .score {
            color: $primaryColor;
        }

        .speed {
            color: gold;
        }

        .opponent {
            span {
                display: block;
            }

            color: rebeccapurple;
            text-align: center;
        }
    }
}
</style>