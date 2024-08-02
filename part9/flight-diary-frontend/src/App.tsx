import { useState, useEffect } from "react";
import { getAll } from "./services/diaryService";
import { DiaryEntryBase } from "./types";
import AddEntry from "./components/AddEntry";
import DiaryList from "./components/DiaryList";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntryBase[]>([]);

  useEffect(() => {
    const fetchDiary = async () => {
      const diaryList = await getAll();
      setDiaries(diaryList);
    };

    fetchDiary();
  }, []);

  const addDiary = (newDiaryEntry: DiaryEntryBase) => {
    setDiaries(diaries.concat(newDiaryEntry));
  };

  return (
    <div>
      <AddEntry addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
