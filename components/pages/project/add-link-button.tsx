import { MenuBarItem } from '@/components/core/menubar'
import { Link } from 'lucide-react'
const AddLinkButton = () => {
  const handleClick = () => {
    
  }

  return (
    <MenuBarItem onClick={handleClick}>
        <Link/>
      </MenuBarItem>
  )
}

export default AddLinkButton
