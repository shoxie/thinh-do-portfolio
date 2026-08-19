import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS, projectMetadata } from "@/lib/projectPages";

export const metadata = projectMetadata("understanding-the-business-environment");

export default function BusinessEnvironmentPage() {
  const project = PROJECTS.find(
    (p) => p.slug === "understanding-the-business-environment",
  );
  return <ProjectPage project={project!} />;
}
