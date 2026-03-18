"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  children: React.ReactNode
  pendingText?: string
}

export function SubmitButton({ children, pendingText, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className={className} {...props}>
      {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {pending && pendingText ? pendingText : children}
    </Button>
  )
}
