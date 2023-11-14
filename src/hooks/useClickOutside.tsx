import React, { useEffect, useRef } from 'react'

interface UseClickOutsideProp {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const useClickOutside = ({setShow}: UseClickOutsideProp) => {
    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          setShow(false)
        }
      }
    
      document.addEventListener("mousedown", handleClickOutside)
    
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])
    
  return [modalRef]
}

export default useClickOutside