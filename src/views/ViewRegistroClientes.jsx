import { useRef, useState } from "react"
import { Button, Form, Card, Alert } from "react-bootstrap"
import React from "react"
import { POST } from "../services/Fetch"
import { useEmpresa } from "../Contexts/EmpresaContext";
import "../assets/css/ViewRegistroClientes.css"
import CheckOnline from "../utils/CheckOnline";

export default function ViewRegistroClientes() {
  const { empresa, idEmpresa, estiloBorde } = useEmpresa();
  const [step, setStep] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    dni: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    phone: "",
    address: "",
  })
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    dni: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    address: "",
  })
  const codeInputRefs = useRef([]);


  const validators = {
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingrese un correo electrónico válido"
    },
    dni: {
      regex: /^[1-9][0-9]{6,8}$/,
      message: "Número de DNI inválido"
    },
    phone: {
      regex: /^\d{9,15}$/,
      message: "Ingrese un número de teléfono válido"
    },
    firstName: {
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,50}$/,
      message: "Ingrese un nombre válido"
    },
    lastName: {
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,50}$/,
      message: "Ingrese un apellido válido"
    },
    address: {
      regex: /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñ])(?=.*\d)[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.\-ºª,]{3,}$/,
      message: "Ingrese una direccion válida"
    },
    birthDate: {
      custom: (value) => {
        if (!value) return "Ingrese su fecha de nacimiento";

        let birth = new Date(value);
        let today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        let monthDiff = today.getMonth() - birth.getMonth();
        let dayDiff = today.getDate() - birth.getDate();

        let adjustedAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

        if (adjustedAge < 18) return "Debe tener al menos 18 años";
        if (adjustedAge > 130) return "Edad inválida";
        return "";
      }
    }
  };

  function validateField(name, value) {
    let validator = validators[name];
    if (validator) {
      if (validator.regex) {
        return validator.regex.test(value) ? "" : validator.message;
      }
      if (validator.custom) {
        return validator.custom(value);
      }
    }
    return "";
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    if (error || validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  }


  function handleVerificationCodeChange(e, index) {
    let value = e.target.value;

    if (value && !/^\d+$/.test(value)) {
      return
    }

    const newVerificationCode = formData.verificationCode.split("")
    newVerificationCode[index] = value

    setFormData({
      ...formData,
      verificationCode: newVerificationCode.join(""),
    })

    if (value && index < 5) {
      codeInputRefs.current[index + 1].focus()
    }
  }

  function handleVerificationCodeKeyDown(e, index) {
    if (e.key === "Backspace" && !formData.verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1].focus()
    }
  }

  const startResendTimer = () => {
    setResendTimer(60)
    setTimerActive(true)

    const timer = setInterval(() => {
      setResendTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setTimerActive(false)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }

  const sendVerificationCode = async (e) => {
    e.preventDefault()

    if (!regex.email.test(formData.email)) {
      setValidationErrors({
        ...validationErrors,
        email: "Ingrese un correo electrónico válido",
      })
      return
    }

    setLoading(true)
    setError("")

    try {
      setLoading(true);
      setSuccess("");
      setError("");
      let rsp = await POST("registroclientes/verificarcorreo", { IdEmpresa: idEmpresa, Email: formData.email, reenvio: emailSent })
      if (rsp) {
        switch (rsp.status) {
          case 200:
            rsp = await rsp.json();
            localStorage.setItem(empresa, rsp.token);
            codeInputRefs.current = codeInputRefs.current.slice(0, 6);
            setEmailSent(true);
            setSuccess("Código de verificación enviado. Por favor revise su correo. Verifique también las carpetas de Spam, Correo no deseado o Promociones");
            startResendTimer();
            setTimeout(() => {
              if (codeInputRefs.current[0]) {
                codeInputRefs.current[0].focus()
              }
            }, 100);
            break;
          case 401:
            window.location.reload();
            break;
          case 409:
            rsp = await rsp.json();
            switch (rsp.error) {
              case -1:
                setSuccess("");
                setError("El correo ya esta en uso");
                break;
              case -2:
                setSuccess("");
                setError("Se ha excedido el limite de reenvios. Por favor, intente nuevamente mas tarde");
                break;
              case -3:
                localStorage.setItem(empresa, rsp.token);
                setSuccess("Este correo ya fue verificado");
                setStep(2);
                break;
              case -4:
                localStorage.setItem(empresa, rsp.token)
                setEmailSent(true);
                setSuccess("Ya tiene un código pendiente. Por favor revise su correo. Verifique también las carpetas de Spam, Correo no deseado o Promociones.");
                break;
            }
            break;
          case 500:
            setError("Ha ocurrido un problema. Si el problema persiste contactese con la sucursal mas cercana.");
            break;
          case 550:
            setError("Ha ocurrido un error con el envio de correo");
            break;
        }
      } else {
        setError(CheckOnline());
      }


    } catch (err) {
      setSuccess("");
      setError("Error al enviar el código de verificación")
    } finally {
      setLoading(false)
    }
  }

  async function verifyEmailCode(e) {
    e.preventDefault();
    setSuccess("");
    if (formData.verificationCode.length !== 6) {
      setError("El código debe tener 6 dígitos.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      let rsp = await POST("registroclientes/verificarcodigo", { codigo: formData.verificationCode });
      if (rsp) {
        switch (rsp.status) {
          case 200:
            setEmailVerified(true);
            setStep(2);
            setSuccess("Correo verificado correctamente");
            break;
          case 401:
            window.location.reload();
            break;
          case 409:
            rsp = await rsp.json();
            switch (rsp) {
              case -1:
                setError("No se ha podido procesar la solicitud");
                break;
              case -2:
                setError("Se ha excedido el limite de intentos. Debe generar un correo nuevo");
                break;
              case -3:
                setEmailSent(false);
                setError("Su código de verificación expiró. Por favor, genere uno nuevo");
                break;
              case -4:
                setError("Código invalido");
                break;
              default:
                setSuccess("Ha ocurrido un problema. Si el problema persiste contactese con la sucursal mas cercana");
                break;
            }
            break;
          case 500:
            setError("Ha ocurrido un problema. Si el problema persiste contactese con la sucursal mas cercana");
            break;
          case 550:
            setError("No se ha podido enviar el correo");
            break;
        }
      } else {
        setError(CheckOnline());
      }
    } catch (err) {
      setError("Error al verificar el código")
    } finally {
      setLoading(false)
    }
  }

  const verifyDni = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (regex.dni.test(formData.dni)) {
      return;
    }
    setLoading(true);

    try {
      let rsp = await POST("registroclientes/verificardni", { codigo: formData.dni });
      if (rsp) {
        switch (rsp.status) {
          case 200:
            setStep(3);
            break;
          case 401:
            window.location.reload();
            break;
          case 409:
            rsp = await rsp.json();
            switch (rsp) {
              case -1:
                setError("Ha ocurrido un error");
                break;
              case -2:
                setError("Este documento se encuentra registrado. Si considera que esto es un error, por favor, acérquese a la sucursal más cercana");
                break;
              default:
                setSuccess("Ha ocurrido un problema. Si el problema persiste contactese con la sucursal mas cercana");
                break;
            }
            break;
          case 500:
            setError("Ha ocurrido un problema. Si el problema persiste contactese con la sucursal mas cercana");
            break;
          case 550:
            setError("No se ha podido enviar el correo");
            break;
        }
      } else {
        setError(CheckOnline());
      }
    } catch (err) {
      setError("Error al verificar el DNI.");
    } finally {
      setLoading(false)
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let rsp = await POST("registroclientes/completarregistro", {
        Nombre: formData.firstName,
        Apellido: formData.lastName,
        FechaNacimiento: formData.birthDate,
        Genero: formData.gender,
        Direccion: formData.address,
        Telefono: formData.phone
      })
      if (rsp) {
        switch (rsp.status) {
          case 200:
            setSuccess("¡Registro completado con éxito! Para ingresar a la app por primera vez, utilice su DNI como usuario y contraseña");
            break;
          case 400:
            setError("Verifique que los datos sean correctos");
            break;
          case 401:
            window.location.reload();
            break;
          case 500:
            setError("Ha ocurrido un problema. Si el problema persiste contactese con la sucursal mas cercana");
            break;
          case 550:
            setError("No se ha podido enviar el correo");
            break;
        }
      } else {
        setError(CheckOnline());
      }
    } catch (err) {
      setError("Error al enviar el formulario.");
    } finally {
      setLoading(false)
    }
  }

  // Render progress indicator
  const renderProgress = () => (
    <div className="progress-indicator mb-4">
      <div className="d-flex justify-content-between">
        <div className={`step-indicator ${step >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <div className="step-title">Verificar correo</div>
        </div>
        <div className={`step-indicator ${step >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <div className="step-title">Verificar DNI</div>
        </div>
        <div className={`step-indicator ${step >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <div className="step-title">Datos personales</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mt-5">
      <Card className="shadow-sm">
        <Card.Header>
          <h2 className="text-center">Registro de usuario</h2>
        </Card.Header>
        <Card.Body>
          {renderProgress()}

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {
            step === 1 &&
            <Form onSubmit={emailVerified ? null : emailSent ? verifyEmailCode : sendVerificationCode}>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={emailSent}
                  required
                  placeholder="Ingrese su correo electrónico"
                  className={validationErrors.email ? "is-invalid" : ""}
                />
                {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
              </Form.Group>

              {emailSent && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Código de verificación</Form.Label>
                    <div className="verification-code-container">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          className="verification-code-input"
                          value={formData.verificationCode[index] || ""}
                          onChange={(e) => handleVerificationCodeChange(e, index)}
                          onKeyDown={(e) => handleVerificationCodeKeyDown(e, index)}
                          ref={(el) => (codeInputRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                    <Form.Text className="text-muted">Ingrese el código de 6 dígitos enviado a su correo.</Form.Text>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={sendVerificationCode}
                      disabled={loading || timerActive}
                      className="resend-button"
                    >
                      {timerActive ? `Reenviar código (${resendTimer}s)` : "Reenviar código"}
                    </Button>

                    <Button variant="primary" type="submit" disabled={loading || formData.verificationCode.length !== 6}>
                      {loading ? "Procesando..." : "Verificar código"}
                    </Button>
                  </div>
                </>
              )}

              {!emailSent && (
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Procesando..." : "Enviar código"}
                </Button>
              )}
            </Form>
          }
          {
            step === 2 &&
            <Form onSubmit={verifyDni}>
              <Form.Group className="mb-3">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese su DNI"
                  className={validationErrors.dni ? "is-invalid" : ""}
                />
                {validationErrors.dni && <div className="invalid-feedback">{validationErrors.dni}</div>}
                <Form.Text className="text-muted">Vamos a verificar su numero de documento.</Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Verificando..." : "Verificar DNI"}
              </Button>
            </Form>
          }
          {
            step === 3 && <Form onSubmit={submitForm}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Ingrese su nombre"
                      className={validationErrors.firstName ? "is-invalid" : ""}
                    />
                    {validationErrors.firstName && <div className="invalid-feedback">{validationErrors.firstName}</div>}
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Ingrese su apellido"
                      className={validationErrors.lastName ? "is-invalid" : ""}
                    />
                    {validationErrors.lastName && <div className="invalid-feedback">{validationErrors.lastName}</div>}
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Género</Form.Label>
                <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Seleccione su género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={validationErrors.birthDate ? "is-invalid" : ""} required />
                  {validationErrors.birthDate && <div className="invalid-feedback">{validationErrors.birthDate}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese su número de teléfono"
                  className={validationErrors.phone ? "is-invalid" : ""}
                />
                {validationErrors.phone && <div className="invalid-feedback">{validationErrors.phone}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese su dirección completa"
                  className={validationErrors.address ? "is-invalid" : ""}
                />
                {validationErrors.address && <div className="invalid-feedback">{validationErrors.address}</div>}
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Completar registro"}
              </Button>
            </Form>
          }
        </Card.Body>
      </Card>
    </div>
  )
}