import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import { WPQTModalTitle } from "../WPQTModal";
import { clsx } from "clsx";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { User } from "../../../types/user";

type Props = {
  createUser: (name: string, description: string) => void;
  editUser: (user: User) => void;
  modalSaving: boolean;
};

const UserModalContent = forwardRef(function UserModalContent(
  { createUser, editUser, modalSaving }: Props,
  ref,
) {
  const {
    state: { userToEdit },
  } = useContext(ModalContext);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const editingUser = !!userToEdit;

  useEffect(() => {
    if (userToEdit) {
      setUserName(userToEdit.name);
      setUserDescription(userToEdit.description);
    }
  }, [userToEdit]);

  const saveUser = () => {
    editingUser
      ? editUser({
          ...userToEdit,
          name: userName,
          description: userDescription,
        })
      : createUser(userName, userDescription);
  };

  const clearContent = () => {
    setUserName("");
    setUserDescription("");
  };

  useImperativeHandle(ref, () => ({
    clearContent,
  }));

  return (
    <>
      <WPQTModalTitle>User modal</WPQTModalTitle>
      <Fieldset className="wpqt-mb-3">
        <Field className="wpqt-mb-3">
          <Label className="wpqt-mb-2 wpqt-block wpqt-text-sm/6 wpqt-font-medium">
            Name
          </Label>
          <Input
            autoFocus
            className={clsx(
              "wpqt-border-1 wpqt-block wpqt-w-full wpqt-rounded-lg wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6",
              "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25",
            )}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Field>
        <Field>
          <Label className="wpqt-mb-2 wpqt-block wpqt-text-sm/6 wpqt-font-medium">
            Description
          </Label>
          <Textarea
            className={clsx(
              "wpqt-border-1 wpqt-block wpqt-w-full wpqt-resize-none wpqt-rounded-lg wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6",
              "focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-white/25",
            )}
            rows={3}
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
          />
        </Field>
      </Fieldset>
      <div className="wpqt-mt-4 wpqt-flex wpqt-justify-end">
        <Button
          className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[open]:wpqt-bg-gray-700 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white"
          onClick={saveUser}
        >
          {modalSaving ? "Saving..." : editingUser ? "Edit user" : "Add user"}
        </Button>
      </div>
    </>
  );
});

export { UserModalContent };
