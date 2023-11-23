import Image from "next/image";

const BlogCard = ({ title, content, color }) => (
  <div className={`bg-[${color}] p-6 rounded-lg shadow-md mb-6`}>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <p className="text-gray-700">{content}</p>
  </div>
);

export default function BlogView() {
  const colors = [ "#F57B51", "#F6EEDF"];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  return (
    <div className="py-12 pb-32">
      <div className="container mx-auto">
        <div className="text-center bg-white p-6 rounded-md mb-8 max-w-xl mx-auto">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            ¡Ponte al Corriente con UNBiters!
          </h1>
        </div>
      
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Top Comidas Favoritas de la Semana */}
          <BlogCard
            title="Top Comidas Favoritas de la Semana"
            content="Descubre las mejores opciones gastronómicas que nuestros usuarios han destacado esta semana. ¡Anímate a probarlas!"
            color={getRandomColor()}
          />

          {/* Entrevistas a Chefs Estudiantiles */}
          <BlogCard
            title="Entrevistas a Chefs Estudiantiles"
            content="Conoce a estudiantes que son auténticos chefs aficionados. Explora sus historias detrás de la cocina universitaria, sus platos favoritos y los consejos que tienen para ofrecer a otros amantes de la comida."
            color={getRandomColor()}
            />

          {/* Explorando Sabores del Mundo */}
          <BlogCard
            title="Explorando Sabores del Mundo"
            content="Viaja sin salir del campus explorando los sabores del mundo. Desde auténticos platos asiáticos hasta deliciosas opciones mediterráneas, descubre la diversidad culinaria que tu universidad tiene para ofrecer."
            color={getRandomColor()}
          />

          {/* Mejores Lugares para Estudiar */}
          <BlogCard
            title="Mejores Lugares para Estudiar"
            content="Encuentra esos lugares especiales donde la comida deliciosa se combina perfectamente con un ambiente propicio para estudiar. Descubre cafeterías y restaurantes que se convierten en tus mejores aliados durante las sesiones de estudio."
            color={getRandomColor()}
          />

          {/* Opciones Saludables en el Campus */}
          <BlogCard
            title="Opciones Saludables en el Campus"
            content="Para aquellos que buscan mantener un estilo de vida saludable, explora las opciones de comida que ofrecen una combinación perfecta de sabor y nutrición. Descubre restaurantes que te ayudarán a mantener tus metas de bienestar."
            color={getRandomColor()}
          />

          {/* Guía de Comida Rápida para Estudiantes Ocupados */}
          <BlogCard
            title="Guía de Comida Rápida para Estudiantes Ocupados"
            content="Cuando el tiempo es escaso pero el hambre no espera, descubre opciones de comida rápida y deliciosa diseñadas especialmente para estudiantes ocupados."
            color={getRandomColor()}
          />

          {/* Eventos Gastronómicos en el Campus */}
          <BlogCard
            title="Eventos Gastronómicos en el Campus"
            content="Sumérgete en la emoción de eventos especiales centrados en la comida. Desde festivales gastronómicos hasta ferias culinarias, mantente al tanto de las experiencias gastronómicas únicas que ofrece tu campus."
            color={getRandomColor()}
          />

          {/* Secretos de Cocina de Profesores */}
          <BlogCard
            title="Secretos de Cocina de Profesores"
            content="Descubre los secretos culinarios detrás de los escritorios y pizarras. Profesores y personal académico comparten sus recetas favoritas y experiencias culinarias."
            color={getRandomColor()}
          />

          {/* Historias de Comida Compartida */}
          <BlogCard
            title="Historias de Comida Compartida"
            content="Cada estudiante tiene una historia detrás de su comida favorita. Explora las experiencias culinarias compartidas por estudiantes de diversas culturas y orígenes."
            color={getRandomColor()}
          />

          {/* Reseñas de Comida para Estudiantes con Dietas Especiales */}
          <BlogCard
            title="Reseñas de Comida para Estudiantes con Dietas Especiales"
            content="Para aquellos con necesidades dietéticas específicas, descubre restaurantes que ofrecen opciones deliciosas y adaptadas. Desde platos vegetarianos y veganos hasta opciones sin gluten, encuentra lugares que satisfacen todas las preferencias."
            color={getRandomColor()}
          />

          {/* Clases de Cocina en el Campus */}
          <BlogCard
            title="Clases de Cocina en el Campus"
            content="Sumérgete en el mundo de la cocina con clases prácticas y eventos especiales en el campus. Descubre oportunidades para aprender nuevas habilidades culinarias y experimentar con ingredientes frescos."
            color={getRandomColor()}
          />

          {/* Reseñas de Puestos de Comida Callejera */}
          <BlogCard
            title="Reseñas de Puestos de Comida Callejera"
            content="Explora los sabores auténticos de la comida callejera que rodea el campus. Desde tacos y kebabs hasta opciones más exóticas, descubre los mejores lugares para disfrutar de auténtica comida callejera."
            color={getRandomColor()}
          />

          {/* Favoritos de la Temporada */}
          <BlogCard
            title="Favoritos de la Temporada"
            content="Descubre las delicias de temporada que ofrecen los restaurantes locales. Desde bebidas refrescantes en verano hasta platos reconfortantes en invierno, explora los favoritos de cada estación."
            color={getRandomColor()}
          />

          {/* Comparativas de Precios */}
          <BlogCard
            title="Comparativas de Precios"
            content="Para aquellos que buscan opciones asequibles, explora comparativas de precios y porciones en diferentes lugares del campus. Encuentra las mejores ofertas que se ajusten a tu presupuesto de estudiante."
            color={getRandomColor()}
          />

          {/* Desafíos Gastronómicos */}
          <BlogCard
            title="Desafíos Gastronómicos"
            content="Embárcate en desafíos culinarios divertidos y deliciosos. Desde crear tu versión de un plato clásico hasta probar sabores inusuales, participa en desafíos gastronómicos diseñados para estudiantes creativos y atrevidos."
            color={getRandomColor()}
          />
        </div>

        <p className="mt-8 text-center text-gray-700">
          Si tienes preguntas, contáctanos a través de{" "}
          <a href="/unbiters/contactus" className="text-blue-500 hover:underline">
            este enlace
          </a>
          .
        </p>
      </div>
    </div>
  );
}
