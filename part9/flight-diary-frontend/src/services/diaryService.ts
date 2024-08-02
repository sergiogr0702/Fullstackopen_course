import axios from "axios";
import parser from "../utils";
import { ValidationError } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return parser.toDiaryEntryList(response.data);
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error.status);
      console.error(error.response);
    } else {
      console.error(error);
    }
    throw error;
  }
};

export const create = async (object: unknown) => {
  try {
    const response = await axios.post(baseUrl, object);
    return parser.toDiaryEntry(response.data);
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error.status);
      console.error(error.response);
    } else {
      console.error(error);
    }
    throw error;
  }
};
