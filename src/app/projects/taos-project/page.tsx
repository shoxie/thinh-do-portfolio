import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS, projectMetadata } from "@/lib/projectPages";

export const metadata = projectMetadata("taos-project");

export default function TaosProjectPage() {
  const project = PROJECTS.find((p) => p.slug === "taos-project");
  return <ProjectPage project={project!} />;
}
