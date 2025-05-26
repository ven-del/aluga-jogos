import Button from "../../components/Button";
import Catalogo from "../../components/Catalogo";
import Main from "../../components/Main";
import Title from "../../components/Title";
import ItemDialog from "../../components/Modal";
import { crudService } from "/src/services/crudService.js";
import { useState, useEffect } from "react";

const Livros = () => {
    const [listaLivros, setListaLivros] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const endpoint = "/livros";

    const fetchLivros = async () => {
      try {
        const data = await crudService.getAll(endpoint);
        setListaLivros(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    const deleteLivro = async (id) => {
      try {
        await crudService.delete(endpoint, id);
        setListaLivros((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Erro ao deletar livro:", error);
      }
    };

    const saveLivro = async (data) => {
      try {
        if (currentItem) {
          // Abordagem alternativa: delete + create em vez de update
          await crudService.delete(endpoint, currentItem.id);
          const newItem = { ...data, id: currentItem.id };
          const created = await crudService.create(endpoint, newItem);
          setListaLivros((prev) =>
            prev.map((item) => (item.id === currentItem.id ? created : item))
          );
        } else {
          const created = await crudService.create(endpoint, data);
          setListaLivros((prev) => [...prev, created]);
        }
        setIsDialogOpen(false);
        setCurrentItem(null);
      } catch (error) {
        console.error("Erro ao salvar livro:", error);
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
      fetchLivros();
    }, []);

  return (
    <Main>
      <div className="flex justify-between items-center mt-5 mb-12">
        <Title info="Seção de " titulo=" Livros" />
              <Button onClick={handleAdd} />
      </div>
          <Catalogo
              lista={listaLivros}
              onDelete={deleteLivro}
              onEdit={handleEdit}
          />
          <ItemDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onSubmit={saveLivro}
              initialData={currentItem}
              itemType="livro"
          />
    </Main>
  );
};

export default Livros;