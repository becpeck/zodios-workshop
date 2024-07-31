import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // validate form
  }

  return (
    <Card className="w-[30%]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to start tracking and sharing your workouts!</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" placeholder="" type="email" value={email} onChange={(evt) => setEmail(evt.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-username">Username</Label>
              <Input id="signup-username" placeholder="" type="text" value={username} onChange={(evt) => setUsername(evt.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" placeholder="" type="password" value={password} onChange={(evt) => setPassword(evt.target.value)}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit" form="signup">Sign Up</Button>
      </CardFooter>
    </Card>
  );
}