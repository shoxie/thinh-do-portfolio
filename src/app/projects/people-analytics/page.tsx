import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS, projectMetadata } from "@/lib/projectPages";

export const metadata = projectMetadata("people-analytics");

export default function PeopleAnalyticsPage() {
  const project = PROJECTS.find((p) => p.slug === "people-analytics");
  return <ProjectPage project={project!} />;
}
