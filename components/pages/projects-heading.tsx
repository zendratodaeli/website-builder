import React from 'react'
import { Button } from '../ui/button'

const ProjectsHeading = () => {
  return (
    <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl mb-2 font-semibold">Projects</h1>
          <p>Managed all your projects in your account</p>
        </div>
          <Button>Create new project</Button>
      </div>
  )
}

export default ProjectsHeading
