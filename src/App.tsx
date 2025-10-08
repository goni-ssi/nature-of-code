import { useState } from "react";
import "./app.css";
import { Sidebar } from "./common/components/sidebar";
import { sections, type Exercise } from "./common/constants/section";

function App() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(
    sections[0].exercises[0]
  );

  return (
    <div className="flex h-screen w-screen">
      <Sidebar
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
      />
      <div className="flex-1">
        <selectedExercise.module.default />
      </div>
    </div>
  );
}

export default App;
