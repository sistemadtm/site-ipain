'use client'

interface DaysSelectorProps {
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

const DAYS = [
  { key: 'monday', label: 'Segunda' },
  { key: 'tuesday', label: 'Terça' },
  { key: 'wednesday', label: 'Quarta' },
  { key: 'thursday', label: 'Quinta' },
  { key: 'friday', label: 'Sexta' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' }
]

export function DaysSelector({ value, onChange, className = '' }: DaysSelectorProps) {
  const handleToggle = (day: string) => {
    const newValue = value.includes(day)
      ? value.filter(d => d !== day)
      : [...value, day]
    onChange(newValue)
  }

  return (
    <div className={`grid grid-cols-7 gap-2 ${className}`}>
      {DAYS.map((day) => (
        <button
          key={day.key}
          type="button"
          onClick={() => handleToggle(day.key)}
          className={`px-3 py-2 text-xs rounded-md border transition-colors ${
            value.includes(day.key)
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background border-input hover:bg-accent'
          }`}
        >
          {day.label}
        </button>
      ))}
    </div>
  )
}