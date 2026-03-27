import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 transition-all hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 hotdog:border-4 hotdog:border-black hotdog:bg-[#FFFF00] hotdog:p-3 hotdog:text-black hotdog:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:text-3xl sm:leading-9 md:text-4xl md:leading-10">
      {children}
    </h1>
  )
}
