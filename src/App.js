import WrapPage from './components/FoodPage/WrapPage';
import 'tailwindcss/tailwind.css';
import KakaoMap from './components/WeatherPage/KakaoMap';
import FoodMap from './components/FoodPage/FoodMap';
import FoodList from './components/FoodPage/FoodList';
import FoodContent from './components/FoodPage/FoodContent';
import StoreBasicInfo from './components/FoodPage/StoreBasicInfo';
import PlayList from './components/MusicPage/PlayList';

function App() {
    return (
        // <div className="flex justify-center items-center h-screen">
        <div>
            <PlayList />
        </div>

    );
}

export default App;
