import Head from 'next/head'
import BattleTowers from '@/components/BattleTowers';
import AppProvider from '@/components/AppContext';

const Main = () => {
  return (
    <>
      <Head>
        <title>Battle Towers</title>
        <meta name="description" content="A Tower Defense game powered by Next" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider>
        <BattleTowers />
      </AppProvider>
    </>
  )
}
export default Main;