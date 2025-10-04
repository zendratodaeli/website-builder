import { getProjectWithAll } from ".";
import { ExternalLink, Prisma, Text } from "../generated/prisma";

export type ProjectWithAll = NonNullable<
  Prisma.PromiseReturnType<typeof getProjectWithAll>
>;

export type TextWithExternalLink = Text & { externalLink: ExternalLink | null}
