import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS, projectMetadata } from "@/lib/projectPages";

export const metadata = projectMetadata("work-in-global-society");

export default function WorkInGlobalSocietyPage() {
  const project = PROJECTS.find((p) => p.slug === "work-in-global-society");
  return <ProjectPage project={project!} />;
}
