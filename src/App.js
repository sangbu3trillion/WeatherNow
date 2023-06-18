import WrapPage from './components/FoodPage/WrapPage';
import KakaoMap from './components/WeatherPage/KakaoMap';
import FoodMap from './components/FoodPage/FoodMap';
import FoodList from './components/FoodPage/FoodList';
import FoodContent from './components/FoodPage/FoodContent';
import StoreBasicInfo from './components/FoodPage/StoreBasicInfo';
import PlayList from './components/MusicPage/PlayList';
import SideBar from './components/Utils/SideBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import WeatherMain from './components/WeatherPage/WeatherMain';

function App() {
    return (
        // <div className="flex items-center justify-center h-screen">
        <div>
            <BrowserRouter>
                <div className="flex w-5/6 h-auto p-16 m-auto shadow-lg">
                    <SideBar />

                    <Routes>
                        <Route path="/" element={<WeatherMain />} />
                        <Route path="/food" element={<WrapPage />} />
                        <Route path="/music" element={<PlayList />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
