import Button from "../../components/Button";
import Catalogo from "../../components/Catalogo";
import Main from "../../components/Main";
import Title from "../../components/Title";
import ItemDialog from "../../components/Modal";
import { supabaseService } from "/src/services/supabaseService";
import { useState, useEffect } from "react";

const Filmes = () => {
    const [listaFilmes, setListaFilmes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const table = "filmes";

    const fetchFilmes = async () => {
        try {
            const data = await supabaseService.getAll(table);
            setListaFilmes(data);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    // Deletar um filme
    const deleteFilme = async (id) => {
        try {
            await supabaseService.delete(table, id);
            setListaFilmes(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar filme:", error);
        }
    };

    const saveFilme = async (data) => {
        try {
            const filmeData = {
              name: data.name,
              description: data.description,
              publisher: data.publisher,
              image_url: data.image_url,
            };

            if (currentItem) {
                const updated = await supabaseService.update(table, currentItem.id, filmeData);
                setListaFilmes(prev => prev.map(item => item.id === currentItem.id ? updated : item));
            } else {
                const created = await supabaseService.create(table, filmeData);
                setListaFilmes(prev => [...prev, created]);
            }
            setIsDialogOpen(false);
            setCurrentItem(null);
        } catch (error) {
            console.error("Erro ao salvar filme:", error);
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setCurrentItem(null);
        setIsDialogOpen(true);
    };

    useEffect(() => {
        fetchFilmes();
    }, []);

    return (
        <Main>
            <div className="flex justify-between items-center mt-5 mb-12">
                <Title info="Seção de" titulo=" Filmes" />
                <Button onClick={handleAdd} />
            </div>
            <Catalogo
                lista={listaFilmes}
                onDelete={deleteFilme}
                onEdit={handleEdit}
            />
            <ItemDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={saveFilme}
                initialData={currentItem}
                itemType="Filme"
            />
        </Main>
    );
}

export default Filmes;