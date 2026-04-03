'use client'
import React from 'react'
import { useField } from '@payloadcms/ui'
import type { JSONFieldClientProps } from 'payload'

const ColorPaletteField: React.FC<JSONFieldClientProps> = ({ field: fieldConfig }) => {
  const { value } = useField<Record<string, { l: number; c: number; h: number } | null>>({ path: fieldConfig.name })


  if (!value || Object.keys(value).length === 0) {
    return (
      <div style={{ marginBottom: 20 }}>
        <label className="field-label">Color Palette</label>
        <p style={{ color: 'var(--theme-elevation-500)', fontSize: 13 }}>
          No colors extracted yet. Colors are generated on upload.
        </p>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <label className="field-label">Color Palette</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {Object.entries(value).map(([name, color]) => {
          if (!color) return null
          const cssColor = `oklch(${color.l} ${color.c} ${color.h})`
          return (
            <div
              key={name}
              title={name}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: cssColor,
                border: '1px solid var(--theme-elevation-150)',
                cursor: 'default',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ColorPaletteField
