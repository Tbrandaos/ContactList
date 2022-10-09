import axios, { AxiosResponse } from "axios";
import { Contact } from "../models/Contact";
import { Person } from "../models/Person";


const getPersonListData = (): Promise<AxiosResponse<Person[]>> => (
    axios.get<Person[]>('https://localhost:7145/api/Person')
);

const getPersonData = (id: number): Promise<AxiosResponse<Person>> => (
    axios.get<Person>(`https://localhost:7145/api/Person/${id}`)
);

const deletePersonData = (id: number): Promise<AxiosResponse<number>> => (
    axios.delete<number>(`https://localhost:7145/api/Person/${id}`)
);

const putPersonData = (person: Person): Promise<AxiosResponse<Person>> => (
    axios.put<Person>(`https://localhost:7145/api/Person/${person.id}`, person)
);

const postPersonData = (person: Person): Promise<AxiosResponse<Person>> => (
    axios.post<Person>('https://localhost:7145/api/Person/', person)
);

const postContactData = (contact: Contact): Promise<AxiosResponse<Contact>> => (
    axios.post<Contact>(`https://localhost:7145/api/Contact/${contact.personId}`, contact)
);

const putContactData = (contact: Contact): Promise<AxiosResponse<Contact>> => (
    axios.put<Contact>(`https://localhost:7145/api/Contact/${contact.personId}`, contact)
);

export { 
    getPersonListData, 
    getPersonData, 
    deletePersonData,
    putPersonData,
    putContactData,
    postContactData,
    postPersonData
 };