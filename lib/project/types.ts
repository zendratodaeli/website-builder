import { getPageWithAll } from "../pages";
import { ExternalLink, Prisma, Text } from "../generated/prisma";

export type PageWithAll = NonNullable<
  Prisma.PromiseReturnType<typeof getPageWithAll>
>;

export type TextWithExternalLink = Text & { externalLink: ExternalLink | null}

export type SectionWithAll = PageWithAll["sections"][number];

export type SectionItemWithAll = SectionWithAll["items"][number];

export enum DirectionEnum {
  Left = "left",
  Right = "right"
}