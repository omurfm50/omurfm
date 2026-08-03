import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function Modal({ isOpen, onClose, title, eyebrow, children }) {
  const titleId = useId()
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusableElements = [...dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)]
      if (focusableElements.length === 0) return
      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="max-h-[88vh] w-full max-w-4xl overflow-y-auto border border-white/10 bg-[#10080b] shadow-2xl shadow-black/70">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#150a0e]/95 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div>{eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">{eyebrow}</p>}<h2 id={titleId} className="mt-1 text-xl font-semibold text-white sm:text-2xl">{title}</h2></div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label={`${title} penceresini kapat`} className="grid size-10 shrink-0 place-items-center border border-white/10 text-stone-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"><X size={20} aria-hidden="true" /></button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </section>
    </div>
  )
}

export default Modal
