import Card from "../Card";

const Catalogo = ({ lista, onDelete, onEdit }) => {
    return (
        <ul className="flex justify-center flex-wrap gap-8">
            {lista.map(item => (
                <Card
                    key={item.id}
                    item={item}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default Catalogo;