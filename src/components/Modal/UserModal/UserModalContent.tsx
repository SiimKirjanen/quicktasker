import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
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
import { WPQTIconButton } from "../../common/Button/Button";
import {
  PowerIcon,
  RectangleStackIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useUserActions } from "../../../hooks/useUserActions";
import { CLOSE_USER_MODAL, DELETE_USER, EDIT_USER } from "../../../constants";
import { UserContext } from "../../../providers/UserContextProvider";
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
    modalDispatch,
  } = useContext(ModalContext);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [isActiveUser, setIsActiveUser] = useState(false);
  const { changeUserStatus, deleteUser } = useUserActions();
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    if (userToEdit) {
      setUserName(userToEdit.name);
      setUserDescription(userToEdit.description);
      setIsActiveUser(userToEdit.is_active);
    }
  }, [userToEdit]);

  const saveUser = () => {
    createUser(userName, userDescription);
  };

  const clearContent = () => {
    setUserName("");
    setUserDescription("");
  };

  useImperativeHandle(ref, () => ({
    clearContent,
  }));

  if (!userToEdit) return null;

  return (
    <>
      <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[1fr_auto]">
        <div className="wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-r-gray-300 md:wpqt-pr-3">
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
        </div>
        <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
          <WPQTIconButton
            icon={<RectangleStackIcon className="wpqt-icon-blue wpqt-size-5" />}
            text="User tasks"
            onClick={() => {
              window.location.hash = `#/users/${userToEdit!.id}/tasks`;
            }}
          />
          <WPQTIconButton
            icon={<UserIcon className="wpqt-icon-blue wpqt-size-5" />}
            text="User details"
            onClick={() => {
              window.location.hash = `#/users/${userToEdit!.id}`;
            }}
          />
          {!isActiveUser && (
            <WPQTIconButton
              icon={<PowerIcon className="wpqt-icon-green wpqt-size-5" />}
              text="Activate user"
              onClick={async () => {
                await changeUserStatus(userToEdit!, true, (userData) => {
                  userDispatch({
                    type: EDIT_USER,
                    payload: { ...userData },
                  });
                  setIsActiveUser(true);
                });
              }}
            />
          )}
          {isActiveUser && (
            <WPQTIconButton
              icon={<PowerIcon className="wpqt-icon-red wpqt-size-5" />}
              text="Disable user"
              onClick={async () => {
                await changeUserStatus(userToEdit!, false, (userData) => {
                  userDispatch({
                    type: EDIT_USER,
                    payload: { ...userData },
                  });
                  setIsActiveUser(false);
                });
              }}
            />
          )}
          <WPQTIconButton
            icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
            text="Delete user"
            onClick={async () => {
              await deleteUser(userToEdit!, (userId) => {
                userDispatch({
                  type: DELETE_USER,
                  payload: userId,
                });
                modalDispatch({
                  type: CLOSE_USER_MODAL,
                });
              });
            }}
          />
        </div>
      </div>
      <WPQTModalFooter
        onSave={saveUser}
        saveBtnText={modalSaving ? "Saving..." : "Edit user"}
      />
    </>
  );
});

export { UserModalContent };
