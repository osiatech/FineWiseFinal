import Image from "next/image"; 
 
const AboutSectionTwo = () => { 
  return ( 
    <section className="py-16 md:py-20 lg:py-28"> 
      <div className="container"> 
        <div className="-mx-4 flex flex-wrap itemscenter"> 
          <div className="w-full px-4 lg:w-1/2"> 
            <div 
              className="wow fadeInUp relative mx-auto mb12 aspect-[25/24] max-w-[500px] text-center lg:m-0" 
              data-wow-delay=".15s" 
            > 
<Image 
                src="/images/about/dashboardImage2.png"                 alt="dashboard imagen" 
                fill 
                className="drop-shadow-three dark:hidden dark:drop-shadow-none" 
              /> 
              <Image 
                src="/images/about/dashboardImage2.png"                 alt="dashboard imagen" 
                fill 
                className="drop-shadow-three hidden dark:block dark:drop-shadow-none" 
              /> 
            </div> 
          </div> 
          <div className="w-full px-4 lg:w-1/2"> 
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s"> 
<div className="mb-9"> 
                <h3 className="mb-4 text-xl font-bold textblack dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"> 
                  Integración con Inteligencia Artificial 
                </h3> 
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leadingrelaxed"> 
                  Recibe recomendaciones personalizadas para mejorar tus finanzas gracias al análisis inteligente de tus hábitos. 
                </p> 
              </div> 
              <div className="mb-9"> 
                <h3 className="mb-4 text-xl font-bold textblack dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"> 
                   100% Gratuita 
                </h3> 
  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leadingrelaxed"> 
                  Accede a todas las funcionalidades sin pagar ni suscripciones ocultas. Totalmente libre de costos. 
                </p> 
              </div> 
              <div className="mb-1"> 
                <h3 className="mb-4 text-xl font-bold textblack dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"> 
                  Visualización Clara de Datos 
                </h3> 
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leadingrelaxed"> 
                  Monitorea tu salud financiera con gráficos, porcentajes y análisis detallados en tiempo real. 
                </p> 
              </div> 
            </div> 
</div> 
        </div> 
      </div> 
    </section> 
  ); 
}; 
 
export default AboutSectionTwo; 
