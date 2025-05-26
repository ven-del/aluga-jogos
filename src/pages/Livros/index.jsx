import { API } from "/src/services/api.js"
import { useEffect, useState } from "react";
import Catalogo from "../../components/Catalogo";
import Title from "../../components/Title";
import Main from "../../components/Main";
import Button from "../../components/Button";

const Livros = () => {
    const [listaLivros, setListaLivros] = useState([]);

    useEffect(() => {
        API.get("/livros").then(res => setListaLivros(res.data))
    }, [])

    const deleteLivro = async (id) => {
        await API.delete(`/livros/${id}`)
        setListaLivros(prev => prev.filter(item => item.id !== id))
    }

    return (
        <Main>
            <div className="flex justify-between items-center mt-5 mb-12">
            <Title info="Seção de " titulo=" Livros" />
            <Button />
            </div>
            <Catalogo
                lista={listaLivros}
                onDelete={deleteLivro}
            />
        </Main>
    );
}

export default Livros;