import { useState } from "react";
import { useRouter } from "next/router";
import { fetchJson } from "../lib/api";
import { useMutation, useQueryClient } from "react-query";

const Form = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutation(() =>
    fetchJson("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  function handlEmailInput(e) {
    setEmail(e.target.value);
  }
  function handlPasswordInput(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await mutation.mutateAsync();
      queryClient.setQueryData("user", user);
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-3 bg-white shadow-md w-96 "
      >
        <div>
          <h1 className="mb-4 text-lg font-bold tracking-tight md:text-xl xl:text-2xl">
            Login
          </h1>
        </div>
        <div className="space-y-2">
          <label className="block font-medium tracking-tight">Email</label>
          <input
            value={email}
            onChange={handlEmailInput}
            name="email"
            type="email"
            className="w-full px-3 py-2 text-gray-800 placeholder-gray-400 border border-gray-400 rounded focus:border-indigo-600 "
            placeholder="Enter your email"
          />
          {email === "" ? (
            <span className="text-xs text-red-500">Email is required</span>
          ) : (
            ""
          )}
        </div>
        <div className="space-y-2">
          <label className="block font-medium tracking-tight">Password</label>
          <input
            value={password}
            onChange={handlPasswordInput}
            name="password"
            type="password"
            className="w-full px-3 py-2 text-gray-800 placeholder-gray-400 border border-gray-400 rounded focus:border-indigo-600 "
            placeholder="Enter your password"
          />
          {password === "" ? (
            <span className="text-xs text-red-500">Password is required</span>
          ) : (
            ""
          )}
        </div>
        {mutation.isError && (
          <span className="text-xs text-red-500">Invalid credentials</span>
        )}
        <div className="flex justify-end">
          {mutation.isLoading ? (
            <div
              style={{ borderTopColor: "rgba(79, 70, 229, 1)" }}
              className="w-10 h-10 mr-4 border-4 border-gray-200 rounded-full animate-spin"
            ></div>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 overflow-hidden font-semibold tracking-tight text-white bg-indigo-500 rounded-lg focus:outline-none hover:bg-indigo-600"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
