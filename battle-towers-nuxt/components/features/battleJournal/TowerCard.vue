
<template>
    <div class="card">
        <h3>{{ name }} Tower</h3>
        <div class="imgWrapper">
            <img :src="img" :alt="`${name} Tower`" />
        </div>
        <p class="health">Damage: {{ damage }}</p>
        <p class="money">Money: {{ money }}</p>
        <p class="speed">Speed: {{ speed }} FPS</p>
        <p class="opponent">
            <span>Best target</span>
            <span>{{ opponent }} Orc</span>
        </p>
    </div>
    <!-- <h2>ELO</h2> -->
</template>
<script lang="ts">

export default {
    name: 'TowerCard',
    props: {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        damage: {
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
        opponent: {
            type: String,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/variables';

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