import { useSpring, animated } from 'react-spring';
import { GameResult } from '@/typescript/enums';
import { AppContext, AppContextType } from '../AppContext';
import styles from '@/assets/scss/modules/EndState.module.scss';
import { useContext, useState, useEffect } from 'react';
import Button from '@/components/features/Button';

interface EndProps {
    gameResult: GameResult
}

const End = ({ gameResult }: EndProps) => {
    const { playGameOver, stopGameOver, playWin, stopWin, playMenu } = useContext(AppContext) as AppContextType;

    const stateAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 400 },
    });
    const { score, setEndGame, setIsGameStart } = useContext(AppContext) as AppContextType;
    const [isNewBest, setIsNewBest] = useState<boolean>(false);
    const handleRestart = () => {
        setEndGame(GameResult.UNPLAYED);
        stopWin();
        stopGameOver();
    }
    const handleBackToMenu = () => {
        setIsGameStart(false);
        setEndGame(GameResult.UNPLAYED);
        stopWin();
        stopGameOver();
        playMenu();
    }

    useEffect(() => {
        if (gameResult === GameResult.WIN) playWin();
        else if (gameResult === GameResult.DEFEAT) playGameOver();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameResult]);

    useEffect(() => {
        if (score > Number(localStorage.getItem("score"))) {
            localStorage.setItem("score", `${score}`);
            setIsNewBest(true);
        }
    }, [score]);

    return (
        <animated.section className={styles.endState} style={stateAnimation}>
            {gameResult === GameResult.WIN ?
                <>
                    <h2>Congratulations!</h2>
                    <h3>You finished the game with score: {score} {isNewBest && <span>New Best!</span>}</h3>
                    <h3>Do you want to play again?</h3>
                </> :
                <>
                    <h2>Game Over!</h2>
                    <h3>Your score: {score} {isNewBest && <span>New Best!</span>}</h3>
                    <h3>Do you want to play again?</h3>
                </>
            }
            <div className={styles.btns}>
                <Button name="Restart" click={handleRestart} />
                <Button name="Back to Menu" click={handleBackToMenu} />
            </div>
        </animated.section>
    );
}

export default End;