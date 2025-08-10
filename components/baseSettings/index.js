'use client'
import { useEffect } from 'react'

export default function BaseSettings({ baseSettings }) {
  useEffect(() => {
    if (!baseSettings) return
    for (const [key, val] of Object.entries(baseSettings)) {
      if (val == null) continue
      const kebab = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      document.documentElement.style.setProperty(`--${kebab}`, String(val))
    }
  }, [baseSettings])
  return null
}
