import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function Weather(props) {
    const lng = props.longitude;
    const lat = props.latitude;
    const params = "airTemperature,cloudCover";

    const popupMarkerInfo = useSelector(
        (state) => state.popupMarkerInfo && state.popupMarkerInfo
    );

    const [tmp, setTmp] = useState(16);
    const [cloud, setCloud] = useState(80);

    useEffect(async () => {
        if (popupMarkerInfo.boolean) {
            fetch(
                `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`,
                {
                    headers: {
                        // eslint-disable-next-line no-undef
                        //Authorization: `${WEATHER_API_KEY}`,
                        Authorization: `insert-here`,
                    },
                }
            )
                .then((response) => response.json())
                .then((jsonData) => {
                    console.log(jsonData);
                    //find the data of today and set it!
                    //setTmp //setCloud
                })
                .catch((err) => {
                    console.log("Using static ones: ", err.message);
                });
        }
    }, [popupMarkerInfo]);

    return (
        <div className="weatherContainer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
            >
                <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                    <path d="M15,13V5c0-1.66-1.34-3-3-3S9,3.34,9,5v8c-1.21,0.91-2,2.37-2,4c0,2.76,2.24,5,5,5s5-2.24,5-5C17,15.37,16.21,13.91,15,13z M11,11V5c0-0.55,0.45-1,1-1s1,0.45,1,1v1h-1v1h1v1v1h-1v1h1v1H11z" />
                </g>
            </svg>
            <span> {tmp}°C | </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            <span> {cloud}% </span>
        </div>
    );
}
