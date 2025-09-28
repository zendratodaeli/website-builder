import React from 'react'
import SectionButton from './section-button'
import Container from '@/components/core/container'
import { Section, Text } from '@/lib/generated/prisma'

type Props = {
  sections: (Section & {text: Text | null})[]
}

const SectionList = ({sections}: Props) => {
  return (
          <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <SectionButton />
            <Container asChild>
              <section className="py-16">{section.text?.content}</section>
            </Container>
          </li>
        ))}
        <li>
        <SectionButton />
        </li>
      </ul>
  )
}

export default SectionList
