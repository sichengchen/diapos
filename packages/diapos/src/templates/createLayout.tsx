import type { CSSProperties, ReactNode } from 'react'

export interface LayoutRenderProps<P> {
  props: P
}

/**
 * Factory for creating custom content components that work inside <Slide>.
 *
 * Usage:
 *   const MyLayout = createLayout<{ heading: string; children: ReactNode }>(
 *     ({ props }) => (
 *       <div>
 *         <h2>{props.heading}</h2>
 *         {props.children}
 *       </div>
 *     ),
 *     { width: '100%', flex: 1 }
 *   )
 */
export function createLayout<P extends Record<string, unknown>>(
  render: (ctx: LayoutRenderProps<P>) => ReactNode,
  defaultStyles?: CSSProperties,
) {
  function LayoutComponent(props: P & { style?: CSSProperties }) {
    const { style, ...rest } = props
    return (
      <div style={{ ...defaultStyles, ...style }}>
        {render({ props: rest as unknown as P })}
      </div>
    )
  }

  return LayoutComponent
}
