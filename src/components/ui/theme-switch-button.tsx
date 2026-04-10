'use client'
import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ThemeSwitchProps {
  className?: string
}

/**
 * 3-way theme toggle: system → light → dark → system.
 * "system" follows the desktop/OS preference (prefers-color-scheme).
 */
export function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = React.useCallback(() => {
    // system → light → dark → system
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }, [theme, setTheme])

  if (!mounted) return <div className="h-8 w-8" />

  const isSystem = theme === 'system'
  const isDark = isSystem ? resolvedTheme === 'dark' : theme === 'dark'

  const label = isSystem
    ? 'Using system theme, click for light mode'
    : theme === 'light'
      ? 'Light mode, click for dark mode'
      : 'Dark mode, click for system theme'

  return (
    <button
      onClick={cycleTheme}
      aria-label={label}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full hover:opacity-80 transition-opacity overflow-hidden ${className}`}
    >
      {/* System icon */}
      <Monitor
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isSystem
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
      {/* Sun icon */}
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          !isSystem && !isDark
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
      {/* Moon icon */}
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          !isSystem && isDark
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
    </button>
  )
}
