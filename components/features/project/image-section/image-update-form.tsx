import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "@/lib/generated/prisma";
import { updateImage } from "@/lib/image/action";
import { ActionsState, StatusCode } from "@/lib/types";
import { Loader } from "lucide-react";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  image: Image;
};

const ImageUpdateForm = ({ image: { id, url, alt } }: Props) => {
  const updateImageWithId = updateImage.bind(null, id);
  const [{ code, data, message, error }, action, isPending] = useActionState<
    ActionsState<Image>,
    FormData
  >(updateImageWithId, {});

  useEffect(() => {
    if (data) {
      toast.success(message);
    }

    if (error && code !== StatusCode.BadRequest) {
      toast.error(error.message);
    }
  }, [code, data, error, message]);

  return (
    <Form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url" className="font-semibold">
          URL
        </Label>
        {error && code === StatusCode.BadRequest && (
          <p className="text-destructive text-xs">{error.message}</p>
        )}
        <Textarea
          id="url"
          defaultValue={url}
          className="break-all"
          name="url"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alt" className="font-semibold">
          Alt Text
        </Label>
        <Textarea id="alt" name="alt" defaultValue={alt} />
      </div>

      <DialogFooter>
        <Button>
          {isPending && <Loader />}
          {isPending ? "Updating..." : "Update"}
        </Button>
        <DialogClose asChild>
          <Button variant={"outline"}>Close</Button>
        </DialogClose>
      </DialogFooter>
    </Form>
  );
};

export default ImageUpdateForm;
