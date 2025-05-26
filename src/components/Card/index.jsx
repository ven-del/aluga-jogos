const Card = ({ item }) => {
    return (
        <li className="flex flex-col items-center text-center px-12 py-4 gap-6 bg-(--card-color) w-80 h-120 rounded-3xl">
            <img
                src={item.path}
                alt={item.name}
                className="w-40 h-60 object-cover"
            />
            <div className="flex flex-col gap-2 justify-between">
                <h6 className="text-2xl font-bold text-(--secondary-color)">{item.name}</h6>
                <p className="text-xl w-full font-semibold leading-6">{item.description}</p>
                <p className="text-sm">{item.publisher}</p>
            </div>
        </li>
    );
}

export default Card;