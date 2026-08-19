import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS } from "@/lib/projectPages";

export default function EmploymentRelationsPage() {
  const project = PROJECTS.find((p) => p.slug === "employment-relations");
  return <ProjectPage project={project!} />;
}
