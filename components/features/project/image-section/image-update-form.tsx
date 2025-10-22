import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "@/lib/generated/prisma";
import Form from "next/form";

type Props = {
  image: Image;
  action: (formData: FormData) => void;
};

const ImageUpdateForm = ({ image: { url, alt }, action }: Props) => {

  return (
    <Form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url" className="font-semibold">
          URL
        </Label>
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
         Update
        </Button>
        <DialogClose asChild>
          <Button variant={"outline"}>Close</Button>
        </DialogClose>
      </DialogFooter>
    </Form>
  );
};

export default ImageUpdateForm;
