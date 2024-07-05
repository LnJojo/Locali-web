import { useState, useContext } from 'react';
import Head from 'next/head';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import UserContext from '../components/UserContext';

const supabaseUrl = 'https://ulyegzjugeundkwapdac.supabase.co';
const supabasKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MTAyNjQxOCwiZXhwIjoxOTg2NjAyNDE4fQ.uejBRPykfjQ_meC0uRaTu6n0rxBuaAO55V3R_Wb1Dg0';

const supabase = createClient(supabaseUrl, supabasKey, {
  headers: {
    authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMjY0MTgsImV4cCI6MTk4NjYwMjQxOH0.IA6Uk7vw4LKMjrMz76uHC0TV_a9XGWex7huwSP_o7zQ'}`,
  },
});

const time = new Date().getTime();

export default function WriteArticle() {
  const [testData, setTestData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [userData, setData] = useState({});
  const { user } = useContext(UserContext);
  const [category, setSelectedValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    const file = selectedFile;
    const fileName = user.email + '/' + time;

    const { data, error } = await supabase.storage
      .from('image')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
        contentEncoding: 'base64',
      });

    if (error) {
      console.log(error);
      alert('Error uploading file');
    } else {
      console.log(data);
      alert('File uploaded successfully');
    }
  };

  const onSubmit = async function (e) {
    e.preventDefault();
    const title = userData.title;
    const content = userData.content;
    const category = userData.category;
    const email = user.email;
    const imgid = userData.imgid;

    await handleUpload(); // upload the image first

    let { data, error } = await supabase.from('articles').insert([
      { title: title, content: content, category: category, email: email, imgid: imgid },
    ]);

    if (error) {
      console.log(error);
      setErrorData(error);
    } else {
      console.log(data);
      setTestData(data);
    }
  };

  const handleInputChange = (e) => {
    setData({ ...userData, ...{ category: e.target.value } });

    if (e.target.value.length > 1) {
      setSelectedValue(e.target.value);
    }
  };

  return (
    <><Head>
      <title>Ecrire un post - Local.i</title>
    </Head>
      <section class="tbs-section dark:bg-gray-600 dark:text-white">
        <div class="wt-title">
          <br></br>
          <p>Saisissez les informations:</p>
        </div>
        <form onSubmit={onSubmit}>
          <div class="wt-position flex items-center">
            <div class="wt-form mx-auto my-auto">
              <label class="tbs-form-title dark:bg-gray-600 dark:text-white">
                Titre
              </label>
              <input
                type="text"
                name="Titre"
                placeholder="Titre "
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ title: e.target.value } })
                }
              ></input>
            </div>
            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Description
              </label>
              <input
                type="text"
                name="Content"
                placeholder="Décrivez au mieux votre post"
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ content: e.target.value } })
                }
              >
              </input>
            </div>

            <div class="wt-form mx-auto my-auto">
              <label class="wt-label" label htmlFor="dropdown">
                Catégorie
              </label>
              <br />
              <select id="dropdown" value={category} onChange={handleInputChange} >
                <option> Sélectionnez :</option>
                <option value="Offre promotionnelle">Offre promotionnelle</option>
                <option value="Nouveau produit">Nouveau produit</option>
                <option value="Evénement">Evénement </option>
                <option value="Actualité">Actualité </option>

              </select>
            </div>

            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Image
              </label>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
          <button
            type="submit"
            className="wt-button"
            onClick={(e) =>
              setData({ ...userData, ...{ imgid: time } })
            }>
            POSTER !
          </button>
          <br></br>
          <button
            type="reset"
            className="wt-button">
            Reset !
          </button>
        </form>
      </section>
    </>
  )
}