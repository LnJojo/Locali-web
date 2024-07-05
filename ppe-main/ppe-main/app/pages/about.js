import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

function About() {
  return (
    <><Head>
      <title>About - Local.i</title>
    </Head>
      <section className="tbs-section dark:bg-gray-600 dark:text-white">
        <div className="wt-title">
          A propos de Local.i
        </div>
        <div className="wt-block">
          <p>Quel plaisir de vous retrouver sur notre platefrome!</p>
          <br></br>
          <p>Local.i est né en 2022 dans le cadre d un projet scolaire à partir d un objectif très simple. Créer une communauté autour de nos commerces de proximité, qui sont le coeur de la vie de nos centres bourgs.</p>
          <br></br>
          <p>Si vous avez des questions surtout n hésitez pas. Vous pouvez cliquer <Link href='/contact' className="wt-block font-bold">ici. </Link></p>
        </div>
      </section>
    </>
  )
}
export default About