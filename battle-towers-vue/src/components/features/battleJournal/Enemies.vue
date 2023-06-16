<template>
    <div class="cards enemies">
        <EnemyCard :name="soldierData.name" :img="soldierOrc" :health="soldierData.health" :money="soldierData.money"
            :speed="soldierData.speed" :score="soldierData.score" opponent="Cannon" />
        <EnemyCard :name="scoutData.name" :img="scoutOrc" :health="scoutData.health" :money="scoutData.money"
            :speed="scoutData.speed" :score="scoutData.score" opponent="Minigun" />
        <EnemyCard :name="warriorData.name" :img="warriorOrc" :health="warriorData.health" :money="warriorData.money"
            :speed="warriorData.speed" :score="warriorData.score" opponent="Missile" />
    </div>
</template>
<script lang="ts">

import soldierOrc from '@/assets/img/journal/enemies/soldierOrc.png';
import scoutOrc from '@/assets/img/journal/enemies/scoutOrc.png';
import warriorOrc from '@/assets/img/journal/enemies/warriorOrc.png';
import soldierData from '@/resources/enemies/soldier.json';
import scoutData from '@/resources/enemies/scout.json';
import warriorData from '@/resources/enemies/warrior.json';
import EnemyCard from './EnemyCard.vue';

export default {
    name: 'Enemies',
    components: {
        EnemyCard
    },
    data() {
        return {
            soldierOrc,
            scoutOrc,
            warriorOrc,
            soldierData,
            scoutData,
            warriorData
        };
    }
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.enemies {
    margin-top: 3rem;
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