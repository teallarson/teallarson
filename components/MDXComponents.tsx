'use client'

/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import ImageLightbox from './ImageLightbox'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import Collapsible from './Collapsible'

// Remove wrapper from MDXComponents - layouts will be handled outside
export const MDXComponents: ComponentMap = {
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
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout components={MDXComponents} {...rest} />
}
