<template>
    <div class="card">
        <h3>{{ name }} Orc</h3>
        <div class="imgWrapper">
            <img :src="img" :alt="`${name} Orc`" />
        </div>
        <p class="health">Health: {{ health }}</p>
        <p class="money">Money: {{ money }}</p>
        <p class="speed">Speed: {{ speed }} FPS</p>
        <p class="score">Score: {{ score }}</p>
        <p class="opponent">
            <span>Best tower</span>
            <span>{{ opponent }}</span>
        </p>
    </div>
</template>
<script lang="ts">


export default {
    name: 'EnemyCard',
    props: {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        health: {
            type: Number,
            required: true
        },
        money: {
            type: Number,
            required: true
        },
        speed: {
            type: Number,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        opponent: {
            type: String,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

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