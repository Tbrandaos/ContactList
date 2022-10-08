import { Contact } from "./Contact"

export interface Person {
    id: number
    name: string
    address: string
    birthDate: string
    contacts: Contact[]
  }