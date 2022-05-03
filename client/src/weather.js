import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function Weather() {
    const lng = 13.383309;
    const lat = 52.516806;
    const params = "airTemperature,cloudCover";

    //need also the right time -> Send it with request or else check when comes back (array starts always with today 0am)

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
        });

    return <></>;
}
