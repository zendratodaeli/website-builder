import { getProjectWithAll } from ".";
import { ExternalLink, Prisma, Text } from "../generated/prisma";

export type ProjectWithAll = NonNullable<
  Prisma.PromiseReturnType<typeof getProjectWithAll>
>;

export type TextWithExternalLink = Text & { externalLink: ExternalLink | null}

export type SectionWithAll = ProjectWithAll["sections"][number];

export type SectionItemWithAll = SectionWithAll["items"][number];

export enum DirectionEnum {
  Left = "left",
  Right = "right"
}