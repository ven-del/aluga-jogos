const Title = ({ info, titulo }) => {
    return (
        <h1 className="text-4xl ml-12"> {info} 
        <span className="font-bold text-(--primary-color)">{titulo}</span>
        </h1>
    );
}

export default Title;