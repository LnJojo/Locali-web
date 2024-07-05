import Head from 'next/head'
import UserContext from '../components/UserContext'
import { useState, useContext } from 'react'
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ulyegzjugeundkwapdac.supabase.co'
const supabasKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMjY0MTgsImV4cCI6MTk4NjYwMjQxOH0.IA6Uk7vw4LKMjrMz76uHC0TV_a9XGWex7huwSP_o7zQ"

export default function useChangeInfoUser() {

    const { user } = useContext(UserContext)
    const supabase = createClient(supabaseUrl, supabasKey)
    const [userData, setData] = useState({});

    const onSubmit = async function (e) {
        e.preventDefault();
        if (user) {
            const updates = Object.entries(userData)
                .filter(([key, value]) => value !== undefined && value !== null)
                .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
            const { error } = await supabase
                .from('commercants')
                .update(updates)
                .eq('emailUser', user.email)
        }
    }

    return (
        <>
            <Head>
                <title> Changer Info - Local.i</title>
            </Head>
            <div className="wt-title ">
                Changez vos informations
            </div>
            <br></br>
            <form onSubmit={onSubmit}>
                <div className="wt-positionForm">
                    <div className="wt-form">
                        <label className="wt-label">
                            Nom
                        </label>
                        <input
                            type="text"
                            name="Nom"
                            placeholder="Pierre"
                            className="wt-input"
                            value={userData.nom}
                            onChange={(e) => setData({ ...userData, ...{ nom: e.target.value } })}
                        ></input>
                    </div>
                    <div className="wt-form">
                        <label className="h-3 mr-2">
                            Adresse
                        </label>
                        <input
                            type="text"
                            name="Adresse"
                            placeholder="10 rue Sextius Michel"
                            className="wt-input"
                            value={userData.adresse}
                            onChange={(e) => setData({ ...userData, ...{ adresse: e.target.value } })}
                        ></input>
                    </div>
                    <div className="wt-form">
                        <label className="h-3 mr-2">
                            Code postal
                        </label>
                        <input
                            type="text"
                            name="cp"
                            placeholder="92700"
                            className="wt-input"
                            value={userData.cp}
                            onChange={(e) => setData({ ...userData, ...{ cp: e.target.value } })}
                        ></input>
                    </div>
                    <div className="wt-form">
                        <label className="h-3 mr-2">
                            Tel
                        </label>
                        <input
                            type="numeric"
                            name="Telephone"
                            placeholder="0651353361"
                            className="wt-input"
                            value={userData.tel}
                            onChange={(e) => setData({ ...userData, ...{ tel: e.target.value } })}
                        ></input>
                    </div>
                    <div className="wt-form">
                        <label className="h-3 mr-2">
                            Horaires
                        </label>
                        <input
                            type="text"
                            name="Horaires"
                            placeholder="Lundi-samedi: 9h-13h // 15h-20h"
                            className="wt-input"
                            value={userData.horaire}
                            onChange={(e) => setData({ ...userData, ...{ horaire: e.target.value } })}
                        ></input>
                    </div>
                    <div className="wt-form">
                        <label className="h-3 mr-2">
                            Description
                        </label>
                        <input
                            type="text"
                            name="Description"
                            placeholder="Décrivez votre commerce"
                            className="wt-input"
                            value={userData.description}
                            onChange={(e) => setData({ ...userData, ...{ description: e.target.value } })}
                        ></input>
                    </div>
                    <div className="wt-form">
                        <label className="h-3 mr-2">
                            Email
                        </label>
                        <input
                            type="text"
                            name="Email"
                            placeholder="contact.locali@gmail.com"
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
