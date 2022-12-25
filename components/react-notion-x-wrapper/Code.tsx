import * as React from 'react'
import { CodeBlock } from 'notion-types'
import { Code as Base} from 'react-notion-x/build/third-party/code'

export const Code: React.FC<{
  block: CodeBlock
  defaultLanguage?: string
  className?: string
}> = (props) => {
  props.block.properties.title = "HelloWorld"
  return <Base {...props}/>
}