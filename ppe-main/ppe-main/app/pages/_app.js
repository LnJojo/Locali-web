import '../styles/globals.css'
import '../styles/navbar.css'
import '../styles/map.css'
import Layout from '/components/Layout'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import {UserContextProvider} from '../components/UserContext'


export default function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <UserContextProvider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </SessionContextProvider>
  )
}
