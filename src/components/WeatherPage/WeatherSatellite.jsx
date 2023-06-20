import axios from 'axios';
import React, {useState, useEffect} from 'react';

const WeatherRadar = () => {
    const [radar, setRadar] = useState('');

    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    let date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    let hour = time.getHours() < 10 ? '0' + (time.getHours() - 1) + '00' : time.getHours() - 1 + '00';
    let cur_time = year.toString() + month.toString() + date.toString();

    // 레이더 이미지 URL 생성 함수
    const generateImageUrl = imageName => {
        const baseUrl = 'http://www.kma.go.kr/repositary/image/rdr/img/RDR_CMP_WRC_';
        const imageUrl = `${baseUrl}${imageName}.png`;
        return imageUrl;
    };

    // 자외선 API를 가져오는 axios 코드 START

    const fetchRadar = async () => {
        try {
            const radar_res = await axios.get('/1360000/RadarImgInfoService/getCmpImg', {
                params: {
                    serviceKey:
                        '6YO4sbIcPIzV2/WMukgKakcdfJwxLW28pUxsGNGerNPxgVk/QNBq7t1DuwfGMoQsdDgTduvyC7pbd1qacRTvRQ==',
                    numOfRows: 10,
                    pageNo: 1,
                    dataType: 'JSON',
                    data: 'CMP_WRC',
                    time: cur_time,
                },
            });

            console.log('레이더 데이터', radar_res.data.response.body.items.item[0]);
            const imageName = cur_time + hour; // 이미지 이름을 생성합니다.
            const imageUrl = generateImageUrl(imageName); // 이미지 URL을 생성합니다.
            console.log(imageUrl);
            setRadar(imageUrl);
        } catch (error) {
            console.log('error!!', error);
        }
    };

    // 자외선 API를 가져오는 axios 코드 END

    useEffect(() => {
        fetchRadar();
    }, [hour]);

    return (
        <div>
            <span className="mr-2 text-2xl font-bold font-gb ">레이더 영상</span>
            <span className="font-gb text-slate-400 text-sm ">
                {' '}
                | {time.getHours() < 10 ? '0' + (time.getHours() - 1) + ':00' : time.getHours() - 1 + ':00'} 기준
            </span>
            <div className="p-2 border-2 border-solid shadow-md rounded-xl h-96 ">
                <img
                    // className="border-solid border-2 rounded-xl shadow-lg p-3 mt-1"
                    src={radar}
                    alt="레이더 영상"
                    width="375"
                    height="390"
                />
            </div>
        </div>
    );
};

export default WeatherRadar;
