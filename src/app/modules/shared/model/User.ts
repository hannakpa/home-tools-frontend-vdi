import {Selectable} from "./Selectable";

export interface User extends Selectable {
  username: string
  email: string
  firstName: string
}
