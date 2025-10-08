import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {

  const router = useRouter();

  const handleClick = () => {
    router.back();
  }

  return (
    <Button variant={"link"} onClick={handleClick} >
      <ArrowLeft/>
      <span>Back</span>
    </Button>
  )
}

export default BackButton
