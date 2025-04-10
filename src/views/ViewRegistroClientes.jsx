import { useRef, useState } from "react"
import { Button, Form, Card, Alert } from "react-bootstrap"
import React from "react"
import { POST } from "../services/Fetch"
import { useEmpresa } from "../Contexts/EmpresaContext";

export default function MultiStepForm() {
  const { empresa, idEmpresa, estiloBorde } = useEmpresa();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [dniVerified, setDniVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);
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
  const codeInputRefs = useRef([]);

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    dni: "",
    phone: "",
  })


  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  function validateDNI(dni) {
    const regex = /^[1-9][0-9]{6,8}$/
    return regex.test(dni)
  }

  function validatePhone(phone) {
    const regex = /^\d{9,15}$/
    return regex.test(phone)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (name === "email") {
      if (value && !validateEmail(value)) {
        setValidationErrors({
          ...validationErrors,
          email: "Ingrese un correo electrónico válido",
        })
      } else {
        setValidationErrors({
          ...validationErrors,
          email: "",
        })
      }
    } else if (name === "dni") {
      if (value && !validateDNI(value)) {
        setValidationErrors({
          ...validationErrors,
          dni: "Número de DNI inválido",
        })
      } else {
        setValidationErrors({
          ...validationErrors,
          dni: "",
        })
      }
    } else if (name === "phone") {
      if (value && !validatePhone(value)) {
        setValidationErrors({
          ...validationErrors,
          phone: "Ingrese un número de teléfono válido (9-15 dígitos)",
        })
      } else {
        setValidationErrors({
          ...validationErrors,
          phone: "",
        })
      }
    }
  }

  const handleVerificationCodeChange = (e, index) => {
    const value = e.target.value

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
    setCanResend(false)
    setResendTimer(60)
    setTimerActive(true)

    const timer = setInterval(() => {
      setResendTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setCanResend(true)
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

    if (!validateEmail(formData.email)) {
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
        setError("Error al enviar el código de verificación");
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
        if (navigator.onLine) {
          setError("Ha ocurrido un problema. Si el problema persiste contactese con la sucursal mas cercana");
        }else{
          setError("Verifique su conexion a internet");
        }
      }
    } catch (err) {
      setError("Error al verificar el código")
    } finally {
      setLoading(false)
    }
  }

  // Verify DNI
  const verifyDni = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (formData.dni < 1000000 || formData.dni > 999999999) {
      return;
    }
    setError("");
    setLoading(true);

    try {
      let rsp = await POST("registroclientes/verificarcodigo", { codigo: formData.dni });
      if (rsp) {
        switch (rsp.status) {
          case 200:
            setDniVerified(true)
            setStep(3);
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
        if (navigator.onLine) {
          setError("Ha ocurrido un problema. Si el problema persiste contactese con la sucursal mas cercana");
        }else{
          setError("Verifique su conexion a internet");
        }
      }
    } catch (err) {
      setError("Error al verificar el DNI.");
    } finally {
      setLoading(false)
    }
  }

  // Submit final form
  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call to submit form
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would submit the form data to your API
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSuccess("¡Registro completado con éxito!")
      // Reset form or redirect user
    } catch (err) {
      setError("Error al enviar el formulario.")
    } finally {
      setLoading(false)
    }
  }

  // Modify the renderStep1 function to include the resend button
  const renderStep1 = () => (
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
  )

  // Render step 2: DNI verification
  const renderStep2 = () => (
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
  )

  // Render step 3: Personal information
  const renderStep3 = () => (
    <Form onSubmit={submitForm}>
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
            />
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
            />
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
        <Form.Control type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
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
          as="textarea"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Ingrese su dirección completa"
          rows={3}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Completar registro"}
      </Button>
    </Form>
  )

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

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </Card.Body>
      </Card>

      <style jsx>{`
        .progress-indicator {
          margin-bottom: 2rem;
        }
        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 33%;
        }
        .step-number {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .step-indicator.active .step-number {
          background-color: #007bff;
          color: white;
        }
        .step-title {
          font-size: 0.875rem;
        }
        .verification-code-container {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 15px;
        }

        .verification-code-input {
          width: 45px;
          height: 45px;
          text-align: center;
          font-size: 1.2rem;
          border: 2px solid #ced4da;
          border-radius: 8px;
          background-color: white;
          transition: all 0.2s;
        }

        .verification-code-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          outline: none;
        }

        .is-invalid {
          border-color: #dc3545;
          padding-right: calc(1.5em + 0.75rem);
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath strokeLinejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right calc(0.375em + 0.1875rem) center;
          background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }

        .invalid-feedback {
          display: block;
          width: 100%;
          margin-top: 0.25rem;
          font-size: 0.875em;
          color: #dc3545;
        }

        .resend-button {
          transition: all 0.3s;
        }

        .resend-button:disabled {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}
