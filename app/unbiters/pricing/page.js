import PricingCard from "../../../components/PricingCard";

export default function Pricing() {
  return (
    <>
      <div style={{backgroundImage: "url(/images/portadaPrecios.jpg)", backgroundSize: "cover"}} className="flex flex-col items-center bg-[#F5F5F5] p-4">
        <div className="mb-16 mt-8 text-center">
          <h1 className="mb-4 mt-28 text-7xl font-black text-[#F5F5F5]">
            Precios
          </h1>
          <h3 className="text-2xl text-[#F5F5F5]">
            Escoge el plan perfecto para ti
          </h3>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-red-500 gap-8 p-10 md:flex-col lg:flex-row">
        <PricingCard
          precio="Gratis"
          name="Plan Basico"
          description="Plan basico que obtienes al crear una cuenta"
          color="#F5F5F5"
          features={[
            "Chazas de zona Ingenieria",
            "Numero de calificaciones limite 3",
            "Acceso a la reseña con mas likes ",
          ]}
          btnText="Acceder ahora"
        />  
        <PricingCard
          precio="10.000 COP"
          name="Plan Standard"
          description="Todo lo del plan basico mas:"
          color="#F5F5F5"
          features={[
            "Chazas de toda la universidad",
            "Numero de calificaciones limite 8",
            "Acceso a todas las reseñas",
            "Soporte en horario laboral"
          ]}
          btnText="Acceder ahora"
          
        />
        <PricingCard
          precio='15.000 COP'
          name="Plan Premium"
          description="Todo lo del plan Standard mas:"
          color="#F5F5F5"
          features={[
            "Chazas de otras universidades",
            "Numero de calificaciones sin limite",
            "Soporte 24/7",
          ]}
          btnText="Acceder ahora"
        />
      </div>
    </>
  );
}
