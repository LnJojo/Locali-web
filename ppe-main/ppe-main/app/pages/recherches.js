import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import UserContext from '../components/UserContext'
import { supabase } from './api/supabase'

export default function Recherches({
  profiles
}) {

  const { user, logout, loading } = useContext(UserContext)
  const router = useRouter()
  const [com, setCom] = useState(0)

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login')
    }

    if (user) {
      async function fetchProfile(user) {
        const { data } = await supabase
          .from('profile')
          .select('com')
          .eq('email', user.email)

        if (data.length == 0) {
          const { error } = await supabase
            .from('profile')
            .insert([{ email: user.email }])
        } else {
          setCom(data[0].com)
        }
      }
      fetchProfile(user)
    }

  }, [user, loading, router])

  const RecherchesNom = function () {
    router.push('/recherchesNom')
  }

  const RecherchesCp = function () {
    router.push('/recherchesCp')
  }

  return (
    <>
      <Head>
        <title>Recherches - Local.i</title>
      </Head>
      {!(user || loading) ?
        <p>Redirecting...</p>
        :
        <>
          <br></br>
          <div>
            <p className='wt-block font-bold'> Vous pouvez rechercher un commerçant </p>
          </div>
          <br></br>
          <button className='wt-button'
            onClick={RecherchesNom}>
            Recherches par nom
          </button>
          <br></br>
          <button className='wt-button'
            onClick={RecherchesCp}>
            Recherches par code postal
          </button>
        </>
      }
    </>
  )
}

export async function getServerSideProps() {
  let { data: profiles } = await supabase
    .from('profile')
    .select('id, email, lastname, firstname, com')
  return {
    props: {
      profiles: profiles
    }
  };
}