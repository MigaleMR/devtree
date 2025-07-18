import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import api from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useState } from "react"; // Agrega useState

export default function LoginView() {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(""); // Estado para error de autenticación
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    setAuthError(""); // Limpia el error antes de intentar login
    try {
      const { data } = await api.post(`/auth/login`, formData);
      localStorage.setItem("AUTH_TOKEN", data);
      navigate('/admin')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        let mensaje = "Error de autenticación";
        if (error.response.data.errors && error.response.data.errors.length > 0) {
          mensaje = error.response.data.errors[0].msg;
        } else if (error.response.data.error) {
          mensaje = error.response.data.error;
        }
        setAuthError(mensaje);
        toast.error(mensaje);
      }
    }
  };
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Iniciar Sesión</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Iniciar Sesión"
        />
      </form>

      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to="/auth/register"
        >
          No tienes cuenta?<p className="text-cyan-300 text-bold">Crea una aquí</p> 
        </Link>
      </nav>
    </>
  );
}
