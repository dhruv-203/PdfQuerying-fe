import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MainLayout from "../components/MainLayout";
import { useRegisterMutation } from "../store/auth.api";
import { APIError, ValidationError } from "../store/types";
import FormWrapper from "./components/FormWrapper";
import Input from "./components/Input";

function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState<ValidationError[]>([]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const reqData = Object.fromEntries(formData) as {
      name: string;
      email: string;
      password: string;
      gender: "MALE" | "FEMALE";
    };
    try {
      await register(reqData).unwrap();
      toast.success("Registered successfully");
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
          setError(
            (error as { data: APIError }).data.data as ValidationError[]
          );
        }
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  return (
    <MainLayout>
      <FormWrapper className="md:mt-2">
        <>
          <div className="error-container flex flex-col gap-3 text-sm"></div>
          <h1 className="text-4xl py-2 md:py-4 font-bold text-white text-center">
            Register
          </h1>
          {error.length > 0 && (
            <div className="errorBox no-scrollbar flex flex-col px-4 py-2 text-sm text-red-600 h-20 overflow-auto ">
              {error.map((error, index) => (
                <p key={index}>{error.msg}</p>
              ))}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
          >
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              name="name"
            />
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
            <div className="w-full flex  py-2  flex-col sm:flex-row justify-center gap-4 items-center ">
              <div className="text-start text-white w-full max-w-[400px]  px-4 py-2 text-base font-semibold sm:basis-1/3 md:basis-1/4">
                Select Gender
              </div>
              <div className="px-4 py-2 flex justify-start items-center gap-10 w-full max-w-[400px] text-center text-base rounded-md sm:basis-2/3 md:basis-3/4">
                <div className="flex gap-2 justify-center items-center ">
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    id="male"
                    className="w-6 h-6 p-3 cursor-pointer accent-slate-900"
                  />
                  <label
                    htmlFor="male"
                    className="text-center text-white text-base px-4 py-2"
                  >
                    Male
                  </label>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    id="female"
                    className="w-6 h-6 p-3 cursor-pointer accent-slate-900"
                  />
                  <label
                    htmlFor="female"
                    className="text-center text-white text-base px-4 py-2"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
            <Link
              className="self-end underline text-white px-4 py-2 "
              to={"/auth/login"}
            >
              <span className="px-1"> Already have an account?</span>
              Click Here
            </Link>
            <button
              className="w-50 px-4 py-2 m-2 mx-auto bg-gray-800 hover:bg-neutral-900 text-white rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
        </>
      </FormWrapper>
    </MainLayout>
  );
}

export default Register;
