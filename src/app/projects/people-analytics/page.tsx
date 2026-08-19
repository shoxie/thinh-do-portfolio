import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS } from "@/lib/projectPages";

export default function PeopleAnalyticsPage() {
  const project = PROJECTS.find((p) => p.slug === "people-analytics");
  return <ProjectPage project={project!} />;
}
