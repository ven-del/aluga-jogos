import Card from "../Card";

const Catalogo = ({ lista, onDelete, onEdit }) => {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 justify-items-center max-w-screen-xl mx-auto">
        {lista.map((item) => (
          <Card key={item.id} item={item} onEdit={onEdit} />
        ))}
      </ul>
    );
}

export default Catalogo;