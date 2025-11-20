import NextImage, { ImageProps } from 'next/image'

const Image = ({ loading = 'lazy', ...rest }: ImageProps) => (
  <NextImage loading={loading} {...rest} />
)

export default Image
