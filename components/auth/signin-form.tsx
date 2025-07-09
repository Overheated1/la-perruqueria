"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { Locale } from "@/i18n/config"

interface SignInFormProps {
  lang: Locale
  dictionary: {
    title: string
    description: string
    emailPlaceholder: string
    password: string
    forgotPassword: string
    submit: string
    loading: string
    orContinueWith: string
    google: string
    facebook: string
    termsNotice: string
    terms: string
    errorTitle: string
    errorDescription: string
    oauthErrorDescription: string
  }
}

export function SignInForm({ lang, dictionary }: SignInFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    toast({
      title: dictionary.errorTitle,
      description: dictionary.errorDescription,
      variant: "destructive",
    })

    setIsLoading(false)
  }

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, {
        callbackUrl: `/${lang}/profile`,
      })
    } catch (error) {
      console.error("OAuth sign in error:", error)
      toast({
        title: dictionary.errorTitle,
        description: dictionary.oauthErrorDescription,
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{dictionary.title}</CardTitle>
        <CardDescription className="text-center">{dictionary.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleOAuthSignIn("google")} disabled={isLoading} className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">{/* Google icon path */}</svg>
            {dictionary.google}
          </Button>
          <Button variant="outline" onClick={() => handleOAuthSignIn("facebook")} disabled={isLoading} className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">{/* Facebook icon path */}</svg>
            {dictionary.facebook}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {dictionary.orContinueWith}
            </span>
          </div>
        </div>

        <form onSubmit={handleEmailSignIn}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={dictionary.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{dictionary.password}</Label>
                <Button variant="link" className="h-auto p-0 text-xs">
                  {dictionary.forgotPassword}
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">{/* Spinner */}</svg>
                  {dictionary.loading}
                </span>
              ) : (
                <span>{dictionary.submit}</span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="mt-2 text-xs text-center text-muted-foreground">
          {dictionary.termsNotice}
          <Button variant="link" className="h-auto p-0 text-xs">
            {dictionary.terms}
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}
