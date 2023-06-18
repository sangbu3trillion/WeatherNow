import WrapPage from './components/FoodPage/WrapPage';
import PlayList from './components/MusicPage/PlayList';
import SideBar from './components/Utils/SideBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import WeatherMain from './components/WeatherPage/WeatherMain';
import Loading from './components/Utils/Loading';
import FoodMap from './components/FoodPage/FoodMap';

function App() {
    return (
        // <div className="flex items-center justify-center h-screen">
        <div>
            <BrowserRouter>
                <div className="flex h-auto p-16 m-auto shadow-lg max-w-7xl">
                    <SideBar />
                    <Routes>
                        <Route path="/" element={<WeatherMain />} />
                        <Route path="/food" element={<FoodMap />} />
                        <Route path="/music" element={<PlayList />} />
                    </Routes>
                </div>
            </BrowserRouter>
            {/* <Loading /> */}
        </div>
    );
}

export default App;
