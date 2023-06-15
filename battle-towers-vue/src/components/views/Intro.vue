<template>
    <section class="introState">
        <h2 class="attention">
            <span>Attention!</span> {{ currentAttentionMessage }}<span>|</span>
        </h2>
        <button ref="btnRef" class="introButton" @click="handleAccept">
            <span class="btnInfo" ref="infoRef">{{ buttonInfo }}</span>
        </button>
    </section>
</template>
  
<script lang="ts">
import { ref, onMounted } from 'vue';

interface IntroProps {
    setChangeState: (accept: boolean) => void;
}

export default {
    props: {
        setChangeState: {
            type: Function as unknown as () => IntroProps['setChangeState'],
            required: true,
        },
    },
    setup(props: IntroProps) {
        const infoRef = ref<HTMLSpanElement | null>(null);
        const btnRef = ref<HTMLButtonElement | null>(null);

        const attentionMessage = 'For best experience and properly game working, we recommend min resolution 1280 x 768.';
        const currentAttentionMessage = ref('');
        const buttonInfo = ref('Accept');

        const handleAccept = () => {
            const span = infoRef.value;
            const btn = btnRef.value;
            if (span && btn) {
                span.classList.add('fadeOut');
                setTimeout(() => {
                    buttonInfo.value = 'Have a nice play :)';
                    btn.classList.add('fadeIn');
                    span.classList.add('fadeIn');
                }, 400);
            }
            setTimeout(() => {
                props.setChangeState(true);
            }, 2000);
        };

        const animateAttentionMessage = () => {
            let currentLetter = 0;
            let delay = 0;
            let animatedText = '';
            const letterInterval = setInterval(() => {
                delay++;
                if (delay >= 30) {
                    animatedText += attentionMessage[currentLetter];
                    currentLetter++;
                    if (currentLetter >= attentionMessage.length) clearInterval(letterInterval);
                    else currentAttentionMessage.value = animatedText;
                }
            }, 50);
        };

        const showButton = () => {
            const btn = btnRef.value;
            if (btn) {
                btn.classList.add('visible');
            }
        };

        onMounted(() => {
            animateAttentionMessage();
            setTimeout(() => {
                showButton();
            }, 5000);
        });

        return {
            infoRef,
            btnRef,
            currentAttentionMessage,
            buttonInfo,
            handleAccept,
        };
    },
};
</script>

<style lang="scss" scoped>
@import './../../assets/scss/variables';

.introState {

    .introButton {
        position: fixed;
        bottom: 7%;
        left: 25%;
        width: 20%;
        right: 25%;
        display: block;
        text-align: center;
        margin: 0 auto;
        height: 5vh;
        border-radius: 4px;
        border: 2px solid $primaryColor;
        background-color: transparent;
        color: $primaryColor;
        font-size: 2rem;
        font-weight: bold;
        transition-duration: .4s;
        outline: 2px solid $secondaryColor;
        opacity: 0;

        &.visible {
            opacity: 1;
        }

        .fadeOut {
            transition-duration: .4s;
            opacity: 0;
        }

        .fadeIn,
        &.fadeIn,
        &:hover {
            cursor: pointer;
            transition-duration: .4s;
            opacity: 1;
            border-color: $primaryColor;
            background-color: $secondaryColor;
            color: $bgColor;
            outline-offset: 4px;
            outline-color: $primaryColor;
        }
    }

    .attention {
        position: fixed;
        bottom: 20%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 70vw;
        font-size: 3.3rem;
        text-align: center;
        line-height: 150%;
        color: $fontColor;
        transition-duration: .4s;

        span {
            color: $primaryColor;

            &:last-of-type {
                font-size: 4rem;
                animation: cursor infinite .4s ease-in-out;
            }

            @keyframes cursor {
                0% {
                    opacity: 1;
                }

                50% {
                    opacity: 0;
                }

                100% {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
