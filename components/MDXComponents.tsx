/* eslint-disable react/display-name */
import React, { useMemo } from 'react'
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import ImageLightbox from './ImageLightbox'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import Collapsible from './Collapsible'

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image: ImageLightbox, // Use ImageLightbox for all images in MDX (click to view larger)
  img: ImageLightbox, // Also handle regular img tags
  //@ts-ignore
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  //@ts-ignore
  Collapsible,
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
