import { GameResult } from '../../enums';
import { AppContext, AppContextType } from '../AppContext';
import Button from '../features/Button';
import styles from './../../assets/scss/modules/EndState.module.scss';
import { useContext } from 'react';

type EndProps = {
    gameResult: GameResult
}

const End = ({ gameResult }: EndProps) => {
    const { score, setEndGame, setIsGameStart } = useContext(AppContext) as AppContextType;

    const handleRestart = () => { setEndGame(GameResult.UNPLAYED); }
    const handleBackToMenu = () => {
        setIsGameStart(false);
        setEndGame(GameResult.UNPLAYED);
    }

    return (
        <section className={styles.endState}>
            {gameResult === GameResult.WIN ?
                <>
                    <h2>Congratulations!</h2>
                    <h3>You finished the game</h3>
                    <h3>Do you want to play again?</h3>
                </> :
                <>
                    <h2>Game Over!</h2>
                    <h3>Your score: {score}</h3>
                    <h3>Do you want to play again?</h3>
                </>
            }

            <Button name="Restart" click={handleRestart} />
            <Button name="Back to Menu" click={handleBackToMenu} />
        </section>
    );
}

export default End;