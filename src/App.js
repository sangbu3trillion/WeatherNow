import PlayList from './components/MusicPage/PlayList';
import SideBar from './components/Utils/SideBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import WeatherMain from './components/WeatherPage/WeatherMain';
import FoodMap from './components/FoodPage/FoodMap';

function App() {
    return (
        <div className="flex">
            <BrowserRouter>
                <div className="w-1/6 h-auto mt-20 ml-24">
                    <SideBar />
                </div>
                <div className="w-5/6">
                    <div className="h-auto p-16 mr-32 shadow-lg max-w-7xl ">
                        <Routes>
                            <Route path="/" element={<WeatherMain />} />
                            <Route path="/food" element={<FoodMap />} />
                            <Route path="/music" element={<PlayList />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
