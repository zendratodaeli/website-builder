import SectionButton from '@/components/pages/project/section-button';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server'
import { Plus } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
  params: Promise<{ id: string}>
}

const ProjectPage = async ({params}: Props) => {

  const {userId} = await auth();

  if(!userId) {
    notFound();
  };

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: +id,
      userId
    }
  })

  if(!project) {
    notFound();
  }

  return (
    <div className='py-16'>

      <SectionButton/>
    </div>
  )
}

export default ProjectPage
