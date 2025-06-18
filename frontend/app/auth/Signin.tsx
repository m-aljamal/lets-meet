import { useState } from "react";
import { authClient } from "../lib/auth-client";

export default function Signin() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    await authClient.signIn.email({
      email: "test1@test.com",
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
    <div>
      <button onClick={handleSignIn}>Signin</button>
      {isSuccess && <div>Success</div>}
      {isLoading && <div>Loading</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
