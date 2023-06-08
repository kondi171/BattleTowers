<template>
    <section :class="[isHelpOpen ? 'battleJournal active' : 'battleJournal']">
        <div class="modal">
            <h3 class="header">Battle Journal</h3>
            <div class="articles">
                <article :class="[activeArticle === BattleJournalPage.RULES ? 'active' : '']"
                    @click="handleActive(BattleJournalPage.RULES)">
                    <img :src="rules" alt="Rules icon" />
                    <h3>Rules</h3>
                </article>
                <article :class="[activeArticle === BattleJournalPage.ENEMIES ? 'active' : '']"
                    @click="handleActive(BattleJournalPage.ENEMIES)">
                    <img :src="enemies" alt="Enemies icon" />
                    <h3>Enemies</h3>
                </article>
                <article :class="[activeArticle === BattleJournalPage.TOWERS ? 'active' : '']"
                    @click="handleActive(BattleJournalPage.TOWERS)">
                    <img :src="towers" alt="Towers icon" />
                    <h3>Towers</h3>
                </article>
            </div>
            <div class="content">
                <Rules v-if="activeArticle === BattleJournalPage.RULES" />
                <Enemies v-if="activeArticle === BattleJournalPage.ENEMIES" />
                <Towers v-if="activeArticle === BattleJournalPage.TOWERS" />
            </div>
            <i class="close fa fa-times" @click="appStore.setIsHelpOpen(false)" />
        </div>
    </section>
</template>
  
<script lang="ts">
import { ref, onMounted } from 'vue';
import enemies from './../../../assets/img/journal/contents/enemies.png';
import towers from './../../../assets/img/journal/contents/towers.png';
import rules from './../../../assets/img/journal/contents/rules.png';
import { BattleJournalPage } from '@/typescript/enums';
import Rules from './Rules.vue';
import Enemies from './Enemies.vue';
import Towers from './Towers.vue';
import { useAppStore } from '@/stores/app';

export default {
    name: 'BattleJournal',
    components: {
        Rules,
        Enemies,
        Towers
    },
    setup(props) {
        const appStore = useAppStore();
        const activeArticle = ref(BattleJournalPage.RULES);
        // const BattleJournalPage = BattleJournalPage;
        const handleActive = (page: BattleJournalPage) => {
            console.log(activeArticle.value);
            const articles = document.querySelectorAll('article');
            articles.forEach((article) => {
                article.classList.remove('active');
            });
            // articles[0].classList.add('active')
            if (!event) return;
            else {
                const target = event.target;
                if (!target) return;
                target.closest('article')?.classList.add('active');
                activeArticle.value = page;
            }
        };

        onMounted(() => {
            const modal = document.querySelector('battleJournal');
            if (modal) modal.classList.add('active');
        });

        return {
            appStore,
            BattleJournalPage,
            activeArticle,
            rules,
            enemies,
            towers,
            handleActive,
        };
    }
};
</script>
  
<style scoped lang="scss">
@import './../../../assets/scss/variables';

.battleJournal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    transition-duration: .4s;
    // opacity: 1;
    background-color: rgba($color: #000000, $alpha: .9);
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
        transition-duration: .4s;
        opacity: 1;
    }

    .modal {
        position: relative;
        background-color: $bgColor;
        height: 80%;
        width: 60%;
        border-radius: 4px;
        border: 2px solid $secondaryColor;
        box-shadow: 0 0 2px 2px $secondaryColor;

        .close {
            position: absolute;
            right: -3rem;
            top: -4rem;
            font-size: 6rem;
            color: $primaryColor;
            transition-duration: .4s;

            &:hover {
                transform: rotate(180deg);
                cursor: pointer;
                color: $secondaryColor;
            }
        }

        .header {
            font-size: 6rem;
            text-align: center;
            font-family: $titleFont;
            padding: 2rem;
            background-image: linear-gradient(180deg, $primaryColor 0%, $bgColor 100%);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-stroke: 2px $bgColor;
            filter: drop-shadow(0 0 5px $secondaryColor);
            border-bottom: 2px solid $secondaryColor;
        }

        .overlay {
            background-color: $bgColor;
            width: 100%;
            z-index: 10;
        }

        .articles {
            position: absolute;
            top: 20%;
            display: flex;
            margin-left: -8%;
            flex-direction: column;
            color: $bgColor;
            z-index: -10;

            article {
                display: flex;
                align-items: center;
                width: 25vmin;
                height: 8vmin;
                text-align: center;
                border: 2px solid $primaryColor;
                padding: 10px;
                border-radius: 4px;
                margin: 5% 0;
                background-color: $primaryColor;
                transition-duration: .4s;

                &.active {
                    transform: translateX(-50%);
                    background-color: $secondaryColor;
                    color: $fontColor;
                    transform: translateX(-50%);

                    & img {
                        filter: invert(98%) sepia(0%) saturate(7405%) hue-rotate(195deg) brightness(120%) contrast(58%);
                    }
                }

                h3 {
                    margin-left: 10%;
                }

                img {
                    width: 30%;
                    height: 80%;
                    filter: invert(4%) sepia(2%) saturate(3316%) hue-rotate(201deg) brightness(99%) contrast(80%);
                }

                &:hover {
                    cursor: pointer;
                    background-color: $secondaryColor;
                    color: $fontColor;
                    transform: translateX(-50%);

                    & img {
                        filter: invert(98%) sepia(0%) saturate(7405%) hue-rotate(195deg) brightness(120%) contrast(58%);
                    }
                }
            }
        }

        .content {
            max-height: 65vh;
            overflow-y: auto;

            h2 {
                text-align: center;
                margin: 1rem;
                color: $fontColor;
                font-size: 5rem;
                font-family: $primaryFont;
            }

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
        }
    }
}
</style>