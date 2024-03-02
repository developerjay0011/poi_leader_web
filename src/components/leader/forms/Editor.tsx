


import JoditEditor from "jodit-react"
import { useRef } from "react"

function Editor(props:any) {
    const editor = useRef(null)

    return <JoditEditor
        ref={editor}
        value={props.value}
        config={{ readonly: false }}
        onBlur={(val) => props.onChange(val)}
    />
}

export default Editor