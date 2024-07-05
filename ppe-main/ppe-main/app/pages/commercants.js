import { useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import { supabase } from './api/supabase'
import fond from "/assets/fond.jpeg";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { React, useContext } from 'react'
import UserContext from '../components/UserContext'
import Head from 'next/head'

const supabaseUrl = 'https://ulyegzjugeundkwapdac.supabase.co'
const supabasKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMjY0MTgsImV4cCI6MTk4NjYwMjQxOH0.IA6Uk7vw4LKMjrMz76uHC0TV_a9XGWex7huwSP_o7zQ"

export default function Commercants({ commercants }) {
    const supabase = createClient(supabaseUrl, supabasKey)
    const [userData, setData] = useState({});

    const { user, logout, loading } = useContext(UserContext)
    const router = useRouter()
    const [com, setCom] = useState(0)

    return (
        <>
            <Head>
                <title>Commercant - Local.i</title>
            </Head>
            <div className="relative">

                <Image src={fond} alt="banner" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <h1 className="text-5xl text-white font-bold">Cave d Issy</h1>
                </div>
            </div>

            <div class="wt-case">
                <ul>
                    {commercants.map(commercant => (
                        <li key={commercant.id} className="wt-block">

                            <p class="text-xl font-bold">Adresse: </p>
                            <p>{commercant.adresse}</p>
                            <br></br>

                            <p class="text-xl font-bold">Tel: </p>
                            <p>{commercant.tel}</p>
                            <br></br>

                            <p class="text-xl font-bold">Horaires: </p>
                            <p>{commercant.horaire}</p>
                            <br></br>

                            <p class="text-xl font-bold">Description: </p>
                            <p>{commercant.description}</p>
                            <br></br>

                            <p class="text-xl font-bold">Email: </p>
                            <p>{commercant.email}</p>
                            <br></br>

                        </li>
                    ))}
                </ul>
                <br />
            </div>
        </>
    );
}

export async function getServerSideProps({ req }) {
    let commercants = [];

    const { data, error } = await supabase
        .from("commercants")
        .select(`nom, adresse, tel, horaire, description, email, emailUser, cp`)
        .eq("emailUser", "sybille.beurotte@gmail.com");

    if (!error) commercants = data;

    return {
        props: {
            commercants: commercants,
        },
    };
}