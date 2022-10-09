import axios, { AxiosResponse } from "axios";
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

export { 
    getPersonListData, 
    getPersonData, 
    deletePersonData,
    putPersonData
 };