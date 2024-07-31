import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function LogWorkoutForm({ username }: { username: string }) {
  const [ duration, setDuration ] = useState(20);
  const [ type, setType ] = useState("run");
  const [ notes, setNotes ] = useState("");

  const handleChangeType = (type: string) => setType(type);

  const clearForm = () => {
    setDuration(20);
    setType("run");
    setNotes("");
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    // TODO: replace with zodios
    await (await fetch("http://localhost:1234/api/workouts", {
      method: "POST",
      body: JSON.stringify({
        username: username || "test",
        duration,
        type,
        notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })).json();

    clearForm();
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Log Workout</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="workout" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration">Minutes</Label>
              <Input id="duration" placeholder="10" type="number" value={duration} onChange={(evt) => setDuration(parseInt(evt.target.value))}/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="text-sm font-medium leading-none">Type</div>
              <RadioGroup value={type} onValueChange={handleChangeType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="run" id="r1" />
                  <Label htmlFor="r1">🏃 Run</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bike" id="r2" />
                  <Label htmlFor="r2">🚴 Bike</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="swim" id="r3" />
                  <Label htmlFor="r3">🏊 Swim</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Take notes here." value={notes} onChange={(evt) => setNotes(evt.target.value)}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 justify-start">
        <Button className="w-full" type="submit" form="workout">Log</Button>
      </CardFooter>
    </Card>
  );
}