import { redirect } from "next/navigation"
import { i18n } from "@/i18n/config"

export default function RootNotFound() {
  // Redirect to the default locale's 404 page
  redirect(`/${i18n.defaultLocale}/not-found`)
}
