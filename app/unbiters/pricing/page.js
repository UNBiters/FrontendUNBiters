import PricingCard from "../../../components/PricingCard";


export default function Pricing() {
  return (
    <>
      <div  style={{backgroundImage: "url(/images/portadaPrecios.jpg)", backgroundSize: "cover", paddingBottom: '150px' }} className="flex flex-col items-center bg-[#F5F5F5] p-4">
        <div className="mb-16 mt-8 text-center">
          <h1 className="mb-4 mt-28 text-7xl font-black text-[#F5F5F5]">
            Precios y planes
          </h1>
          <h3 className="text-2xl text-[#F5F5F5]">
            Escoge el plan que se ajuste a ti
          </h3>
        </div>
      </div>
      <div className="flex justify-center bg-red-500 gap-8 p-4 md:flex-col lg:flex-row" style={{ paddingBottom: '150px' }}>
        <PricingCard
          precio="Gratis"
          name="Plan Basico"
          description="Plan basico que obtienes al crear una cuenta"
          color="#F5F5F5"
          features={[
            "Publica tu chaza y tus clientes podran calificar tus servicios",
            "Acceso a Calificaciones, reseñas y funciones que te encantaran",
            "Busca tu chaza favorita o filtra por el tipo de comida que quieras",
          ]}
          link="/"
          btnText="Acceder ahora"
        />  
        <PricingCard
          precio="10.000 COP/mensual"
          name="Plan Especial"
          description="Ganaras acceso a herramientas como:"
          color="#F5F5F5"
          features={[
            "Estadisticas y graficas para ver como le va a tus comidas ",
            "Servicio 24/7"
          ]}
          link="/unbiters/pricing/plan-especial"
          btnText="Acceder ahora"
          
        />
      </div>
    </>
  );
}
