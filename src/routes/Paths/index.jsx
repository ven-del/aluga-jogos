import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "../../SiteLayout";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Jogos from "../../pages/Jogos";
import Filmes from "../../pages/Filmes";
import Livros from "../../pages/Livros";

const Paths = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SiteLayout />}>
                    <Route index element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/jogos' element={<Jogos />} />
                    <Route path='/filmes' element={<Filmes />} />
                    <Route path='/livros' element={<Livros />} />
                </Route>
            </Routes>
        </BrowserRouter>
     );
}
 
export default Paths;