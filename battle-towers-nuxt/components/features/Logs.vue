<template>
    <section class="logs">
        <div v-for="(log, index) in logs.slice().reverse()" :key="index" class="text">
            <div class="row">
                <span :class="log.type === LogType.SUCCESS ? 'success' : 'failure'">{{ log.content }}</span>
                <span class="time">{{ log.time }}</span>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">

import { LogType } from '~/typescript/enums';
import { useGameStore } from '~/stores/game';

export default {
    name: 'Logs',
    setup() {
        const gameStore = useGameStore();

        return {
            logs: gameStore.logs,
            LogType
        };
    }
};
</script>
  
<style lang="scss" scoped>
@import '~/assets/scss/variables';

.logs {
    font-size: .8rem;
    opacity: .7;
    padding: .4rem;
    border-radius: 4px;
    background-color: #000;
    color: $fontColor;
    width: 100%;
    height: 190px;
    max-height: 190px;
    overflow-y: hidden;
    line-height: 250%;
    outline-offset: 4px;
    outline: 2px solid $primaryColor;

    .time {
        color: $fontColor;
        padding: .5rem;
    }

    .row {
        display: flex;
        align-items: center;
        background-color: $bgColor;
        border-radius: 4px;
        padding: 1rem;
        margin: .4rem 0;
        justify-content: space-between;
    }

    .failure {
        color: $errorColor;
        padding: .5rem;
    }

    .success {
        color: $successColor;
        padding: .5rem;
    }

    .info {
        color: $fontColor;
    }
}
</style>