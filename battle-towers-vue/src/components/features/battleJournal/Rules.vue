<template>
    <div>
        <h2 class="rulesHeader">Getting Started</h2>
        <p class="rulesParagraph">
            Your goal is to defend each of the three worlds from the dangerous orcs without losing all your lives. To do
            this, you need to build towers, each of them is better or worse against different types of enemies (details can
            be found in the <strong>Towers</strong> tab). If you defeat an orc, you will increase your score and receive a
            certain amount of money which you can use to build or upgrade towers. But beware, there are different types of
            orcs that will make it difficult to reach your goal. (Detailed information can be found in the
            <strong>Enemies</strong> tab).
        </p>
        <h2 class="rulesHeader">Worlds</h2>
        <p class="rulesParagraph">
            Defense is not easy because you have to survive three worlds, each of them has 3 levels, and in each level, you
            have to survive 3 waves, each wave is more dangerous than the previous one.
        </p>
        <h2 class="rulesHeader">Resources</h2>
        <p class="rulesParagraph">
            You start the game with <strong class="health">10 lives</strong> and <strong class="money">100 bills</strong>.
            For each survived world, your bills are set to <strong class="money">100 bills</strong>, <strong
                class="money">200 bills</strong>, or <strong class="money">300 bills</strong> according to the current
            world. For each survived level, <strong class="money">20 bills</strong> extra are added to your starting bills
            for building or upgrading towers. If you survive a world, you get an extra <strong class="health">3
                lives</strong>! Your score is the sum of each orc you defeat plus <strong>100 points</strong> for <strong
                class="health">each life</strong> you have saved, which is added at the end of the game.
        </p>
        <h2 class="rulesHeader">Placing Towers</h2>
        <p class="rulesParagraph">
            <span>You can place the towers only on specific placements</span>
            <img src="@/assets/img/journal/towers/substructure.png" alt="Substructure of tower" />
            <span>If the substructure is hovered over, it will be highlighted</span>
        </p>
        <h2 class="rulesHeader">Tactical Mode</h2>
        <p class="rulesParagraph">
            Click on <strong><i class="fa fa-pause-circle-o" aria-hidden="true"></i></strong> visible on the bottom right
            corner while playing to activate tactical mode. When tactical mode is active, time freezes, but you can place
            towers in a more thoughtful way.
        </p>
        <h2 class="goodLuck">Have fun and good luck!</h2>
    </div>
</template>
  
<script>
export default {
    name: 'Rules',
};
</script>
  
<style scoped lang="scss">
@import './../../../assets/scss/variables';

.rulesHeader {
    text-align: center;
    margin: 1rem;
    color: $primaryColor;
    font-size: 4rem;
    font-family: $supportFont;
    margin: 3rem 0;
}

.rulesParagraph {
    font-size: 2rem;
    line-height: 200%;
    color: $fontColor;
    text-align: justify;
    padding: 0 6rem;
    font-family: $primaryFont;
    text-align: center;

    span {
        display: block;
        text-align: center;
    }

    img {
        margin-top: 10px;
        width: 20%;
        height: 20%;
    }

    strong {
        color: $primaryColor;
    }

    .health {
        color: $errorColor;
    }

    .money {
        color: $successColor;
    }
}

.goodLuck {
    color: rebeccapurple;
}

.enemies {
    margin-top: 3rem;
}</style>