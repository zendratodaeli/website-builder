import { ActionsState } from "@/lib/types";
import { toast } from "sonner";

const useActionToast = <T>() => {
  return ({ data, message, error }: ActionsState<T>) => {
    if (data) return toast.success(message);
    if (error) return toast.error(error.message);
  };
};

export default useActionToast;
