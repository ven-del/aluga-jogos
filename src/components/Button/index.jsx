const Button = ({ onClick, children = "Adicionar" }) => {
    return ( 
        <button 
            type="button" 
            className="bg-(--primary-color)/70 px-12 py-4 h-fit rounded-3xl font-semibold text-lg cursor-pointer active:scale-95"
            onClick={onClick}
        >
            {children}
        </button>
     );
}
 
export default Button;