import axios, { AxiosResponse } from "axios";
import { Person } from "../models/Person";


const getPersonListData = (): Promise<AxiosResponse<Person[]>> => (
    axios.get<Person[]>('https://localhost:7145/api/Person')
);

const getPersonData = (id: number): Promise<AxiosResponse<Person>> => (
    axios.get<Person>(`https://localhost:7145/api/Person/${id}`)
);

export { getPersonListData, getPersonData };