import ProjectsItem from "./projects-item";

const ProjectsList = () => {
  return (
    <ul className="grid grid-cols-2 gap-8">
      <ProjectsItem/>
      <ProjectsItem/>
    </ul>
  );
};

export default ProjectsList;
