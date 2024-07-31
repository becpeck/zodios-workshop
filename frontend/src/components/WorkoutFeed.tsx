import { useState, useEffect } from "react";
import WorkoutCard, { type WorkoutCardProps } from "./WorkoutCard";

export default function WorkoutFeed() {
  const [workouts, setWorkouts] = useState<WorkoutCardProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:1234/api/workouts", {
      method: "GET",
    })
    .then(res => res.json())
    .then(data => setWorkouts(data))
    .catch(err => console.error(err))
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full">
      {workouts.map(workout => 
        <WorkoutCard
          id={workout.id}
          username={workout.username}
          type={workout.type}
          duration={workout.duration}
          notes={workout.notes}
          loggedAt={new Date(workout.loggedAt)}
        />
      )}
    </div>
  );
}