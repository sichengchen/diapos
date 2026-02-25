import { defaultTheme } from './defaultTheme'
import type { DeepPartial, Theme } from './types'

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base }
  for (const key in override) {
    const overrideVal = override[key]
    const baseVal = base[key]
    if (
      overrideVal !== undefined &&
      typeof overrideVal === 'object' &&
      overrideVal !== null &&
      !Array.isArray(overrideVal) &&
      typeof baseVal === 'object' &&
      baseVal !== null
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>,
      )
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal
    }
  }
  return result
}

export function createTheme(overrides: DeepPartial<Theme>): Theme {
  return deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>,
  ) as unknown as Theme
}
