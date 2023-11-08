"use client";

import { Button } from "flowbite-react";
import { useState } from "react";
import PersonalInfo from "@/components/Premium/PersonalInfo";
import CardInfo from "@/components/Premium/CardInfo";


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
        <CardInfo/>
      )}
      </div>
    </>
  );
}
