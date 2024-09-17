import { Resolver, Query, Arg } from "type-graphql";

import projects from "./projects.json";
import { Project } from "./projects.schema";

@Resolver(Project)
export class ProjectsResolver {
  @Query(() => Project, { nullable: true })
  project(@Arg("slug", () => String) slug: string): Project | undefined {
    const project = projects.find((project) => project.published && project.slug === slug);
    if (project === undefined) {
      throw new Error("Page not found");
    }
    return project;
  }

  @Query(() => [Project])
  projects(): Project[] {
    return projects;
  }
}
