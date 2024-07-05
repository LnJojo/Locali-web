import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import UserContext from '../components/UserContext'
import { supabase } from './api/supabase'

export default function Contact({
  profiles
}) {

  const { user, logout, loading } = useContext(UserContext)
  const router = useRouter()
  const [com, setCom] = useState(0)
  const [profileEmail, setProfileEmail] = useState(null)

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
          setProfileEmail(user.email)
        }
      }
      fetchProfile(user)
    }

  }, [user, loading, router])

  const onClickLogout = function () {
    logout()
  }

  const usechangeinfoUser = function () {
    router.push('/changeInfoUser')
  }

  const devenirCommercant = function () {
    router.push('/devenirCommercant')
  }

  const commerce = function () {
    router.push(`/commercantsUnique/${profileEmail}`)
  }

  const modifCommerce = function () {
    router.push('/changeInfoCommercant')
  }

  const writeArticles = function () {
    router.push('/writeArticles')
  }

  return (
    <>
      <Head>
        <title>Profil - Local.i</title>
      </Head>
      {!(user || loading) ?
        <p>Redirecting...</p>
        :
        <>
          <button
            className="wt-buttonGauche"
            onClick={onClickLogout}
          >
            Déconnexion
          </button>
          <div>
            <br></br>
            <p>Bienvenue {user.email} </p>
            <br></br>
            <p className='wt-block font-bold'>Vos informations:</p>
            <ul>
              {profiles.map((profile) => (
                <li key={profile.id}>
                  <p className='wt-block'>
                    {user.email == profile.email ? 'Prénom: ' + (profile.firstname ? profile.firstname : 'A remplir dans "Modifier vos informations" ') : ''}
                  </p>
                  <p className='wt-block'>
                    {user.email == profile.email ? 'Nom: ' + (profile.lastname ? profile.lastname : 'A remplir dans "Modifier vos informations" ') : ''}
                  </p>
                </li>
              ))}
            </ul>
            <br></br>
          </div>
          <br></br>
          <button className='wt-buttonGauche'
            onClick={usechangeinfoUser}>
            Modifier vos informations
          </button>

          {com === 1 ?
            <>
              <button className='wt-buttonGauche' onClick={commerce}>
                Mon commerce
              </button>
              <button className='wt-buttonGauche' onClick={modifCommerce}>
                Modifier mon commerce
              </button>
              <button className='wt-buttonGauche' onClick={writeArticles}>
                Poster une offre
              </button>
            </>
            :
            <button className='wt-buttonGauche' onClick={devenirCommercant}>
              Devenir Commercant
            </button>
          }
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