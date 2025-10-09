import React from "react";
import ProjectsCreateDialog from "./projects-create-dialog";

const ProjectsHeading = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl mb-2 font-semibold">Projects</h1>
        <p>Managed all your projects in your account</p>
      </div>
      <ProjectsCreateDialog/>
    </div>
  );
};

export default ProjectsHeading;