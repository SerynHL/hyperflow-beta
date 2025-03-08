"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("divide-y divide-border", className)} {...props} />
)

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: (open: boolean) => void }
>(({ className, children, open, onOpenChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined && open !== isOpen) {
      setIsOpen(open)
    }
  }, [open, isOpen])

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value)
    onOpenChange?.(value)
  }

  return (
    <div ref={ref} data-state={isOpen ? "open" : "closed"} className={cn("border-b", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            onOpenChange: handleOpenChange,
          })
        }
        return child
      })}
    </div>
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isOpen?: boolean; onOpenChange?: (open: boolean) => void }
>(({ className, children, isOpen, onOpenChange, ...props }, ref) => (
  <button
    ref={ref}
    onClick={() => onOpenChange?.(!isOpen)}
    className={cn(
      "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown
      className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")}
    />
  </button>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean }>(
  ({ className, children, isOpen, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up h-0",
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  ),
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

