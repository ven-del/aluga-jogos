import Button from "../../components/Button";
import Catalogo from "../../components/Catalogo";
import Main from "../../components/Main";
import Title from "../../components/Title";
import ItemDialog from "../../components/Modal";
import { supabaseService } from "/src/services/supabaseService";
import { useState, useEffect } from "react";
import { Description } from "@radix-ui/react-dialog";

const Jogos = () => {
    const [listaJogos, setListaJogos] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const table = "jogos";

    const fetchJogos = async () => {
        try {
            const data = await supabaseService.getAll(table);
            setListaJogos(data);
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
        }
    };

    const deleteJogo = async (id) => {
        try {
            await supabaseService.delete(table, id);
            setListaJogos(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar jogo:", error);
        }
    };

    const saveJogo = async (data) => {
        try {
            const jogoData = {
                name: data.name,
                description: data.description,
                publisher: data.publisher,
                image_url: data.image_url
            };

            if (currentItem) {
                const updated = await supabaseService.update(table, currentItem.id, jogoData);
                setListaJogos(prev => prev.map(item => item.id === currentItem.id ? updated : item));
            } else {
                const created = await supabaseService.create(table, jogoData);
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