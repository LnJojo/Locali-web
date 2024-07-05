import Footer from "./Footer";
import Navbar from "./Navbar";
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="py-10 min-h-screen content-center self-center dark:bg-gray-600 dark:text-white">
      <React.Fragment>
        <Navbar />
        <main >
          {children}
        </main>
        <Footer />
      </React.Fragment>
    </div>
  )
}

