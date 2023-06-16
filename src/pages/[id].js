import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { emitGetGame, getSocket, init } from '@/utils/socket'
import MessageGame from '@/components/game/MessageGame'
import MessageAttacked from '@/components/game/MessageAttacked'
import MessageAttackedGlobal from '@/components/game/MessageAttackedGlobal'
import MessageBlocked from '@/components/game/MessageBlocked'
import MessageLostCard from '@/components/game/MessageLostCard'
import MessageCoup from '@/components/game/MessageCoup'
import DescartOneCard from '@/components/game/DescartOneCard'
import EndGameOption from '@/components/game/EndGameOption'
import Instructions from '@/components/common/Instructions'
import Main from '@/components/game/Main'
import MessageLost from '@/components/game/MessageLost'
import MessageWin from '@/components/game/MessageWin'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const idGame = router.query.id;
  console.log(idGame);

  const {
    user,
    game,
    attacker,
    attackerGlobal,
    blocker,
    variables,
    result,
    descart,
    coup
  } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }

    try {
      getSocket();

      emitGetGame(idGame, user?.username);
    } catch (error) {
      init(dispatch)
    }
  }, [user])

  return (
    <>
      <Head>
        <title>COUP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        !result ? (
          <div className="home">
            {
              game && game.state === 'initial' ? '' : game?.turn === user?.username ? (
                <MessageGame msg="Tu Turno" />
              ) : (
                <MessageGame msg={`Turno de ${game && game?.turn}`} />
              )
            }
            {
              attacker && (<MessageAttacked />)
            }
            {
              attackerGlobal && (<MessageAttackedGlobal />)
            }
            {
              blocker && (<MessageBlocked />)
            }
            {
              variables && (<MessageLostCard />)
            }
            {
              coup && (<MessageCoup />)
            }
            {
              descart && (<DescartOneCard />)
            }
            <EndGameOption />
            <Instructions position={'350px'} />
            <Main />
            <Controls />
            {
              game && game.state === 'initial' && (
                <Starting />
              )
            }
          </div>
        ) : result === 'lost'
          ? (<MessageLost />)
          : (<MessageWin />)
      }
    </>
  )
}
