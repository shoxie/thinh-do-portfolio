import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS } from "@/lib/projectPages";

export default function TaosProjectPage() {
  const project = PROJECTS.find((p) => p.slug === "taos-project");
  return <ProjectPage project={project!} />;
}
