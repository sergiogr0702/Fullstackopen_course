import { Gender } from "../types";

type Validator<T> = (value: unknown) => value is T;

const isString: Validator<string> = (value): value is string =>
  typeof value === "string" || value instanceof String;

const isNumber: Validator<number> = (value): value is number =>
  typeof value === "number" || value instanceof Number;

const isGender: Validator<Gender> = (value): value is Gender =>
  isString(value) &&
  Object.values(Gender)
    .map((v) => v.toString())
    .includes(value);

const isDate = (value: string): boolean => Boolean(Date.parse(value));

const parseStringField = (value: unknown, errorMessage: string): string => {
  if (!value || !isString(value)) {
    throw new Error(errorMessage);
  }
  return value;
};

const parseDateField = (value: unknown, errorMessage: string): string => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error(errorMessage);
  }
  return value;
};

const assertNever = (value: unknown): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export {
  parseStringField,
  parseDateField,
  isString,
  isNumber,
  isGender,
  isDate,
  assertNever,
};
