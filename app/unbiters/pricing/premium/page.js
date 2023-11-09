"use client";

import { Button } from "flowbite-react";
import { useState } from "react";
import PersonalInfo from "@/components/Premium/PersonalInfo";
import PayInfo from "@/components/Premium/PayInfo";


export default function Premium() {
  const [FormActual, setFormActual] = useState(1);

  const handleSigForm = () => {
    setFormActual(FormActual + 1)
  };
  return (
    <>
      <div>
      <h1>Form</h1>
      {FormActual === 1 ? (
        <PersonalInfo SiguienteForm={handleSigForm} />
      ) : (
        <PayInfo/>
      )}
      </div>
    </>
  );
}
