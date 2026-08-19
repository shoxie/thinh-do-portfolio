import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS } from "@/lib/projectPages";

export default function WorkInGlobalSocietyPage() {
  const project = PROJECTS.find((p) => p.slug === "work-in-global-society");
  return <ProjectPage project={project!} />;
}
