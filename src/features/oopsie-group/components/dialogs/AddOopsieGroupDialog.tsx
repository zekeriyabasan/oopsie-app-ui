import {
  Dialog,
  IconButton,
  Button,
  Textarea,
  CloseButton,
  Portal,
} from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";


type AddOopsieGroupDialogProps = {
  oopsieGroupText:string;
  oopsieGroupDescriptionText:string;
  setOopsieGroupText: (value: string) => void;
  setOopsieGroupDescriptionText:(value: string) => void;
  addOopsieGroup:() => void;
};

const AddOopsieGroupDialog: React.FC<AddOopsieGroupDialogProps> = ({
  oopsieGroupText,
  oopsieGroupDescriptionText,
  setOopsieGroupText,
  setOopsieGroupDescriptionText,
  addOopsieGroup
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
              <Dialog.Title>Oopsie Group Ekle</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Textarea
                placeholder="Oopsie Text..."
                value={oopsieGroupText}
                onChange={(e) => setOopsieGroupText(e.target.value)}
                required
              />
              <Textarea
                placeholder="Oopsie Description Text..."
                value={oopsieGroupDescriptionText}
                onChange={(e) => setOopsieGroupDescriptionText(e.target.value)}
                required
              />
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>

              <Button onClick={addOopsieGroup}>Save</Button>
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

export default AddOopsieGroupDialog;
