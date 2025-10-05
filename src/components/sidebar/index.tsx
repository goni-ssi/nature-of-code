import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

export const Sidebar = () => {
  return (
    <SidebarProvider>
      <SidebarComponent>
        <SidebarHeader>Nature of Code</SidebarHeader>
        <SidebarContent>
          <SidebarGroupLabel>Forces</SidebarGroupLabel>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </SidebarComponent>
    </SidebarProvider>
  );
};
