import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";

const ItemDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  itemType,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    publisher: "",
    image: "",
  });

  // Preenche o formulário com dados iniciais se estiver editando
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        publisher: initialData.publisher || "",
        image: initialData.image || "",
      });
    } else {
      // Reset form quando abrir para criar novo
      setFormData({
        name: "",
        description: "",
        publisher: "",
        image: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-(--background-color) text-white p-6 rounded-lg shadow-lg w-[90vw] max-w-md max-h-[95vh] overflow-y-auto"
          style={{
            animation: "dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Dialog.Title className="text-xl font-bold mb-4 text-(--primary-color)">
            {initialData ? `Editar ${itemType}` : `Adicionar ${itemType}`}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-medium">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="publisher" className="font-medium">
                Editora/Produtora
              </label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="image" className="font-medium">
                URL da Imagem
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-(--primary-color) text-white rounded-md hover:bg-(--primary-color)/90"
              >
                {initialData ? "Atualizar" : "Adicionar"}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full h-6 w-6 hover:bg-gray-200"
              aria-label="Fechar"
            >
              <RxCross2 />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ItemDialog;
