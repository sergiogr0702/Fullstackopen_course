import DiaryEntry from "./DiaryEntry";
import { DiaryEntryBase } from "../types";

interface DiaryListProps {
  diaries: DiaryEntryBase[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((entry) => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default DiaryList;
