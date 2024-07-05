import Head from 'next/head'
import UserContext from '../../components/UserContext'
import { supabase } from '../api/supabase'
import { useContext, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Articles({
  article, comments
}) {
  const { user } = useContext(UserContext)
  const supabase = useSupabaseClient()
  const [userData, setData] = useState({});

  return (
    <>
      <Head>
        <title> Local.i </title>
      </Head>
      <h1 className='wt-title'>
      </h1>
    </>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  let {
    data: articles,
    error,
    status,
  } = await supabase
    .from("articles")
    .select("id, title, content, email, category, tags")
    .eq("id", id)
    .single();

  let {
    data: comment,
    error2,
    status2,
  } = await supabase
    .from("comments")
    .select("id, email, message, idArticle")
    .eq("idArticle", id)
  if (error2) alert(error2.message)

  return {
    props: {
      article: articles,
      comments: comment,
    },
  };
}