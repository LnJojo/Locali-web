import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import UserContext from '../components/UserContext'

export default function Contact() {

  const { user } = useContext(UserContext)
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  if (user) router.push('/profile')

  return (
    <><Head>
      <title>Login - Local.i</title>
    </Head>
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'gray',
                brandAccent: 'darkblue',
              },
            },
          },
        }}
      />
    </>
  )
}