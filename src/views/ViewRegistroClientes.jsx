import { useEffect, useState } from "react";
import { GET, POST } from "../services/Fetch";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function ViewRegistroClientes() {
  const [estiloBorde, setEstiloBorde] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Documento: "",
    FechaNacimiento: "",
    Genero: "Masculino",
    Email: "",
    Direccion: "",
    Telefono: "",
  });

  const validaciones1 = {
    Documento: /^[0-9]{7,9}$/,
    Email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  };

  const validaciones2 = {
    Nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    Apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    Genero: /^(Masculino|Femenino|Otro)$/i,
    FechaNacimiento: /^\d{2,4}-\d{2}-\d{2,4}$/,
    Direccion: /^.{0}$|^.{5,100}$/,
    Telefono: /^(\d{10})?$/,
  };
  const { empresa } = useParams();

  useEffect(() => {
    async function checkEmpresa() {
      let rsp = await GET("authclientes/checkempresa", { empresa: empresa });
      switch (rsp?.status) {
        case 200:
          rsp = await rsp.json();
          setEstiloBorde(rsp.response.colorPrincipal);
          setNombreEmpresa(rsp.response.nombreEmpresa);
          return;
        case 404:
          navigate("/404");
          return;
        case 500:
          navigate("/500");
          return;
        default:
          navigate("/500");
          return;
      }
    }
    checkEmpresa();
  }, [])

  function handleChange(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (validaciones[name].test(value)) {
      setErrors({ ...errors, [name]: false });
    } else {
      setErrors({ ...errors, [name]: true });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    let newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!validaciones[key].test(formData[key])) {
        newErrors[key] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);
    if (isValid) {
      try {
        let response = await POST("clientes/crearcliente", {
          ...formData,
          FechaNacimiento: new Date(formData.FechaNacimiento).toISOString(),
        });
        if (response) {
          switch (response.status) {
            case 200:
              setMessage(
                "El cliente " +
                formData.Nombre +
                " " +
                formData.Apellido +
                ", Documento: " +
                formData.Documento +
                " ha sido cargado correctamente"
              );
              setFormData({
                Nombre: "",
                Apellido: "",
                Documento: "",
                FechaNacimiento: "",
                Genero: "Masculino",
                TipoCliente: "Consumidor Final",
                Email: "",
                Direccion: "",
                Telefono: "",
              });
              setErrors({});
              setShowModal(true);
              break;
            case 401:
              setMessage(
                "Su sesion expiro. Por favor, vuelva a iniciar sesion"
              );
              setShowModal(true);
              break;
            default:
              response = await response.json();
              setMessage(response.message);
              setShowModal(true);
              break;
          }
        } else {
          if (navigator.onLine) {
            setMessage(
              "El servidor no responde. Por favor vuelva a intentarlo en unos minutos. Si el problema persiste contáctese con la sucursal más cercana"
            );
          } else {
            setMessage(
              "Hubo un problema al agregar cliente. Por favor, verifique la conexión y vuelva a intentarlo."
            );
          }
          setShowModal(true);
        }
      } catch {
        setMessage(
          "Hubo un problema al agregar cliente. Por favor, contacte con un administrador."
        );
        setShowModal(true);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex flex-column flex-wrap align-items-center card-rounded" style={{ borderColor: `${estiloBorde}`, boxShadow: `${estiloBorde} 0px 0rem 2rem` }}>
        <h2 className="mb-4">Registrate en {nombreEmpresa}</h2>
          {
            step === 1 ?
              <>
                <div className="mb-3" style={{width: "300px"}}>
                  <label htmlFor="Documento" className="form-label">
                    Documento
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Documento ? "is-invalid" : ""}`}
                    id="Documento"
                    name="Documento"
                    value={formData.Documento}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3" style={{width: "300px"}}>
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="Email"
                    className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                  />
                </div>
              </>
              :
              <>
                <div className="mb-3">
                  <label htmlFor="Nombre" className="form-label">
                    Nombre(*)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Nombre ? "is-invalid" : ""}`}
                    id="Nombre"
                    name="Nombre"
                    value={formData.Nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Apellido" className="form-label">
                    Apellido(*)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Apellido ? "is-invalid" : ""}`}
                    id="Apellido"
                    name="Apellido"
                    value={formData.Apellido}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="FechaNacimiento" className="form-label">
                    Fecha de Nacimiento(*)
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.FechaNacimiento ? "is-invalid" : ""
                      }`}
                    id="FechaNacimiento"
                    name="FechaNacimiento"
                    value={formData.FechaNacimiento}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Genero" className="form-label">
                    Género(*)
                  </label>
                  <select
                    className={`form-select ${errors.Genero ? "is-invalid" : ""}`}
                    id="Genero"
                    name="Genero"
                    value={formData.Genero}
                    onChange={handleChange}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="TipoCliente" className="form-label">
                    Tipo de cliente(*)
                  </label>
                  <select
                    className={`form-select ${errors.TipoCliente ? "is-invalid" : ""
                      }`}
                    id="TipoCliente"
                    name="TipoCliente"
                    value={formData.TipoCliente}
                    onChange={handleChange}
                  >
                    <option value="Consumidor Final">Consumidor Final</option>
                    <option value="Responsable Inscripto">
                      Responsable Inscripto
                    </option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="Direccion" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Direccion ? "is-invalid" : ""}`}
                    id="Direccion"
                    name="Direccion"
                    value={formData.Direccion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.Telefono ? "is-invalid" : ""}`}
                    id="Telefono"
                    name="Telefono"
                    value={formData.Telefono}
                    onChange={handleChange}
                  />
                </div>
              </>
          }
          {isLoading ?
            <div style={{ justifySelf: "center" }} className="d-flex spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            :
              <button style={{ marginTop: "0px", marginBottom: "10px" }} onClick={handleSubmit} className="btn btn-success mt-3 justify-self-right custom-button">
                Registrarse
              </button>
          }
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
      </div>
      <br />
    </div>
  );
}


// Términos y Condiciones de Fidebill
// Última actualización: [Fecha]

// 1. Introducción
// Bienvenido a Fidebill, una plataforma gratuita operada por Fidebill S.A. (en adelante, "nosotros", "nuestro" o "Fidebill"), dedicada a ofrecer un software que permite a los clientes visualizar promociones vigentes, consultar los puntos acumulados en compras y acceder a información relevante sobre las transacciones realizadas en empresas asociadas. Fidebill es una aplicación diseñada para usuarios que deseen obtener beneficios y conocer las promociones publicadas por las empresas, las cuales se muestran a discreción de cada empresa.

// Al utilizar Fidebill, usted acepta estos Términos y Condiciones, por lo que le solicitamos leerlos detenidamente. Si no está de acuerdo con alguno de estos términos, no deberá utilizar nuestros servicios.

// 2. Definiciones
// Usuario: Toda persona que se registra y utiliza la plataforma Fidebill.

// Cuenta: La cuenta personal que el Usuario crea en Fidebill, utilizando su Documento Nacional de Identidad (DNI) tanto como usuario como para la recuperación de contraseña.

// Promociones: Ofertas y descuentos publicados por las empresas asociadas a la plataforma, cuyo contenido y vigencia quedan a criterio exclusivo de cada empresa.

// Puntos: Los créditos que acumula el Usuario a partir de sus compras en empresas asociadas.

// Datos Personales: Información como nombre, apellido, DNI, dirección, teléfono, correo electrónico y género.

// 3. Registro y Acceso
// Proceso de Registro:
// Para acceder a los Servicios, el Usuario debe completar el proceso de registro proporcionando información precisa y veraz, incluyendo nombre, apellido, DNI, dirección, teléfono, correo electrónico y género.
// El DNI se utilizará como nombre de usuario y para la contraseña inicial (por defecto, el mismo DNI). Una vez registrado, el Usuario podrá cambiar su contraseña, pero el nombre de usuario (DNI) no podrá modificarse.

// Uso de Datos Falsos:
// El registro con datos falsos constituye un uso fraudulento de la plataforma. Fidebill se reserva el derecho de suspender o eliminar cualquier cuenta que se registre con información incorrecta o engañosa.

// 4. Uso de los Servicios
// Fidebill permite a los Usuarios:

// Visualizar las promociones vigentes publicadas por empresas asociadas.

// Consultar el saldo de puntos acumulados en compras.

// Visualizar la ubicación de los locales de las empresas.

// Consultar las últimas 15 transacciones realizadas por el Usuario en las empresas asociadas.

// 5. Privacidad y Protección de Datos
// Fidebill recopila y almacena los siguientes Datos Personales de los Usuarios:

// Nombre y apellido.

// Documento Nacional de Identidad (DNI).

// Dirección.

// Teléfono.

// Correo electrónico.

// Género.

// Estos datos se utilizan única y exclusivamente para:

// Permitir el acceso y uso de la plataforma.

// Personalizar y mejorar la experiencia del Usuario.

// Facilitar la visualización de promociones y transacciones.

// Comunicarse con el Usuario, por ejemplo, a través de correos electrónicos (enviados mediante Gmail) y notificaciones relacionadas con la seguridad de la cuenta.

// Fidebill no utiliza tarjetas de crédito ni procesa pagos a través de la plataforma.
// Los datos serán almacenados de forma segura y serán procesados conforme a nuestra Política de Privacidad, la cual se encuentra disponible para consulta en el sitio web. Al utilizar la plataforma, el Usuario acepta los términos de la Política de Privacidad.

// 6. Servicios de Terceros
// Para ofrecer sus servicios, Fidebill utiliza proveedores externos, tales como:

// Azure para infraestructura y almacenamiento en la nube.

// Vercel para el despliegue y hosting de la aplicación.

// Cloudinary para el manejo y almacenamiento de imágenes.

// Gmail para el envío de correos electrónicos (por ejemplo, códigos de verificación, notificaciones de seguridad).

// Estos servicios se utilizan de conformidad con sus propios términos y políticas de privacidad.

// 7. Derechos de Propiedad Intelectual
// Todos los derechos, títulos e intereses sobre la plataforma, incluyendo su contenido, diseño, logotipos, gráficos, y código fuente, son propiedad de Fidebill S.A. o de sus licenciantes. El Usuario no adquiere ningún derecho de propiedad sobre la aplicación al utilizarla.

// 8. Suspensión o Terminación de la Cuenta
// Fidebill se reserva el derecho de suspender o eliminar la cuenta de cualquier Usuario que:

// Proporcione datos falsos o engañosos durante el registro.

// Utilice la plataforma de manera fraudulenta o ilegal.

// Infrinja estos Términos y Condiciones.

// 9. Limitación de Responsabilidad
// En la máxima medida permitida por la ley, Fidebill no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos que resulten del uso o la imposibilidad de uso de la plataforma, incluyendo pero no limitándose a pérdida de datos, interrupción del servicio o cualquier otro perjuicio.

// 10. Modificaciones de los Términos
// Fidebill se reserva el derecho de modificar, actualizar o cambiar estos Términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma. Es responsabilidad del Usuario revisar periódicamente los Términos para estar informado de cualquier cambio.

// 11. Jurisdicción y Ley Aplicable
// Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República Argentina. Cualquier disputa que surja en relación con estos Términos se resolverá en los tribunales competentes de [Ciudad/Provincia, Argentina].

// 12. Soporte y Contacto
// Para consultas, dudas o soporte, los Usuarios pueden ponerse en contacto a través de los siguientes medios:

// Correo electrónico de soporte: [soporte@fidebill.com]

// Número de soporte: [+54 (0)11 1234-5678]

