import {
  Dialog,
  IconButton,
  Button,
  Textarea,
  CloseButton,
  Portal,
} from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";


type AddOopsieDialogProps = {
  groupId: string;
  oopsieText:string;
  setOopsieText: (value: string) => void;
  addOopsie:(groupId:string) => void;
};

const AddOopsieDialog: React.FC<AddOopsieDialogProps> = ({
  groupId,
  oopsieText,
  setOopsieText,
  addOopsie
}) => {


  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Oopsie Ekle"
          size="sm"
          variant="ghost"
          colorPalette="fg"
        >
          <LuPlus />
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Oopsie Ekle</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Textarea
                placeholder="Oopsie Text..."
                value={oopsieText}
                onChange={(e) => setOopsieText(e.target.value)}
                required
              />
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>

              <Button onClick={()=>{addOopsie(groupId)}}>Save</Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddOopsieDialog;
