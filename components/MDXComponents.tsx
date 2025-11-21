'use client'

/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import * as _jsx_runtime from 'react/jsx-runtime'
import Image from './Image'
import ImageLightbox from './ImageLightbox'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import Collapsible from './Collapsible'

// Remove wrapper from MDXComponents - layouts will be handled outside
export const MDXComponents = {
  Image: ImageLightbox, // Use ImageLightbox for all images in MDX (click to view larger)
  img: ImageLightbox, // Also handle regular img tags
  //@ts-ignore
  TOCInline,
  a: CustomLink,
  pre: Pre,
  //@ts-ignore
  Collapsible,
}

interface Props {
  mdxSource: string
  [key: string]: unknown
}

export const MDXContent = ({ mdxSource, ...rest }: Props) => {
  const Component = useMemo(() => {
    // Provide React as a global for the MDX bundle
    return getMDXComponent(mdxSource, {
      React,
      _jsx_runtime,
    })
  }, [mdxSource])

  return <Component components={MDXComponents} {...rest} />
}
