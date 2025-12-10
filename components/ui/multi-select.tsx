'use client'

import { useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import { Button } from './button'

interface MultiSelectProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Selecione...', 
  className = '' 
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option]
    onChange(newValue)
  }

  const handleRemove = (option: string) => {
    onChange(value.filter(v => v !== option))
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className="min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            value.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs"
              >
                {item}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove(item)
                  }}
                  className="hover:bg-primary/20 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center px-3 py-2 hover:bg-accent cursor-pointer"
              onClick={() => handleToggle(option)}
            >
              <div className="flex items-center space-x-2 flex-1">
                <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                  value.includes(option) ? 'bg-primary border-primary' : 'border-input'
                }`}>
                  {value.includes(option) && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className="text-sm">{option}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}