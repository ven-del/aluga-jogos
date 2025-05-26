import Button from "../../components/Button";
import Catalogo from "../../components/Catalogo";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { API } from "/src/services/api.js"
import { useEffect, useState } from "react";

const Jogos = () => {
    const [listaJogos, setListaJogos] = useState([]);

    useEffect(() => {
        API.get("/jogos").then(res => setListaJogos(res.data))
    }, [])

    const deleteJogo = async (id) => {
        await API.delete(`/jogos/${id}`)
        setListaJogos(prev => prev.filter(item => item.di !== id))
    }

    return (
        <Main>
            <div className="flex justify-between items-center mt-5 mb-12">
            <Title info="Seção de " titulo=" Jogos" />
            <Button />
            </div>
            <Catalogo
                lista={listaJogos}
                onDelete={deleteJogo}
            />
        </Main>
    );
}

export default Jogos;