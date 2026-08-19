import { ProjectPage } from "@/components/project/ProjectPage";
import { PROJECTS, projectMetadata } from "@/lib/projectPages";

export const metadata = projectMetadata("commercial-campaign");

export default function CommercialCampaignPage() {
  const project = PROJECTS.find((p) => p.slug === "commercial-campaign");
  return <ProjectPage project={project!} />;
}
