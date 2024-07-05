import { React, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import equipe from '/assets/equipe.png'
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ulyegzjugeundkwapdac.supabase.co'
const supabasKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMjY0MTgsImV4cCI6MTk4NjYwMjQxOH0.IA6Uk7vw4LKMjrMz76uHC0TV_a9XGWex7huwSP_o7zQ"

export default function Contacts() {
  const [testData, setTestData] = useState(null)
  const [errorData, setErrorData] = useState(null)
  const supabase = createClient(supabaseUrl, supabasKey)
  const [userData, setData] = useState({});

  const onSubmit = async function (e) {
    e.preventDefault();
    const lastName = userData.lastname;
    const firstName = userData.firstname;
    const email = userData.email;
    const message = userData.message;
    let { data, error } = await supabase
      .from('contacts')
      .insert([
        { firstname: firstName, lastname: lastName, email: email, message: message },
      ])
  }

  return (
    <><Head>
      <title>Contact - Local.i</title>
    </Head>
      <section className="tbs-section dark:bg-gray-600 dark:text-white">
        <div className="wt-title">
          Contactez-nous avec le formulaire ci-dessous:
        </div>
        <form onSubmit={onSubmit}>
          <div className="wt-positionForm">
            <div className="wt-form">
              <label className="wt-label">
                Prénom
              </label>
              <input
                type="text"
                name="Firstname"
                placeholder="Pierre"
                className="wt-input"
                value={userData.firstname}
                onChange={(e) =>
                  setData({ ...userData, ...{ firstname: e.target.value } })
                }
              ></input>
            </div>
            <div className="wt-form">
              <label className="wt-label">
                Nom
              </label>
              <input
                type="text"
                name="Lastname"
                placeholder="DUPONT"
                className="wt-input"
                value={userData.lastname}
                onChange={(e) =>
                  setData({ ...userData, ...{ lastname: e.target.value } })
                }
              ></input>
            </div>
            <div className="wt-form">
              <label className="wt-label">
                Email
              </label>
              <input
                type="text"
                name="Email"
                placeholder="pierre.dupont@gmail.com"
                className="wt-input"
                value={userData.email}
                onChange={(e) =>
                  setData({ ...userData, ...{ email: e.target.value } })
                }
              ></input>
            </div>
            <div className="wt-form">
              <label className="wt-label">
                Message
              </label>
              <input
                type="text"
                name="Message"
                placeholder="Votre message..."
                className="wt-input"
                value={userData.message}
                onChange={(e) =>
                  setData({ ...userData, ...{ message: e.target.value } })
                }
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="wt-button">
            Envoyer le message
          </button>
        </form>
        <div className="mb-6">
          <center>
            <br></br>
            <br></br>
            <b>L équipe LOCAL.I </b>
            <br></br>
            <Image src={equipe} alt="equipe" width={730} height={660} />
            <u><a href="mailto: contact.locali@gmail.com"> contact.locali@gmail.com</a></u><br></br>
            <u><a href="tel:+33651353361">tel: 06 51 35 33 61</a></u>
          </center>
        </div>
      </section>
    </>
  )
}