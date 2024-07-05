import Head from 'next/head'
import { React, useContext } from 'react'
import UserContext from '../components/UserContext'
import bienv from '/assets/bienv.png'
import connection from '/assets/connection.png'
import Image from 'next/image'

export default function Home({
}) {

  const { user } = useContext(UserContext)

  function connect(user) {
    if (user) {
      return (
        <div class="wt-photoHome">
          <Image src={bienv} className="img" alt="bienv" />
        </div>
      )
    }
    else {
      return (
        <div class="wt-photoHome">
          <Image src={connection} className="img" alt="connection" />
        </div>
      )
    }
  }

  return (
    <> <Head>
      <title>Accueil - Local.i</title>
    </Head>
      <section className="tbs-section dark:bg-gray-600 dark:text-white">
        {connect(user)};
      </section>
    </>
  );
};