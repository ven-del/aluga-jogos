import logo from "/assets/images/logo.png";
import { TiThMenu } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
      <header className="relative flex gap-12 items-center py-10 px-14 justify-between bg-(--secondary-color)/80 antialiased">
        <img
          src={logo}
          alt="Logo da Gorilla Games"
          className="w-32 rounded-full"
        />
        <button className="md:hidden text-3xl" onClick={toggleMenu}>
          <TiThMenu />
        </button>

        <ul className="hidden md:flex gap-12 text-3xl">
          <NavLink
            className="[&.active]:font-bold [&.active]:text-(--primary-color) hover:drop-shadow-[0_0_20px_var(--primary-color)] duration-150 ease-in-out"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="[&.active]:font-bold [&.active]:text-(--primary-color) hover:drop-shadow-[0_0_20px_var(--primary-color)] duration-150 ease-in-out"
            to="/filmes"
          >
            Filmes
          </NavLink>
          <NavLink
            className="[&.active]:font-bold [&.active]:text-(--primary-color) hover:drop-shadow-[0_0_20px_var(--primary-color)] duration-150 ease-in-out"
            to="/jogos"
          >
            Jogos
          </NavLink>
          <NavLink
            className="[&.active]:font-bold [&.active]:text-(--primary-color) hover:drop-shadow-[0_0_20px_var(--primary-color)] duration-150 ease-in-out"
            to="/livros"
          >
            Livros
          </NavLink>
        </ul>
        {isMenuOpen && (
          <ul className="absolute top-full right-0 w-64 py-4 bg-(--background-color)/95 md:hidden flex flex-col gap-4 z-50">
            <NavLink
              className="px-6 py-2 [&.active]:font-bold [&.active]:text-(--primary-color)"
              to="/"
              onClick={() => toggleMenu()}
            >
              Home
            </NavLink>
            <NavLink
              className="px-6 py-2 [&.active]:font-bold [&.active]:text-(--primary-color)"
              to="/filmes"
              onClick={() => toggleMenu()}
            >
              Filmes
            </NavLink>
            <NavLink
              className="px-6 py-2 [&.active]:font-bold [&.active]:text-(--primary-color)"
              to="/jogos"
              onClick={() => toggleMenu()}
            >
              Jogos
            </NavLink>
            <NavLink
              className="px-6 py-2 [&.active]:font-bold [&.active]:text-(--primary-color)"
              to="/livros"
              onClick={() => toggleMenu()}
            >
              Livros
            </NavLink>
          </ul>
        )}
      </header>
    );
}

export default Header;