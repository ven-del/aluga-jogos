import logo from "/assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="flex gap-12 items-center py-10 px-14 justify-between bg-(--secondary-color)/80 antialiased">
            <img
                src={logo}
                alt="Logo da Gorilla Games"
                className="w-32 rounded-full"
            />
            <ul className="flex gap-12 text-3xl">
                <NavLink className="[&.active]:font-bold [&.active]:text-(--primary-color)" to="/">
                    Home
                </NavLink>
                <NavLink className="[&.active]:font-bold [&.active]:text-(--primary-color)" to="/filmes">
                    Filmes
                </NavLink>
                <NavLink className="[&.active]:font-bold [&.active]:text-(--primary-color)" to="/jogos">
                    Jogos
                </NavLink>
                <NavLink className="[&.active]:font-bold [&.active]:text-(--primary-color)" to="/livros">
                    Livros
                </NavLink>
            </ul>
        </header>
    );
}

export default Header;