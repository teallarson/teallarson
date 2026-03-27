import type { Parent } from 'unist'
import { visit } from 'unist-util-visit'

export default function remarkCodeTitles() {
  return (tree: Parent & { lang?: string }) =>
    visit(tree, 'code', (node: Parent & { lang?: string }, index, parent: Parent) => {
      const nodeLang = node.lang || ''
      let language = ''
      let title = ''
      let meta = ''

      // Extract meta (line highlighting like {1-3}, showLineNumbers, etc.)
      // Meta can appear after the title or after the language
      const metaMatch = nodeLang.match(/\s*(\{[^}]+\}.*?)$/)
      const langWithoutMeta = metaMatch ? nodeLang.slice(0, metaMatch.index) : nodeLang
      if (metaMatch) {
        meta = metaMatch[1]
      }

      if (langWithoutMeta.includes(':')) {
        language = langWithoutMeta.slice(0, langWithoutMeta.search(':'))
        title = langWithoutMeta.slice(langWithoutMeta.search(':') + 1)
      }

      if (!title || index === undefined) {
        return
      }

      const className = 'remark-code-title'

      const titleNode: any = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: className }],
        children: [{ type: 'text', value: title }],
        data: { _xdmExplicitJsx: true },
      }

      parent.children.splice(index, 0, titleNode)
      // Reattach meta to language so rehype-prism-plus can process it
      node.lang = meta ? `${language} ${meta}` : language
    })
}
