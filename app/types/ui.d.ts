declare module "@/components/ui/button" {
  import { ButtonHTMLAttributes, forwardRef } from "react"
  
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
  }
  
  export const Button: forwardRef<HTMLButtonElement, ButtonProps>
}

declare module "@/components/ui/card" {
  import { HTMLAttributes } from "react"
  
  interface CardProps extends HTMLAttributes<HTMLDivElement> {}
  interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
  interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
  interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
  interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
  interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
  
  export const Card: React.FC<CardProps>
  export const CardHeader: React.FC<CardHeaderProps>
  export const CardTitle: React.FC<CardTitleProps>
  export const CardDescription: React.FC<CardDescriptionProps>
  export const CardContent: React.FC<CardContentProps>
  export const CardFooter: React.FC<CardFooterProps>
}

declare module "@/components/ui/select" {
  import { HTMLAttributes, forwardRef } from "react"
  
  interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
    defaultValue?: string
  }
  
  interface SelectTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string
  }
  
  interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
    placeholder?: string
  }
  
  interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {}
  
  interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string
  }
  
  export const Select: React.FC<SelectProps>
  export const SelectTrigger: React.FC<SelectTriggerProps>
  export const SelectValue: React.FC<SelectValueProps>
  export const SelectContent: React.FC<SelectContentProps>
  export const SelectItem: React.FC<SelectItemProps>
}

declare module "@/components/ui/tabs" {
  import { HTMLAttributes } from "react"
  
  interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    defaultValue?: string
    className?: string
  }
  
  interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}
  
  interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    value: string
  }
  
  interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    value: string
  }
  
  export const Tabs: React.FC<TabsProps>
  export const TabsList: React.FC<TabsListProps>
  export const TabsTrigger: React.FC<TabsTriggerProps>
  export const TabsContent: React.FC<TabsContentProps>
} 