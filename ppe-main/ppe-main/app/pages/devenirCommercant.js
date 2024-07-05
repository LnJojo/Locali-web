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
      .from('justificatif')
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
    const nom = userData.nom;
    const adresse = userData.adresse;
    const tel = userData.tel;
    const email = userData.email;
    const emailUser = user.email;
    const description = userData.description;
    const fileid = userData.fileid;
    const horaire = userData.horaire;
    const cp = userData.cp;
    const site = userData.site;
    const longitude = userData.longitude;
    const latitude = userData.latitude;


    await handleUpload(); // upload the image first

    let { data, error } = await supabase.from('commercants').insert([
      { nom: nom, adresse: adresse, tel: tel, horaire: horaire, description: description, email: email, emailUser: emailUser, cp: cp, fileid: fileid, site: site, longitude: longitude, latitude: latitude },
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
      <title>Devenir Commerçant - Local.i</title>
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
                Nom
              </label>
              <input
                type="text"
                name="Nom"
                placeholder="Mon Commerce"
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ nom: e.target.value } })
                }
              ></input>
            </div>
            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Adresse
              </label>
              <input
                type="text"
                name="Content"
                placeholder="10 rue Sextius Michel"
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ adresse: e.target.value } })
                }
              >
              </input>
            </div>

            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Code Postal
              </label>
              <input
                type="text"
                name="Content"
                placeholder="92700"
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ cp: e.target.value } })
                }
              >
              </input>
            </div>

            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Tel
              </label>
              <input
                type="text"
                name="Tel"
                placeholder="0651353361"
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ tel: e.target.value } })
                }
              >
              </input>
            </div>

            <div>
            </div>

            <div>
            </div>

            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Email du Commerce
              </label>
              <input
                type="text"
                name="Email"
                placeholder="contact.locali@gmail.com"
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ email: e.target.value } })
                }
              >
              </input>
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
                  setData({ ...userData, ...{ description: e.target.value } })
                }
              >
              </input>
            </div>

            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Horaires
              </label>
              <input
                type="text"
                name="Horaires"
                placeholder="Lundi-samedi: 9h-13h // 15h-20h"
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ horaire: e.target.value } })
                }
              >
              </input>
            </div>

            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Site (https://wwww.monSite.fr)
              </label>
              <input
                type="text"
                name="Site"
                placeholder="https://"
                className="wt-input"
                onChange={(e) =>
                  setData({ ...userData, ...{ site: e.target.value } })
                }
              >
              </input>
            </div>

            <div class="wt-form mx-auto my-auto">
              <label class="wt-label">
                Justificatif (K-BIS/SIRET)
              </label>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
          <button
            type="submit"
            className="wt-button"
            onClick={(e) =>
              setData({ ...userData, ...{ fileid: time } })
            }>
            Envoyer la demande
          </button>
          <br></br>
          <button
            type="reset"
            className="wt-button">
            Reinitialiser
          </button>
        </form>
      </section>
    </>
  )
}