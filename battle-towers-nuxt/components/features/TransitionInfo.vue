<template>
    <div class="transitionInfo">
        <h3 v-if="info === GamePart.START || info === GamePart.WORLD" @click="emit('setStart')">Ready?
            <br />Click to Start!
        </h3>
        <h3 v-else>Next {{ info }} in {{ time }}...</h3>
    </div>
</template>
  
<script lang="ts">
import { ref } from 'vue';
import { GamePart } from '~/typescript/enums';

export default {
    name: 'TransitionInfo',
    props: {
        info: {
            type: String,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        start: {
            type: Boolean,
            required: true
        }
    },
    setup(props, { emit }) {
        const start = ref(props.start);
        return {
            GamePart,
            start,
            emit,
        };
    }
};
</script>
  
<style lang="scss" scoped>
@import '~/assets/scss/variables';

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
</style>
  