import Button from "../../components/Button";
import Catalogo from "../../components/Catalogo";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { API } from "/src/services/api.js"
import { useEffect, useState } from "react";

const Filmes = () => {
    const [listaFilmes, setListaFilmes] = useState([]);

    const deleteFilme = async (id) => {
        await API.delete(`/filmes/${id}`)
        setListaFilmes(prev => prev.filter(item => item.id !== id));
    }

    useEffect(() => {
        API.get("/filmes").then(res => setListaFilmes(res.data))
    })

    return (
        <Main>
            <div className="flex justify-between items-center mt-5 mb-12">
            <Title info ="Seção de" titulo=" Filmes" />
            <Button />
            </div>
            <Catalogo
                lista={listaFilmes}
                onDelete={deleteFilme}
            />
        </Main>
    );
}

export default Filmes;