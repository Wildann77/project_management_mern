import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { logoutMutationFn } from "@/lib/api";
import { Loader } from "lucide-react";
import { useStore } from "@/store/store";

const LogoutDialog = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {clearAccessToken} = useStore();


  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["authUser"] });
      clearAccessToken();
      navigate("/");
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleLogout = useCallback(() => {
    if (isPending) return;
    mutate();
  }, [isPending, mutate]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogDescription>
            This will end your current session and you will need to log in again
            to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending} type="button" onClick={handleLogout}>
            {isPending && <Loader className="animate-spin mr-2" />}
            Sign out
          </Button>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
