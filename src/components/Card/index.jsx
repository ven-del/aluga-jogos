import { GoTrash } from "react-icons/go";

const Card = ({ item, onDelete }) => {
    return (
        <li className="relative flex flex-col items-center justify-center text-center px-6 py-4 gap-4 bg-(--card-color) w-80 h-120 rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105">
            <img
                src={item.image}
                alt={item.name}
                className="w-40 h-60 object-cover rounded-xl mt-2"
            />
            <GoTrash
                className="absolute top-4 right-4 cursor-pointer"
                size={25}
                onClick={() => onDelete(item.id)}
            />
            <div className="flex flex-col gap-2 justify-around overflow-auto">
                <h6 className="text-2xl font-bold text-(--primary-color) break-words">{item.name}</h6>
                <p className="text-xl w-full font-semibold leading-6">{item.description}</p>
                <p className="text-sm">{item.publisher}</p>
            </div>
        </li>
    );
}

export default Card;