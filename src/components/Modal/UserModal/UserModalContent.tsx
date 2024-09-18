import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
  WPQTModalTitle,
} from "../WPQTModal";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { User } from "../../../types/user";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";

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

      <WPQTModalFieldSet>
        <WPQTModalField label="Name">
          <WPQTInput
            isAutoFocus={true}
            value={userName}
            onChange={(newValue: string) => setUserName(newValue)}
          />
        </WPQTModalField>

        <WPQTModalField label="Description">
          <WPQTTextarea
            rowsCount={3}
            value={userDescription}
            onChange={(newValue: string) => setUserDescription(newValue)}
          />
        </WPQTModalField>
      </WPQTModalFieldSet>
      <WPQTModalFooter
        onSave={saveUser}
        saveBtnText={
          modalSaving ? "Saving..." : editingUser ? "Edit user" : "Add user"
        }
      />
    </>
  );
});

export { UserModalContent };
