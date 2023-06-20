import {useState} from 'react';
import axios from 'axios';
import './css/search.css';

export default function MusicSearchForm({token, onSearch}) {
    const [searchKey, setSearchKey] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);

    const searchMusic = async e => {
        e.preventDefault();
        try {
            const {data} = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: searchKey,
                    type: 'track',
                },
            });

            onSearch(data.tracks.items);
            setSearchPerformed(true); // Set the searchPerformed state to true
        } catch (error) {
            console.error(error);
        }
    };

    if (searchPerformed) {
        return null;
    }

    return (
        <div className="start-screen">
            <ul>
                <li>
                    <h1>오늘 날씨에 맞는 노래를 추천해드릴게요</h1>
                </li>
                <li>
                    <form onSubmit={searchMusic} className="mt-6">
                        <input type="text" onChange={e => setSearchKey(e.target.value)} />
                        <button className="bg-sky-200 p-4 rounded-2xl" type={'submit'}>
                            Search
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    );
}
