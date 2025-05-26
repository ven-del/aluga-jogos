import Title from "../../components/Title";

const NotFound = () => {
  return (
    <div className="flex justify-around items-center">
      <div className="flex justify-between items-center mt-5 mb-12 word-break max-w-lg">
        <Title
          info="Página não encontrada! "
          titulo=" Utilize o menu acima para navegar."
        />
      </div>
        <div className="flex justify-center items-center mt-5 mb-12">
            <img
            src="/assets/images/not-found.png"
            alt="Página não encontrada"
            className="w-1/2 h-auto"
              />
        </div>
    </div>
  );
};

export default NotFound;
