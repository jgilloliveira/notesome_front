export type DivParams = ComponentParams<HTMLDivElement>
export type HeaderParams = ComponentParams<HTMLElement>
export type ComponentParams<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>