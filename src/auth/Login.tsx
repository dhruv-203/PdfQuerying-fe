
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MainLayout from "../components/MainLayout";
import { useLoginMutation } from "../store/auth.api";
import { APIError, ValidationError } from "../store/types";
import FormWrapper from "./components/FormWrapper";
import Input from "./components/Input";

function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [errors, setErrors] = useState<ValidationError[]>([]);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const reqData = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };
    // console.log(Object.fromEntries(formData));
    try {
      await login(reqData).unwrap();
      toast.success("Login Successful");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        toast.error(
          `Error Occurred: ${
            (error as { data: { message: string } }).data.message
          }`
        );
        if (
          (error as { data: { message: string } }).data.message ===
          "Validation Error"
        ) {
          setErrors(
            (error as { data: APIError }).data.data as ValidationError[]
          );
        }
      } else {
        toast("An unexpected error occurred");
      }
    }
  }
  return (
    <MainLayout>
      <FormWrapper className="mt-10">
        <>
          <h1 className="text-4xl py-5 font-bold text-white text-center">
            Login
          </h1>
          {errors.length > 0 && (
            <div className="errorBox no-scrollbar flex flex-col px-4 py-2 text-sm text-red-600 h-20 overflow-auto ">
              {errors.map((error, index) => (
                <p key={index}>{error.msg}</p>
              ))}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center "
          >
            <Input
              label="Email"
              type="email"
              placeholder="Enter your e-mail"
              name="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
            />
            <Link
              className="self-end underline text-white px-4 py-2 "
              to={"/auth/register"}
            >
              <span className="px-1"> Don't have an account?</span>
              Click Here
            </Link>
            <button
              className="w-50 px-4 py-2 m-2 mx-auto bg-gray-800 hover:bg-neutral-900 text-white rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </>
      </FormWrapper>
    </MainLayout>
  );
}

export default Login;
