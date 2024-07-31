import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
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
        <CardTitle>Log In</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" placeholder="" type="text" value={email} onChange={(evt) => setEmail(evt.target.value)}/>
            </div>
            <div className="text-center text-sm font-medium">OR</div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login-username">Username</Label>
              <Input id="login-username" placeholder="" type="text" value={username} onChange={(evt) => setUsername(evt.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" placeholder="" type="password" value={password} onChange={(evt) => setPassword(evt.target.value)}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit" form="login">Log In</Button>
      </CardFooter>
    </Card>
  );
}