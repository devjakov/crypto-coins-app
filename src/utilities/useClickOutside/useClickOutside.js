import { useRef, useEffect } from "react"

export const useClickOutside = (handleToggle, currentToggle) => {
    let domNode = useRef()
    useEffect(() => {
        const detectMouseLocation = (e) => {
            if (!domNode.current?.contains(e.target) && currentToggle) {
                handleToggle(!currentToggle)
            }
        }
        document.addEventListener("mousedown", detectMouseLocation)
        return () => {
            document.removeEventListener("mousedown", detectMouseLocation)
        }
    })
    return domNode
}