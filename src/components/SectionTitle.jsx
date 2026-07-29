function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      <span className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-300/90">{eyebrow}</span>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-sm leading-7 text-stone-400 sm:text-base">{description}</p>}
    </div>
  )
}

export default SectionTitle
