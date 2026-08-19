import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS } from "@/lib/projectPages";

export default function BusinessEnvironmentPage() {
  const project = PROJECTS.find(
    (p) => p.slug === "understanding-the-business-environment",
  );
  return <ProjectPage project={project!} />;
}
