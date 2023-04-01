import Button from '../features/Button';
import styles from './../../assets/scss/modules/EndState.module.scss';

type EndProps = {
    winner: boolean
}

const End = ({ winner }: EndProps) => {

    const handleRestart = () => {
        console.log('Restart');
    }
    const handleBackToMenu = () => {
        console.log('Back to menu');
    }

    return (
        <section className={styles.endState}>
            {winner ?
                <>
                    <h2>Congratulations!</h2>
                    <h3>You finished the game</h3>
                    <h3>Do you want to play again?</h3>
                </> :
                <>
                    <h2>Game Over!</h2>
                    <h3>Your score: 924</h3>
                    <h3>Do you want to play again?</h3>
                </>
            }

            <Button name="Restart" click={handleRestart} />
            <Button name="Back to Menu" click={handleBackToMenu} />
        </section>
    );
}

export default End;