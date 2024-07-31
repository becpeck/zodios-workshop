import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./components/SignUpForm";
import WorkoutFeed from "./components/WorkoutFeed";

function App() {
  const [user, setUser] = useState("");

  return (
    <main className="flex flex-col items-center gap-8 w-full">
      <h1 className="text-5xl text-center mt-8 font-semibold">🏃🚴🏊 Workout Tracker 🏊🚴🏃</h1>
      {user.length
        ? <div>Hi there, {user}!</div>
        : null
      }
      <Tabs defaultValue="signup" className="w-[70%] flex flex-col items-center">
        <TabsList className="w-[40%]">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="workout">Add Workout</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignUpForm setUser={(username: string) => setUser(username)}/>
        </TabsContent>
        <TabsContent value="feed">
          <WorkoutFeed />
        </TabsContent>
        <TabsContent value="workout">
          
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default App
