import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS, projectMetadata } from "@/lib/projectPages";

export const metadata = projectMetadata("employment-relations");

export default function EmploymentRelationsPage() {
  const project = PROJECTS.find((p) => p.slug === "employment-relations");
  return <ProjectPage project={project!} />;
}
