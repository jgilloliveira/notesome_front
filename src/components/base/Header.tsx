import { HeaderParams } from "../../types";
import { Button } from "./Button";

export function Header(props: HeaderParams) {
  return (
    <header {...props} className={`row justify-between bg-primary ${props.className}`}>
      <Button>Toggle sidebar</Button>
      <Button>User</Button>
    </header>
  )
}