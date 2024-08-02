import { Weather, Visibility } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" && !isNaN(number);
};

const parseId = (id: unknown): number => {
  if (!isNumber(id) || !Number.isInteger(id) || id < 1) {
    throw new Error("Incorrect or missing id");
  }

  return id;
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error("Incorrect or missing comment");
  }

  return comment;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect weather: " + weather);
  }
  return weather;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect visibility: " + visibility);
  }
  return visibility;
};

export { parseId, parseComment, parseDate, parseWeather, parseVisibility };
