import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link'
import Head from 'next/head'

function ArticlesList() {
  const [articles, setArticles] = useState([]);

  const supabaseUrl = 'https://ulyegzjugeundkwapdac.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MTAyNjQxOCwiZXhwIjoxOTg2NjAyNDE4fQ.uejBRPykfjQ_meC0uRaTu6n0rxBuaAO55V3R_Wb1Dg0';

  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchArticles() {
      const { data: articles, error } = await supabase
        .from('articles')
        .select(`id, title, content, email, category, imgid, likeCount`)
        .order('likeCount', { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      const articlesWithImages = await Promise.all(
        articles.map(async (article) => {
          const imagePath = `${article.email}/${article.imgid}`;
          const { data: imageData, error } = await supabase.storage
            .from('image')
            .download(imagePath);

          if (error) {
            console.log(error);
            return article;
          }

          const fileUrl = URL.createObjectURL(imageData);

          // Get commercant's name and ID for this article
          const { data: commercantData, error: commercantError } = await supabase
            .from('commercants')
            .select('id, nom')
            .eq('emailUser', article.email)
            .limit(1)

          if (commercantError || !commercantData || commercantData.length === 0) {
            return {
              ...article,
              fileUrl: fileUrl,
              imagePath: imagePath,
              commercantNom: null,
              commercantId: null
            };
          }

          return {
            ...article,
            fileUrl: fileUrl,
            imagePath: imagePath,
            commercantNom: commercantData[0].nom,
            commercantId: commercantData[0].id
          };
        })
      );
      setArticles(articlesWithImages);
    }

    fetchArticles();
  }, []);

  const likeCount = async function (articleId, likeCount1) {
    likeCount1 = likeCount1 + 1;
    const { data, error } = await supabase
      .from('articles')
      .update({ likeCount: likeCount1 })
      .eq('id', articleId);

    if (error) {
      console.log(error);
      return;
    }

    const updatedArticles = articles.map(article =>
      article.id === articleId ? { ...article, likeCount: likeCount1 } : article
    );
    setArticles(updatedArticles);
  };

  return (
    <>
    <Head>
      <title>Feed - Local.i</title>
    </Head>
    <div>
      <ul>
        {articles.map(article => (
          <li key={article.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h1 className='text-center font-bold'>
              {article.commercantNom &&
                <Link href={`/commercants/${article.commercantId}`}>
                  {article.commercantNom}
                </Link>
              }
            </h1>
            <h3 className="text-center">
              {article.commercantNom &&
                <Link href={`/articles/${article.id}`}>
                  {article.title}
                </Link>
              }
            </h3>
            {article.fileUrl &&
              <img src={article.fileUrl} alt="article image" className="mx-auto" style={{ width: '300px', height: 'auto' }} />
            }
            <p className="text-center">{article.content}</p>
            <br></br>
            <div>
              <br></br>
              <button className="wt-button" onClick={() => likeCount(article.id, article.likeCount)}>
                j aime ({article.likeCount} j aimes)
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
    
  );
}

export default ArticlesList;