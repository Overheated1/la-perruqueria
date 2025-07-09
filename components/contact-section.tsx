"use client"

import Link from "next/link"
import type React from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ContactSectionProps {
  dictionary: {
    title: string
    subtitle: string
    address: { label: string; value: string }
    phone: { label: string; value: string }
    email: { label: string; value: string }
    hours: { label: string; value: string }
    social: {
      follow: string
      facebook: string
      instagram: string
    }
    contactButton: string
    mapTitle: string
    form?: {
      title: string
      name: string
      email: string
      message: string
      submit: string
      success: string
      description: string
    }
  }
  showForm?: boolean
}

export function ContactSection({ dictionary, showForm = false }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: dictionary.form?.success,
      description: dictionary.form?.description,
    })

    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="space-y-6">
              <InfoBlock icon={<MapPin />} label={dictionary.address.label} value={dictionary.address.value} />
              <InfoBlock
                icon={<Phone />}
                label={dictionary.phone.label}
                value={
                  <Link href={`tel:${dictionary.phone.value.replace(/\D/g, "")}`} className="hover:text-primary">
                    {dictionary.phone.value}
                  </Link>
                }
              />
              <InfoBlock
                icon={<Mail />}
                label={dictionary.email.label}
                value={
                  <Link href={`mailto:${dictionary.email.value}`} className="hover:text-primary">
                    {dictionary.email.value}
                  </Link>
                }
              />
              <InfoBlock
                icon={<Clock />}
                label={dictionary.hours.label}
                value={<span className="whitespace-pre-line">{dictionary.hours.value}</span>}
              />

              <div className="pt-4">
                <h3 className="font-medium text-lg mb-3">{dictionary.social.follow}</h3>
                <div className="flex gap-4">
                  <SocialIcon
                    href="https://facebook.com/laperruqueria"
                    label={dictionary.social.facebook}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Facebook className="h-5 w-5" />
                  </SocialIcon>
                  <SocialIcon
                    href="https://instagram.com/laperruqueria"
                    label={dictionary.social.instagram}
                    className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90"
                  >
                    <Instagram className="h-5 w-5" />
                  </SocialIcon>
                  <SocialIcon
                    href="https://wa.me/17867190231"
                    label="WhatsApp"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </SocialIcon>
                </div>
              </div>
            </div>
          </motion.div>

          {showForm && dictionary.form ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4">{dictionary.form.title}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput label={dictionary.form.name} name="name" value={formData.name} onChange={handleChange} />
                <FormInput
                  label={dictionary.form.email}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormTextarea
                  label={dictionary.form.message}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "..." : dictionary.form.submit}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-[400px] md:h-full min-h-[400px] rounded-lg overflow-hidden shadow-md"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5378534677546!2d-80.19140492394734!3d25.78192770989611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6823bb65e03%3A0x3e7d4b4a9b5c7ab1!2sMiami%2C%20FL%2C%20USA!5e0!3m2!1sen!2s!4v1682532078420!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={dictionary.mapTitle}
              />
            </motion.div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="https://wa.me/17867190231" target="_blank" className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {dictionary.contactButton}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// 🔹 Subcomponentes para claridad
function InfoBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-6 w-6 text-primary flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h3 className="font-medium text-lg mb-1">{label}</h3>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function SocialIcon({
  href,
  label,
  className,
  children,
}: {
  href: string
  label: string
  className: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} text-white p-3 rounded-full transition-colors`}
      aria-label={label}
    >
      {children}
    </Link>
  )
}

function FormInput({
  label,
  name,
  value,
  type = "text",
  onChange,
}: {
  label: string
  name: string
  value: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <Input id={name} name={name} type={type} value={value} onChange={onChange} required />
    </div>
  )
}

function FormTextarea({
  label,
  name,
  value,
  onChange,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <Textarea id={name} name={name} rows={5} value={value} onChange={onChange} required />
    </div>
  )
}
