import type { Parent, Node, Literal } from 'unist'
import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'

type ImageNode = Parent & {
  url: string
  alt: string
  name: string
  attributes: (Literal & { name: string })[]
}

export default function remarkImgToJsx() {
  return (tree: Node) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node: Parent): node is Parent =>
        node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
      (node: Parent) => {
        const imageNode = node.children.find((n) => n.type === 'image') as ImageNode

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)

          // Convert original node to next/image
          ;(imageNode as any).type = 'mdxJsxFlowElement'
          ;(imageNode as any).name = 'Image'
          ;(imageNode as any).attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { 
              type: 'mdxJsxAttribute', 
              name: 'width', 
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: String(dimensions.width),
                data: { estree: { type: 'Literal', value: dimensions.width } }
              }
            },
            { 
              type: 'mdxJsxAttribute', 
              name: 'height', 
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: String(dimensions.height),
                data: { estree: { type: 'Literal', value: dimensions.height } }
              }
            },
          ]
          ;(imageNode as any).data = { _xdmExplicitJsx: true }

          // Change node type from p to div to avoid nesting error
          ;(node as any).type = 'mdxJsxFlowElement'
          ;(node as any).name = 'div'
          ;(node as any).attributes = []
          ;(node as any).data = { _xdmExplicitJsx: true }
          node.children = [imageNode as any]
        }
      }
    )
  }
}
