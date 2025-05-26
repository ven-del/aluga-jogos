import Button from "../../components/Button";
import Catalogo from "../../components/Catalogo";
import Main from "../../components/Main";
import Title from "../../components/Title";
import ItemDialog from "../../components/Modal";
import { crudService } from "/src/services/crudService.js";
import { useState, useEffect } from "react";

const Filmes = () => {
    const [listaFilmes, setListaFilmes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const endpoint = "/filmes";

    // Buscar todos os filmes
    const fetchFilmes = async () => {
        try {
            const data = await crudService.getAll(endpoint);
            setListaFilmes(data);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    // Deletar um filme
    const deleteFilme = async (id) => {
        try {
            await crudService.delete(endpoint, id);
            setListaFilmes(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar filme:", error);
        }
    };

    // Criar ou atualizar um filme
    const saveFilme = async (data) => {
        try {
            if (currentItem) {
                // Abordagem alternativa: delete + create em vez de update
                await crudService.delete(endpoint, currentItem.id);
                const newItem = { ...data, id: currentItem.id };
                const created = await crudService.create(endpoint, newItem);
                setListaFilmes(prev =>
                    prev.map(item => item.id === currentItem.id ? created : item)
                );
            } else {
                // Criar novo filme
                const created = await crudService.create(endpoint, data);
                setListaFilmes(prev => [...prev, created]);
            }
            setIsDialogOpen(false);
            setCurrentItem(null);
        } catch (error) {
            console.error("Erro ao salvar filme:", error);
        }
    };

    // Abrir modal para edição
    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsDialogOpen(true);
    };

    // Abrir modal para criação
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