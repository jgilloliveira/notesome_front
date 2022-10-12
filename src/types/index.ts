export type DivParams = ComponentParams<HTMLDivElement>
export type InputParams = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type ButtonParams = ComponentParams<HTMLButtonElement>
export type HeaderParams = ComponentParams<HTMLElement>
export type ComponentParams<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>