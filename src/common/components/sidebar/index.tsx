import { sections, type Exercise } from "@/common/constants/section";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/shadcn-ui/sidebar";

type Props = {
  selectedExercise: Exercise;
  setSelectedExercise: (exercise: Exercise) => void;
};

export const Sidebar = ({ setSelectedExercise }: Props) => {
  return (
    <SidebarProvider>
      <SidebarComponent>
        <SidebarHeader>Nature of Code</SidebarHeader>
        <SidebarContent>
          {sections.map((section) => {
            return (
              <SidebarGroup key={section.name}>
                <SidebarGroupLabel>{section.name}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.exercises.map((exercise) => {
                      return (
                        <SidebarMenuItem key={exercise.name}>
                          <SidebarMenuButton
                            onClick={() => {
                              setSelectedExercise(exercise);
                            }}
                          >
                            {exercise.name}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </SidebarComponent>
    </SidebarProvider>
  );
};
