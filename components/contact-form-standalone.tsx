"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ContactFormData = {
  name: string
  email: string
  message: string
}

type ServerMessage = {
  type: "success" | "error"
  text: string
} | null

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "https://i55zopetdd.execute-api.us-east-1.amazonaws.com/prod/contact"

export default function ContactFormStandalone() {
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
        const msg = data?.message || `Server responded with status ${res.status}`
        setServerMessage({ type: "error", text: msg })
        return
      }

      setServerMessage({ type: "success", text: data?.message || "Message sent successfully" })
      setForm({ name: "", email: "", message: "" })
      setErrors({})
    } catch (err: unknown) {
      const message = err instanceof TypeError && String(err).includes("Failed to fetch")
        ? "Network error or CORS blocked the request. Check the API URL, CORS settings, or use a server-side proxy."
        : String(err)
      setServerMessage({ type: "error", text: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await handleSubmit(e as unknown as React.FormEvent)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        {serverMessage && (
          <Alert variant={serverMessage.type === "success" ? "default" : "destructive"}>
            <AlertDescription className={serverMessage.type === "success" ? "text-green-500" : ""}>
              {serverMessage.text}
            </AlertDescription>
          </Alert>
        )}

      <div className="space-y-4">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={`${errors.name ? "border-destructive" : ""} transition-all duration-150`}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-4">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className={`${errors.email ? "border-destructive" : ""} transition-all duration-150`}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-4">
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project or inquiry..."
          rows={6}
          className={`${errors.message ? "border-destructive" : ""} transition-all duration-150`}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        onClick={handleButtonClick}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
