import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { authClient } from "./utils/auth-client";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient, trpc } from "./utils/trpc";

function App() {
  const [count, setCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSignUp = async () => {
    await authClient.signUp.email({
      email: "test1@test.com",
      name: "test1",
      password: "mm+mm+123456",

      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },

        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (ctx) => {
          console.log(ctx);
          setError(ctx.error.message);
        },
      },
    });
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isSuccess && <div>Success</div>}
        {isLoading && <div>Loading</div>}
        {error && <div>Error {error}</div>}
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <button onClick={handleSignUp}>Sign Up</button>
        <Greeting />
      </QueryClientProvider>
    </>
  );
}

export default App;

function Greeting() {
  const { data, isLoading, error } = useQuery(
    trpc.experience.feed.queryOptions()
  );
  console.log(error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-col gap-2">
      {data?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
