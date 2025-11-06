"use client"

import React, { useState } from "react"

type ContactFormData = {
  name: string
  email: string
  message: string
}

type ServerMessage = {
  type: "success" | "error"
  text: string
} | null

const API_URL = "https://i55zopetdd.execute-api.us-east-1.amazonaws.com/prod/contact"

export default function ContactFormStandalone(): JSX.Element {
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverMessage, setServerMessage] = useState<ServerMessage>(null)

  const validate = (): boolean => {
    const next: Partial<Record<keyof ContactFormData, string>> = {}
    if (!form.name.trim()) next.name = "Name is required"
    if (!form.email.trim()) next.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email"
    if (!form.message.trim()) next.message = "Message is required"
    else if (form.message.trim().length < 10) next.message = "Message must be at least 10 characters"

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    setServerMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('handleSubmit invoked', { form })
    setServerMessage(null)
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      let data: any = null
      try {
        data = text ? JSON.parse(text) : null
      } catch (err) {
        // non-json response
      }

      if (!res.ok) {
        // Server returned an error code
        const msg = data?.message || `Server responded with status ${res.status}`
        setServerMessage({ type: "error", text: msg })
        return
      }

      setServerMessage({ type: "success", text: data?.message || "Message sent successfully" })
      // Optional: reset form on success
      setForm({ name: "", email: "", message: "" })
      setErrors({})
    } catch (err: unknown) {
      // Network or CORS error
      const message = err instanceof TypeError && String(err).includes("Failed to fetch")
        ? "Network error or CORS blocked the request. Check the API URL, CORS settings, or use a server-side proxy."
        : String(err)
      setServerMessage({ type: "error", text: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fallback click handler in case form submit isn't firing (helps debug overlays or event capture issues)
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('button click received')
    // Call the same submit logic
    await handleSubmit(e as unknown as React.FormEvent)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      {serverMessage && (
        <div className={`p-3 rounded-md text-sm ${serverMessage.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {serverMessage.text}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? "border-red-300" : "border-gray-200"}`}
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? "border-red-300" : "border-gray-200"}`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={6}
          className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.message ? "border-red-300" : "border-gray-200"}`}
          placeholder="Tell me about your project or inquiry..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleButtonClick}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-95 disabled:opacity-60`}
        >
          {isSubmitting ? (
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : null}
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  )
}
