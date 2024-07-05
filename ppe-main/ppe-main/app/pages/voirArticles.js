import { useState, useContext } from 'react';
import Head from 'next/head';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import UserContext from '../components/UserContext';

export default function WriteArticle() {

  return (
    <><Head>
      <title>voir articles </title>
    </Head>

    </>
  )
}