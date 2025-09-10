import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProjectsCreateForm } from "./projects-create-form"


const ProjectsCreateDialog = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
      <Button>Create new project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Name Your Project</DialogTitle>
            <DialogDescription>Give a meaningful name to your project</DialogDescription>
          </DialogHeader>
          <ProjectsCreateForm/>
        </DialogContent>
      </Dialog>
  )
}

export default ProjectsCreateDialog
