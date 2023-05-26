<template>
    <div class="btnWrapper">
        <button class="button" @click="click">
            {{ name }}
            <div id="clip" class="clip">
                <div id="leftTop" class="corner"></div>
                <div id="rightBottom" class="corner"></div>
                <div id="rightTop" class="corner"></div>
                <div id="leftBottom" class="corner"></div>
            </div>
            <span id="rightArrow" class="arrow"></span>
            <span id="leftArrow" class="arrow"></span>
        </button>
    </div>
</template>
  
<script lang="ts">
import { defineProps } from 'vue';

export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        click: {
            type: Function,
            required: true,
        },
    },
};
</script>
  
<style lang="scss" scoped>
@import './../../assets/scss/variables';

.btnWrapper {
    text-align: center;

    .button {
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 11em;
        height: 4em;
        outline: none;
        transition: .1s;
        background-color: transparent;
        border: none;
        font-size: 13px;
        font-weight: bold;
        color: $fontColor;
        transform: scale(2);

        &:hover {
            cursor: pointer;

            & #rightArrow {
                background-color: #27c39f;
                left: -15%;
                animation: 0.6s ease-in-out both infinite alternate rightArrow8;
            }

            & #leftArrow {
                background-color: #27c39f;
                left: 103%;
                animation: 0.6s ease-in-out both infinite alternate leftArrow8;
            }

            & #leftTop {
                animation: 0.1s ease-in-out 0.05s both changeColor8,
                    0.2s linear 0.4s both lightEffect8;
            }

            & #rightTop {
                animation: 0.1s ease-in-out 0.15s both changeColor8,
                    0.2s linear 0.4s both lightEffect8;
            }

            & #rightBottom {
                animation: 0.1s ease-in-out 0.25s both changeColor8,
                    0.2s linear 0.4s both lightEffect8;
            }

            & #leftBottom {
                animation: 0.1s ease-in-out 0.35s both changeColor8,
                    0.2s linear 0.4s both lightEffect8;
            }

            & .corner {
                transform: scale(1.25) rotate(45deg);
            }

            & #clip {
                animation: 0.2s ease-in-out 0.55s both greenLight8;
                --color: #27c39f;
            }
        }

        #clip {
            --color: #2761c3;
            position: absolute;
            top: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            border: 5px double var(--color);
            box-shadow: inset 0px 0px 15px #195480;
            -webkit-clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
            clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        }

        .arrow {
            position: absolute;
            transition: 0.2s;
            background-color: #2761c3;
            top: 35%;
            width: 11%;
            height: 30%;
        }

        #leftArrow {
            left: -13.5%;
            -webkit-clip-path: polygon(100% 0, 100% 100%, 0 50%);
            clip-path: polygon(100% 0, 100% 100%, 0 50%);
        }

        #rightArrow {
            -webkit-clip-path: polygon(100% 49%, 0 0, 0 100%);
            clip-path: polygon(100% 49%, 0 0, 0 100%);
            left: 102%;
        }

        .corner {
            position: absolute;
            width: 4em;
            height: 4em;
            background-color: #2761c3;
            box-shadow: inset 1px 1px 8px #2781c3;
            transform: scale(1) rotate(45deg);
            transition: 0.2s;
        }

        #rightTop {
            top: -1.98em;
            left: 91%;
        }

        #leftTop {
            top: -1.96em;
            left: -3.0em;
        }

        #leftBottom {
            top: 2.10em;
            left: -2.15em;
        }

        #rightBottom {
            top: 45%;
            left: 88%;
        }
    }

    @keyframes changeColor8 {
        from {
            background-color: #2781c3;
        }

        to {
            background-color: #27c39f;
        }
    }

    @keyframes lightEffect8 {
        from {
            box-shadow: 1px 1px 5px #27c39f;
        }

        to {
            box-shadow: 0 0 2px #27c39f;
        }
    }

    @keyframes greenLight8 {
        from {}

        to {
            box-shadow: inset 0px 0px 32px #27c39f;
        }
    }

    @keyframes leftArrow8 {
        from {
            transform: translate(0px);
        }

        to {
            transform: translateX(10px);
        }
    }

    @keyframes rightArrow8 {
        from {
            transform: translate(0px);
        }

        to {
            transform: translateX(-10px);
        }
    }
}
</style>