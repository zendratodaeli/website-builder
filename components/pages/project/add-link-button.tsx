"use client";

import { MenuBarItem } from "@/components/core/menubar";
import {
  createExternalLink,
  deleteExternalLink,
} from "@/lib/external-link/action";
import { ExternalLink, Text } from "@/lib/generated/prisma";
import { Link, Unlink } from "lucide-react";
import { toast } from "sonner";

type Props = {
  textId: Text["id"];
  linkId?: ExternalLink["id"];
};

const AddLinkButton = ({ textId, linkId }: Props) => {
  const handleClick = async () => {
    const { data, error, message } = linkId
      ? await deleteExternalLink(linkId)
      : await createExternalLink(textId);

    if (data) toast.success(message);

    if (error) toast.error(error.message);
  };

  return (
    <MenuBarItem onClick={handleClick}>
      {linkId ? <Unlink /> : <Link />}
    </MenuBarItem>
  );
};

export default AddLinkButton;
