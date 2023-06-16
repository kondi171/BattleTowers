import styles from '@/assets/scss/modules/Loading.module.scss';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.loaders}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h2>Loading</h2>
        </div>
    );
}

export default Loading;