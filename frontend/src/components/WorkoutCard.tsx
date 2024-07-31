import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface WorkoutCardProps {
  id: number;
  username: string;
  type: string;
  duration: number;
  notes: string | null;
  loggedAt: Date;
}

const workoutEmojis: Record<string, string> = {
  run: "🏃",
  bike: "🚴",
  swim: "🏊",
} as const;

export default function WorkoutCard(props: WorkoutCardProps) {
  const { username, type, duration, notes, loggedAt } = props;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          {workoutEmojis[type]} {type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>User: {username}</div>
        <div>Finished: {loggedAt.toLocaleTimeString()}</div>
        <div>Date: {loggedAt.toLocaleDateString()}</div>
        <div>Duration: {duration} minutes</div>
        {notes && notes.length
          ? <div>Notes: {notes}</div>
          : null
        }
      </CardContent>
    </Card>
  );
}