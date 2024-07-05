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
        const nom = userData.nom;
        const adresse = userData.adresse;
        const cp = userData.cp;
        const tel = userData.tel;
        const horaire = userData.horaire;
        const description = userData.description;
        const email = userData.email;

        let { data, error } = await supabase
            .from('commercants')
            .insert([
                { nom: nom, adresse: adresse, tel: tel, horaire: horaire, description: description, email: email, cp: cp },
            ])
    }

    return (
        <><Head>
            <title> Completer Info - Local.i</title>
        </Head>
            <div className="wt-title">
                Complete your information
            </div><br></br><form onSubmit={onSubmit}>
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
                            Telephone
                        </label>
                        <input
                            type="numeric"
                            name="Tel"
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