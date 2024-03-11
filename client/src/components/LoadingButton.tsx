import {Loader2} from "lucide-react";
import {Button} from "./ui/button";

type LoadingButtonProps = {};

const LoadingButton = (props: LoadingButtonProps) => {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 animate-spin" />
      Loading
    </Button>
  );
};

export default LoadingButton;
