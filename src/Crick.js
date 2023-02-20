import React, { useEffect, useState } from "react";
import axios from "axios";

function CricketScore() {
  const [liveScore, setLiveScore] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const fetchLiveScore = async () => {
      const result = await axios(
        "https://cricapi.com/api/cricketScore?unique_id=<match-id>&apikey=<your-api-key>"
      );
      setLiveScore(result.data);
    };

    const fetchUpcomingMatches = async () => {
      const result = await axios(
        "https://cricapi.com/api/matches?apikey=<your-api-key>"
      );
      const matches = result.data.matches.filter(
        (match) =>
          match.matchStarted === false && match.type === "ODI" // Change this condition to filter matches as needed
      );
      setUpcomingMatches(matches);
    };

    fetchLiveScore();
    fetchUpcomingMatches();
  }, []);

  return (
    <div>
      {liveScore && (
        <div>
          <h1>Live Match Score</h1>
          <h2>{liveScore.matchStarted ? liveScore["team-1"] : "Match not started yet"}</h2>
          <h3>{liveScore.score}</h3>
          <p>{liveScore.stat}</p>
        </div>
      )}

      <div>
        <h1>Upcoming Cricket Matches</h1>
        <table>
          <thead>
            <tr>
              <th>Match</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMatches.map((match) => (
              <tr key={match.unique_id}>
                <td>{match.type}</td>
                <td>{match["team-1"]}</td>
                <td>{match["team-2"]}</td>
                <td>{match.date}</td>
                <td>{match.dateTimeGMT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CricketScore;
