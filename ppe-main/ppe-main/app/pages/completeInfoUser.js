import Head from 'next/head'
import { useState } from 'react'
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ulyegzjugeundkwapdac.supabase.co'
const supabasKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMjY0MTgsImV4cCI6MTk4NjYwMjQxOH0.IA6Uk7vw4LKMjrMz76uHC0TV_a9XGWex7huwSP_o7zQ"

export default function useCompleteInfoUser() {
    const supabase = createClient(supabaseUrl, supabasKey)
    const [userData, setData] = useState({});

    const onSubmit = async function (e) {
        e.preventDefault();
        const lastName = userData.lastname;
        const firstName = userData.firstname;
        const email = userData.email;

        let { data, error } = await supabase
            .from('profile')
            .insert([
                { email: email, lastname: lastName, firstname: firstName },
            ])
    }

    return (
        <><Head>
            <title> Completer Infos - Local.i</title>
        </Head>
            <div className="wt-title">
                Complete your information
            </div>
            <br></br>
            <form onSubmit={onSubmit}>
                <div className="wt-positionForm">
                    <div className="wt-form">
                        <label className="wt-label">
                            Firstname
                        </label>
                        <input
                            type="text"
                            name="Firstname"
                            placeholder="Pierre"
                            className="wt-input"
                            value={userData.firstname}
                            onChange={(e) => setData({ ...userData, ...{ firstname: e.target.value } })}
                        ></input>
                    </div>
                    <div className="wt-form">
                        <label className="h-3 mr-2">
                            Lastname
                        </label>
                        <input
                            type="text"
                            name="Lastname"
                            placeholder="DUPONT"
                            className="wt-input"
                            value={userData.lastname}
                            onChange={(e) => setData({ ...userData, ...{ lastname: e.target.value } })}
                        ></input>
                    </div>
                    <div className="wt-form">
                        <label className="h-3 mr-2">
                            Email
                        </label>
                        <input
                            type="text"
                            name="Email"
                            placeholder="pierre.dupont@gmail.com"
                            className="wt-input"
                            value={userData.email}
                            onChange={(e) => setData({ ...userData, ...{ email: e.target.value } })}
                        ></input>
                    </div>
                </div>
                <button
                    type="submit"
                    className="wt-button">
                    Envoyer !
                </button>
            </form>
        </>
    )
}