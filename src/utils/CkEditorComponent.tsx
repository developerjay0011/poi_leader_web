import React, { FC } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const CKEditorComponent: FC<{ onChange: (val: string) => void }> = ({
  onChange,
}) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={(event, editor) => {
        const content = editor.getData()
        onChange(content)
      }}
    />
  )
}

export default CKEditorComponent
