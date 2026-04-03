'use client'
import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const ColorPaletteCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const value = cellData as Record<string, { l: number; c: number; h: number } | null> | undefined

  if (!value || Object.keys(value).length === 0) {
    return <span>—</span>
  }

  const colors = Object.values(value).filter(Boolean) as { l: number; c: number; h: number }[]

  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: `oklch(${color.l} ${color.c} ${color.h})`,
            border: '1px solid var(--theme-elevation-150)',
          }}
        />
      ))}
    </div>
  )
}

export default ColorPaletteCell
