import React from 'react'
import Logo from './logo'
import { Button } from './ui/button'
import Link from 'next/link'
import Container from './core/container'

const Header = () => {
  return (
    <Container className='flex justify-between'>
      <Logo/>
      <Button asChild>
        <Link href={"/projects"}>
          Launch
        </Link>
      </Button>
    </Container>
  )
}

export default Header
