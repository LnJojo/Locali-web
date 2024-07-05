import Head from 'next/head'
import UserContext from '../components/UserContext'
import { useState, useContext } from 'react'
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ulyegzjugeundkwapdac.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMjY0MTgsImV4cCI6MTk4NjYwMjQxOH0.IA6Uk7vw4LKMjrMz76uHC0TV_a9XGWex7huwSP_o7zQ"

export default function useChangeInfoUser() {
    const { user } = useContext(UserContext)
    const supabase = createClient(supabaseUrl, supabaseKey)
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: ''
    });

    const onSubmit = async function (e) {
        e.preventDefault();
        if (user) {
            const updates = Object.entries(userData)
                .filter(([key, value]) => value !== undefined && value !== null)
                .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
            const { error } = await supabase
                .from('profile')
                .update(updates)
                .eq('email', user.email)
            if (error) {
                console.error(error);
            } else {
                console.log('Profile updated successfully.');
            }
        }
    }

    return (
        <>
            <Head>
                <title>Changer Info - Local.i </title>
            </Head>
            <div className="wt-title">
                Changez vos informations
            </div>
            <br />
            <form onSubmit={onSubmit}>
                <div className="wt-positionForm">
                    <div className="wt-form">
                        <label className="wt-label">
                            Firstname
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Pierre"
                            className="wt-input"
                            value={userData.firstname}
                            onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                        />
                    </div>
                    <div className="wt-form">
                        <label className="wt-label">
                            Lastname
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="DUPONT"
                            className="wt-input"
                            value={userData.lastname}
                            onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="wt-button"
                >
                    Envoyer !
                </button>
            </form>
        </>
    )
}
