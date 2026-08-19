import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS } from "@/lib/projectPages";

export default function CommercialCampaignPage() {
  const project = PROJECTS.find((p) => p.slug === "commercial-campaign");
  return <ProjectPage project={project!} />;
}
