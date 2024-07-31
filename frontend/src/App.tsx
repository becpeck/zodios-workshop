import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <main className="flex flex-col justify-center gap-8 w-full">
      <h1 className="text-5xl text-center mt-8 font-semibold">Workout Tracker</h1>
      <div className="flex justify-center gap-8">
        <SignUpForm />
        <LoginForm />
      </div>
    </main>
  )
}

export default App
