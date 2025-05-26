import Button from "../../components/Button";
import Catalogo from "../../components/Catalogo";
import Main from "../../components/Main";
import Title from "../../components/Title";
import ItemDialog from "../../components/Modal";
import { crudService } from "/src/services/crudService.js";
import { useState, useEffect } from "react";

const Jogos = () => {
    const [listaJogos, setListaJogos] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const endpoint = "/jogos";

    const fetchJogos = async () => {
        try {
            const data = await crudService.getAll(endpoint);
            setListaJogos(data);
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
        }
    };

    const deleteJogo = async (id) => {
        try {
            await crudService.delete(endpoint, id);
            setListaJogos(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar jogo:", error);
        }
    };

    const saveJogo = async (data) => {
        try {
            if (currentItem) {
                // Abordagem alternativa: delete + create em vez de update
                await crudService.delete(endpoint, currentItem.id);
                const newItem = { ...data, id: currentItem.id };
                const created = await crudService.create(endpoint, newItem);
                setListaJogos(prev =>
                    prev.map(item => item.id === currentItem.id ? created : item)
                );
            } else {
                const created = await crudService.create(endpoint, data);
                setListaJogos(prev => [...prev, created]);
            }
            setIsDialogOpen(false);
            setCurrentItem(null);
        } catch (error) {
            console.error("Erro ao salvar jogo:", error);
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
        fetchJogos();
    }, []);

    return (
        <Main>
            <div className="flex justify-between items-center mt-5 mb-12">
                <Title info="Seção de " titulo=" Jogos" />
                <Button onClick={handleAdd} />
            </div>
            <Catalogo
                lista={listaJogos}
                onDelete={deleteJogo}
                onEdit={handleEdit}
            />
            <ItemDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={saveJogo}
                initialData={currentItem}
                itemType="Jogo"
            />
        </Main>
    );
}

export default Jogos;