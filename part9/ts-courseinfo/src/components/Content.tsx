import Part from "./Part";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartAdditional extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartAdditional {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartAdditional {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartAdditional {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
