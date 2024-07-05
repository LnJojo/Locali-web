import { useState, useEffect } from "react";
import { supabase } from './api/supabase'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Head from 'next/head'

export default function RecherchesCP() {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const router = useRouter();

  function handleQueryChange(event) {
    const newQuery = event.target.value;
    setQuery(newQuery);
    handleSearch(newQuery).then((predictions) => {
      setPredictions(predictions);
    });
  }

  function handleClick(commercantId) {
    router.push(`/commercants/${commercantId}`);
  }

  useEffect(() => {
    if (query.length > 0) {
      handleSearch(query).then((predictions) => {
        setPredictions(predictions);
      });
    } else {
      setPredictions([]);
    }
  }, [query]);

  return (
    <>
    <Head>
      <title>Recherches CP - Local.i</title>
    </Head>
    <div className="flex flex-col items-center justify-center">
      <div className="wt-title">
        Vous pouvez rechercher un commerce:
      </div>
      <div className="relative w-80 sm:w-96">
        <input
          type="text"
          placeholder="Recherchez un commerce..."
          className="h-14 px-4 rounded-full w-full border-2 border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleQueryChange}
        />
        {predictions && predictions.length > 0 && (
          <ul className="bg-white shadow-lg w-full mt-2 rounded-b-lg overflow-hidden">
            {predictions.map((prediction) => (
              <li
                key={prediction.id}
                className="px-4 py-2 hover:bg-gray-200"
                onClick={() => handleClick(prediction.id)}
              >
                <Link href={`/commercants/${prediction.id}`}>
                  {prediction.cp}, {prediction.nom}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
    
  );
}

export async function handleSearch(query) {
  let predictions = [];
  if (query.length > 0) {
    const { data, error } = await supabase
      .from('commercants')
      .select('id, nom, cp')
      .ilike('cp', `%${query}%`)
      .limit(5);
    if (!error) {
      predictions = data;
    }
  }
  return predictions;
}