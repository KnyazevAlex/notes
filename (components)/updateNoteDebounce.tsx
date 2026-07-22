'use client'

import NotesInterface from '@/(components)/notesInterface'
import updateNote from '@/(server-components)/updateNote'
import { useRef, useState, useTransition } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const UpdateNote = ({ title, subtitle, body, id }: NotesInterface) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)

  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveChange = (
    ref: React.RefObject<HTMLElement | null>,
    originalValue: string | undefined,
    key: 'title' | 'subtitle' | 'body'
  ) => {
    const currentVal = ref.current?.innerText.trim() ?? ''

    if (currentVal === (originalValue ?? '')) return

    setSaved(false)
    setError(null)

    startTransition(async () => {
      try {
        const result = await updateNote(id, key, currentVal)

        if (!result.success) {
          setError(result.error ?? 'Failed to save.')
          return
        }

        setSaved(true)
      } catch (err) {
        console.error(err)
        setError('Unexpected server error.')
      }
    })
  }

  const debouncedSave = useDebouncedCallback(
    (
      ref: React.RefObject<HTMLElement | null>,
      value: string | undefined,
      key: 'title' | 'subtitle' | 'body'
    ) => {
      saveChange(ref, value, key)
    },
    1000
  )

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#133a6d] p-4">
      <div className="flex flex-col w-full max-w-xl h-100 bg-[#164179] rounded-2xl shadow-xl border border-white/10 p-6 overflow-hidden">

        {isPending && (
          <div className="text-yellow-300 font-semibold">
            Saving...
          </div>
        )}

        {!isPending && error && (
          <div className="text-red-400 font-semibold">
            Failed to save: {error}
          </div>
        )}

        {!isPending && saved && !error && (
          <div className="text-green-400 font-semibold">
            Saved ✓
          </div>
        )}

        <div
          className="mb-3"
          onBlur={() => saveChange(titleRef, title, 'title')}
          onInput={() => debouncedSave(titleRef, title, 'title')}
        >
          <h1
            ref={titleRef}
            contentEditable
            suppressContentEditableWarning
            className="text-xl font-bold text-white tracking-wide focus:outline-none"
          >
            {title}
          </h1>
        </div>

        <div
          className="mb-4"
          onBlur={() => saveChange(subtitleRef, subtitle, 'subtitle')}
          onInput={() => debouncedSave(subtitleRef, subtitle, 'subtitle')}
        >
          <h2
            ref={subtitleRef}
            contentEditable
            suppressContentEditableWarning
            className="text-sm font-semibold text-white/70 focus:outline-none"
          >
            {subtitle}
          </h2>
        </div>

        <div
          className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
          onBlur={() => saveChange(bodyRef, body, 'body')}
          onInput={() => debouncedSave(bodyRef, body, 'body')}
        >
          <p
            ref={bodyRef}
            contentEditable
            suppressContentEditableWarning
            className="text-base text-white/90 whitespace-pre-wrap break-words leading-relaxed focus:outline-none"
          >
            {body}
          </p>
        </div>

      </div>
    </div>
  )
}

export default UpdateNote