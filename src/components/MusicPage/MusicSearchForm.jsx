import {useState} from 'react';
import axios from 'axios';

export default function MusicSearchForm({token, onSearch}) {
    const [searchKey, setSearchKey] = useState('');

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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={searchMusic}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />에 울리는 노래 추천해 드릴게요 !
            <button className="m-10 bg-sky-200" type={'submit'}>
                Search
            </button>
        </form>
    );
}
