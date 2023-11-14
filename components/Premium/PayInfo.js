"use client";

import { useState } from "react";
import client from "@/config/client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

const PayInfo = () => {
  const [errors, setErrors] = useState([]);
  const [doc_type, setDoc_type] = useState("");
  const [doc_number, setDoc_number] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [token, setToken] = useState("")
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var body = {
        doc_type,
        doc_number,
        cardNumber,
        cardExpYear,
        cardExpMonth,
        cardCvc,
      };
      
      console.log(body);
      var tkn = (window.sessionStorage.getItem('token'))
      setToken(tkn)
  
      const subscription = await client.post("payment/subscription/plan-especial", body, {
          headers: {
              "Authorization": `Bearer ${tkn}`
          }
      });

      console.log("request ", subscription);
      if (subscription.data.status === "success") {
        window.sessionStorage.setItem("nivelSuscripcion", 1);
        router.push("/");
      }

    } catch (error) {
      console.log("error", error);
      // var error = error.response.data.error;
      console.error("Error en alguno de tus datos", error.response.data);
      setErrors([error]);
    }
  };
  return (
    <>
      <div
        style={{
          backgroundImage: "url(/images/backgroundRegister.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="pt-32 flex ">
          <div className=" p-8 max-w-lg mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden">
             {!errors
              ? errors.map((err) => (
                  <div
                    key="e"
                    id="alert-2"
                    className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium">
                      {err.message}
                    </div>
                    <button
                      type="button"
                      className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                      data-dismiss-target="#alert-2"
                      aria-label="Close"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              : null}
            <h1 className="text-2xl font-semibold mb-4">Formulario de pago</h1>
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-1 flex flex-col items-start w-full">
                <label className="mt-4 text-s leading-tight font-medium text-black">
                  Tipo Documento:
                </label>
                <select
                  id="doc_type"
                  className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                  value={doc_type}
                  onChange={(e) => setDoc_type(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Selecciona una opción
                  </option>
                  <option value="CC">
                  Cedula de Ciudadania
                  </option>
                  <option value="NIT">
                    NIT
                  </option>
                  <option value="CE">
                    Cédula de extranjeria
                  </option>
                  <option value="PPN">
                    Pasaporte
                  </option>
                </select>
              </div>
              <div className="col-span-1 flex flex-col items-start w-full">
                <label className="mt-4 text-s leading-tight font-medium text-black">
                  Numero de Documento:
                </label>
                <input
                  id="doc_number"
                  className="w-52 mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Número de Documento"
                  type="number"
                  required
                  value={doc_number}
                  onChange={(e) => setDoc_number(e.target.value)}
                />
              </div>
              <div className="col-span-1 flex flex-col items-start w-full">
                <label className="mt-4 text-s leading-tight font-medium text-black">
                  Número de tarjeta:
                </label>
                <input
                  id="cardNumber"
                  className="w-52 mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Número de tarjeta"
                  type="number"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="col-span-1 flex flex-col items-start w-full">
                <label className="mt-4 text-s leading-tight font-medium text-black">
                  Año de expiración:
                </label>
                <input
                  id="cardExpYear"
                  className="w-52 mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Año de expiración"
                  type="number"
                  required
                  value={cardExpYear}
                  onChange={(e) => setCardExpYear(e.target.value)}
                />
              </div>
              <div className="col-span-1 flex flex-col items-start w-full">
                <label className="mt-4 text-s leading-tight font-medium text-black">
                  Mes de expiración:
                </label>
                <input
                  id="cardExpMonth"
                  className="w-52 mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Mes de expiración"
                  type="number"
                  required
                  value={cardExpMonth}
                  onChange={(e) => setCardExpMonth(e.target.value)}
                />
              </div>
              <div className="col-span-1 flex flex-col items-start w-full">
                <label className="mt-4 text-s leading-tight font-medium text-black">
                  Codigo de seguridad:
                </label>
                <input
                  id="cardCvc"
                  className="w-52 mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Codigo de Seguridad"
                  type="number"
                  required
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                />
              </div>
            </form>
            <Button
              type="submit"
              style={{ background: "#D63447" }}
              className="mt-4 px-5 w-1/2 mx-auto shadow-xl"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayInfo;
