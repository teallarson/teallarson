'use client'

import { useState, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Pre = ({ children }: Props) => {
  const textInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }

  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="relative">
      

      <pre>{children}</pre>
    </div>
  )
}

export default Pre
