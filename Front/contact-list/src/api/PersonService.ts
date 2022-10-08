import axios, { AxiosResponse } from "axios";
import { Person } from "../models/Person";


const getPersonData = (): Promise<AxiosResponse<Person[]>> => (
    axios.get<Person[]>('https://localhost:7145/api/Person')
);

export { getPersonData };