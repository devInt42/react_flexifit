import React, { useState, useEffect } from "react";
import axios from "axios";

const Top100 = () => {
  const [top100, setTop100] = useState([]);
  const apiKey = "91fd5e1a104b665a51fe02fdbe23d397";

  useEffect(() => {
    const fetchTop100 = async () => {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`
      );
      setTop100(response.data.tracks.track);
    };
    fetchTop100();
  }, []);

  return (
    <div>
      <h1>Top 100 Tracks</h1>
      <ul>
        {top100.map((track, index) => (
          <li key={index}>
            {track.name} - {track.artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Top100;
