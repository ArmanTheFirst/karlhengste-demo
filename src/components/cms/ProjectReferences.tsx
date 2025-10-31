"use client";

import { ProjectReference } from "./ProjectReference";

type ProjectReferencesBlok = {
  _uid: string;
  component: string;
  title?: string;
  projects?: any[];
  // Handle variations
  items?: any[];
};

export function ProjectReferences({ blok }: { blok: ProjectReferencesBlok }) {
  const title = blok.title || "";
  const projects = blok.projects || blok.items || [];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              {title}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any, idx: number) => {
            // Handle both project-reference blocks and raw project objects
            if (project.component === "project-reference") {
              return <ProjectReference key={project._uid || `project-${idx}`} blok={project} />;
            }
            // If it's a raw object without component, wrap it
            return (
              <ProjectReference
                key={project._uid || `project-${idx}`}
                blok={{ ...project, component: "project-reference" }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

