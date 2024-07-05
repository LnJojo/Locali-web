import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import fond from "/assets/fond.jpeg";
import Image from "next/image";
import { useRouter } from "next/router";
import { React, useContext } from "react";
import UserContext from "/components/UserContext";
import Link from "next/link";
import { supabase } from "../api/supabase";

const supabaseUrl = "https://ulyegzjugeundkwapdac.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMjY0MTgsImV4cCI6MTk4NjYwMjQxOH0.IA6Uk7vw4LKMjrMz76uHC0TV_a9XGWex7huwSP_o7zQ";

export default function Commercants({ commercant }) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const [userData, setData] = useState({});

    const { user, logout, loading } = useContext(UserContext);
    const router = useRouter();
    const [com, setCom] = useState(0);

    const voirArticles = function () {
        router.push(`/articlesUser/${commercant.emailUser}`);
    };

    return (
        <>
            <div className="relative">
                <Image
                    src={fond}
                    alt="banner"
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <h1 className="text-5xl text-white font-bold">{commercant.nom}</h1>
                </div>
            </div>

            <div class="wt-case">
                <ul>
                    <li key={commercant.id} className="wt-block">
                        <p class="text-xl font-bold">Adresse: </p>
                        <p>
                            {commercant.adresse}, {commercant.cp}
                        </p>
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

                        {commercant.nom && (
                            <>
                                <p className="text-xl font-bold">Commerçant:</p>
                                <Link href={`/commercants/${commercant.id}`}>
                                    <p> {commercant.nom} </p>
                                </Link>
                            </>
                        )}
                    </li>
                </ul>
                <br />
            </div>
            <div>
                <br></br>
                <button className="wt-button" onClick={voirArticles}>
                    Voir les articles
                </button>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    // Filtrage des commercants par id
    const { data, error } = await supabase
        .from("commercants")
        .select(`
        nom,
        adresse,
        tel,
        horaire,
        description,
        email,
        emailUser,
        cp
      `)
        .eq("emailUser", id);

    if (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }

    if (data.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            commercant: data[0],
        },
    };
}