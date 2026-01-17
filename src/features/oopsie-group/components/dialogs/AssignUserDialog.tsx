import { useState } from "react";
import {
  Dialog,
  IconButton,
  Button,
  Input,
  CloseButton,
  Portal,
} from "@chakra-ui/react";
import { LuUserPlus } from "react-icons/lu";

type AssignUserDialogProps = {
  groupId: string;
  onSave: (groupId: string, userId: string) => void;
};

const AssignUserDialog: React.FC<AssignUserDialogProps> = ({
  groupId,
  onSave,
}) => {
  const [userId, setUserId] = useState("");

  const handleSave = () => {
    if (!userId.trim()) return;
    onSave(groupId, userId);
    setUserId("");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Kullanıcı Ata"
          size="sm"
          variant="ghost"
          colorPalette="fg"
        >
          <LuUserPlus />
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Gruba Kullanıcı Ekle</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <p>
                Grup sohbetleri ve kullanıcının grubu görebilmesi için kullanıcı
                id ile ekleme yapabilirsiniz.
              </p>

              <Input
                placeholder="Kullanıcı ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>

              <Button onClick={handleSave}>Save</Button>
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

export default AssignUserDialog;
