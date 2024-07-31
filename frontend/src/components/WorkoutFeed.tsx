import { useState, useEffect } from "react";
import WorkoutCard, { type WorkoutCardProps } from "./WorkoutCard";

import apiClient from "../lib/zodios/apiClient";

export default function WorkoutFeed() {
  const [workouts, setWorkouts] = useState<WorkoutCardProps[]>([]);

  useEffect(() => {
    // TODO: replace with zodios
    apiClient.getWorkouts()
      .then(data => setWorkouts(data))
      .catch(err => console.error(err));

    // fetch("http://localhost:1234/api/workouts", {
    //   method: "GET",
    // })
    //   .then(res => res.json())
    //   .then(data => setWorkouts(data))
    //   .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2">
      {workouts.map(workout => 
        <WorkoutCard
          id={workout.id}
          username={workout.username}
          type={workout.type}
          duration={workout.duration}
          notes={workout.notes}
          loggedAt={workout.loggedAt}
        />
      )}
    </div>
  );
}