import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 transition-all hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      {children}
    </h1>
  )
}
