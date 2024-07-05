import Link from 'next/link'
import Image from 'next/image';
import LogoLocaly from '/assets/LogoLocaly.png';
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(
      "responsive_nav"
    );
  };


  return (
    <header>
      <nav ref={navRef}>

        <Link href={'/'}>
          <Image src={LogoLocaly} alt="LogoLocaly" width={80} height={50} />
        </Link>

        <Link href="/articles">Home</Link>
        <Link href="/login"> Connexion</Link>
        <Link href="/about">About</Link>
        <Link href="/recherches">Rechercher</Link>
        <Link href="/profile">Profil(s)</Link>
        <Link href="/map">Map</Link>

        <button
          className="nav-btn nav-close-btn"
          onClick={showNavbar}>
          <FaTimes />
        </button>

      </nav>

      <button
        className="nav-btn"
        onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;