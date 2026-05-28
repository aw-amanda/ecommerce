"use client"

import { useState, useCallback } from "react"

interface FormData {
  name: string
  email: string
  message: string
  phone?: string
}

const initialData: FormData = { name: "", email: "", message: "", phone: "" }

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = useCallback((data: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {}
    if (!data.name.trim()) errors.name = "Name required"
    if (!data.email.trim()) errors.email = "Email required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email"
    if (!data.message.trim()) errors.message = "Message required"
    else if (data.message.length < 10) errors.message = "Minimum 10 characters"
    return errors
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    // Mock API call - replace with real endpoint later
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Form submitted:", formData)
      
      setStatus({ type: "success", message: "Thanks! We'll respond within 24 hours." })
      setFormData(initialData)
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again or call us." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (hasError: boolean) => `
    w-full px-4 py-2 rounded-lg border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent
    ${hasError 
      ? "border-red-500 bg-red-500/10" 
      : "border-gray-600 bg-white/10 hover:bg-white/20"
    }
  `

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/70 backdrop-blur-md rounded-2xl p-6">
      {status && (
        <div className={`mb-4 p-3 rounded-lg text-center text-sm ${
          status.type === "success" 
            ? "bg-emerald-500/20 text-emerald-300" 
            : "bg-red-500/20 text-red-300"
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-white text-sm mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={inputClass(!!errors.name)}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-white text-sm mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={inputClass(!!errors.email)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-white text-sm mb-1">Phone (optional)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className={inputClass(false)}
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-1">Message *</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className={inputClass(!!errors.message)}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-2.5 rounded-lg text-white font-semibold transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          
          <button
            type="button"
            onClick={() => setFormData(initialData)}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gray-600/50 hover:bg-gray-600 rounded-lg text-white transition-all disabled:opacity-50"
          >
            Clear
          </button>
        </div>
        
        <p className="text-gray-400 text-xs text-center">
          * Required fields. We respond within 24 hours.
        </p>
      </form>
    </div>
  )
}