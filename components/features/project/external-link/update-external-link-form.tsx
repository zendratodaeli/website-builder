"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateExternalLink } from "@/lib/external-link/action";
import { ExternalLink } from "@/lib/generated/prisma";
import { ActionsState } from "@/lib/types";
import { Loader } from "lucide-react";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  externalLink: ExternalLink;
};

const UpdateExternalLinkForm = ({
  externalLink: { id, url, label },
}: Props) => {
  const [{ data, error, message }, action, isPending] = useActionState<
    ActionsState<ExternalLink>,
    FormData
  >(updateExternalLink.bind(null, id), {});

  useEffect(() => {
    if (data) toast.success(message);
    if (error) toast.error(error.message);
  }, [data, error, message]);
  

  return (
    <Form action={action} className="grid gap-4">
      <div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            name="label"
            defaultValue={label}
            placeholder="Click me..."
            className="col-span-3 h-8"
          />
        </div>
        <div className="grid grid-cols-$ items-center gap-4">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            name="url"
            defaultValue={url}
            placeholder="https://www.google.com/"
            className="col-span-3 h-8"
          />
        </div>
      </div>
      <Button>
        {isPending && <Loader/>}
        { isPending ? "Saving..." : "Save"}
      </Button>
    </Form>
  );
};

export default UpdateExternalLinkForm;
