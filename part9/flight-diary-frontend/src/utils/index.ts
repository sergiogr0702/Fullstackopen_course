import { NewDiaryEntry, DiaryEntryBase } from "../types";
import {
  parseComment,
  parseDate,
  parseId,
  parseVisibility,
  parseWeather,
} from "./parsers";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

const toDiaryEntry = (object: unknown): DiaryEntryBase => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "id" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const entry: DiaryEntryBase = {
      id: parseId(object.id),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
    };

    return entry;
  }

  throw new Error("Incorrect data: a field missing");
};

const toDiaryEntryList = (listObject: unknown): DiaryEntryBase[] => {
  if (!Array.isArray(listObject)) {
    throw new Error("Incorrect data: not an array");
  }

  return listObject.map((object) => toDiaryEntry(object));
};

export default {
  toDiaryEntryList,
  toNewDiaryEntry,
  toDiaryEntry,
};
