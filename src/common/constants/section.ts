import { groupBy } from "es-toolkit";

const sectionFiles: Record<string, Module> = import.meta.glob(
  "/src/sections/**/*.tsx",
  {
    eager: true,
  }
);

const parseSections = (sections: Record<string, Module>) => {
  const parsed = Object.entries(sections).map(([path, module]) => {
    const { section, exercise } = parseSectionName(path);

    return {
      section,
      exercise: {
        name: exercise,
        module,
      },
    };
  });

  const groupedBySection = groupBy(parsed, (item) => item.section);
  const result: Section[] = Object.entries(groupedBySection).map(
    ([section, exercises]) => {
      return {
        name: section,
        exercises: exercises.map((exercise) => exercise.exercise),
      };
    }
  );

  return result;
};

const parseSectionName = (path: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_empty, _src, _sections, section, exercise] = path.split("/");

  return { section, exercise };
};

export const sections = parseSections(sectionFiles);
type Module = {
  default: () => React.ReactNode;
};
export type Exercise = {
  name: string;
  module: Module;
};

export type Section = {
  name: string;
  exercises: Exercise[];
};
