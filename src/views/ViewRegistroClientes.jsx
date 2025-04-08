import { useRef, useState } from "react"
import { Button, Form, Card, Alert } from "react-bootstrap"
import React from "react"
import { POST } from "../services/Fetch"

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Form data state
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

  // Email verification state
  const [emailSent, setEmailSent] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)

  // DNI verification state
  const [dniVerified, setDniVerified] = useState(false)

  const codeInputRefs = useRef([])

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    dni: "",
    phone: "",
  })

  const [canResend, setCanResend] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [timerActive, setTimerActive] = useState(false)

  function validateEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  function validateDNI(dni){
    const regex = /^\d{8}[A-Z]?$/
    return regex.test(dni)
  }

  function validatePhone(phone){
    const regex = /^\d{9,15}$/
    return regex.test(phone)
  }

  function handleChange(e){
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
          dni: "Ingrese un DNI válido (8 dígitos y posiblemente una letra)",
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

  const handleVerificationCodeKeyDown = (e, index) => {
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
      await new Promise((resolve) => setTimeout(resolve, 1500))

      codeInputRefs.current = codeInputRefs.current.slice(0, 6)

      setEmailSent(true)
      setSuccess("Código de verificación enviado. Por favor revise su correo.")

      startResendTimer()

      setTimeout(() => {
        if (codeInputRefs.current[0]) {
          codeInputRefs.current[0].focus()
        }
      }, 100)
    } catch (err) {
      setError("Error al enviar el código de verificación.")
    } finally {
      setLoading(false)
    }
  }

  async function resendVerificationCode(){
    setLoading(true)
    setError("")

    try {
      let rsp = await new POST("Authclientes/verificarcorreo", )
      setSuccess("Código de verificación reenviado. Por favor revise su correo.")

      setFormData({
        ...formData,
        verificationCode: "",
      })
      startResendTimer()
      setTimeout(() => {
        if (codeInputRefs.current[0]) {
          codeInputRefs.current[0].focus()
        }
      }, 100)
    } catch (err) {
      setError("Error al reenviar el código de verificación.")
    } finally {
      setLoading(false)
    }
  }

  
  const verifyEmailCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would verify the code with your API
      // const response = await fetch('/api/verify-code', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     code: formData.verificationCode
      //   })
      // });

      // For demo purposes, we'll consider any 6-digit code as valid
      if (formData.verificationCode.length === 6) {
        setEmailVerified(true)
        setStep(2)
        setSuccess("Correo verificado correctamente.")
      } else {
        setError("El código debe tener 6 dígitos.")
      }
    } catch (err) {
      setError("Error al verificar el código.")
    } finally {
      setLoading(false)
    }
  }

  // Verify DNI
  const verifyDni = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call to verify DNI
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would check if the DNI is already in use
      // const response = await fetch('/api/verify-dni', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ dni: formData.dni })
      // });

      // For demo purposes, we'll consider any DNI as valid
      setDniVerified(true)
      setStep(3)
      setSuccess("DNI verificado correctamente.")
    } catch (err) {
      setError("Error al verificar el DNI.")
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
              onClick={resendVerificationCode}
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
        <Form.Text className="text-muted">Verificaremos si su DNI ya está registrado en nuestro sistema.</Form.Text>
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
