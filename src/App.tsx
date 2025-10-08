import { useState } from "react";
import "./app.css";
import { Sidebar } from "./common/components/sidebar";
import { sections, type Exercise } from "./common/constants/section";

function App() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(
    sections[0].exercises[0]
  );

  return (
    <div className="flex">
      <Sidebar
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
      />
      <selectedExercise.module.default />
    </div>
  );
}

export default App;
