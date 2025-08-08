'use client'
import { useState } from "react"; import NewsLatterBox from "./NewsLatterBox";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", message: "",
  });

  const [errors, setErrors] = useState({
    name: "", email: "", message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]:
        e.target.value
    }); setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); let hasError = false; const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio."; hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El correo electrónico no es válido."; hasError = true;
    }
    if (!formData.message.trim()) {
      newErrors.message = "La descripción es obligatoria.";
      hasError = true;
    }

    setErrors(newErrors);
    if (!hasError) {
      console.log("Formulario válido. Datos enviados:", formData);
      //
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-
11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold textblack dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">                 ¿Necesitas ayuda? Estamos aquí para ayudarte </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Nuestro equipo de soporte te ayudará
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="name" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Nombre Completo
                      </label>                       <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Inserta tu nombre completo"
                        className="border-stroke dark:text-body-
color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] 	px-6 	py-3 	text-base 	text-body-color outline-none 	focus:border-primary 	dark:bordertransparent 	dark:bg-[#2C303B] 	dark:focus:borderprimary"
                      />
                      {errors.name && <p className="text-red500 text-sm mt-2">{errors.name}</p>}
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Correo Electrónico
                      </label>                       <input type="email" name="email" value={formData.email}
                        onChange={handleChange}
                        placeholder="Inserta tu correo electrónico" className="border-stroke dark:text-bodycolor-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] 	px-6 	py-3 	text-base 	text-body-color outline-none 	focus:border-primary 	dark:bordertransparent 	dark:bg-[#2C303B] 	dark:focus:borderprimary"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label htmlFor="message" className="mb3 block text-sm font-medium text-dark dark:textwhite">
                        Descripción
                      </label>
                      <textarea
                        name="message" value={formData.message} onChange={handleChange}
                        rows={5}
                        placeholder="Inserta el mensaje" className="border-stroke dark:text-bodycolor-dark dark:shadow-two w-full resize-none roundedsm border bg-[#f8f8f8] px-6 py-3 text-base text-bodycolor outline-none focus:border-primary dark:bordertransparent 	dark:bg-[#2C303B] 	dark:focus:borderprimary"
                      ></textarea>
                      {errors.message && <p className="text-red500 text-sm mt-2">{errors.message}</p>}
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="shadow-submit dark:shadowsubmit-dark rounded-sm bg-primary px-9 py-4 text-base font-medium 	text-white 	duration-300 	hover:bgprimary/90"
                    >
                      Enviar Solicitud
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
