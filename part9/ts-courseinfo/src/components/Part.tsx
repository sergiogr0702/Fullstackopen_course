import { CoursePart } from "./Content";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never) => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>Project exercises {part.groupProjectCount}</p>
          <p></p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Submit to {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
