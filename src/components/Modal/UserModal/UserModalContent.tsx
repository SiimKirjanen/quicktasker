import {
  ClipboardDocumentListIcon,
  KeyIcon,
  PowerIcon,
  RectangleStackIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CLOSE_USER_MODAL,
  DELETE_USER,
  EDIT_USER,
  OPEN_USER_LOGS_MODAL,
  RESET_PASSWORD,
} from "../../../constants";
import { useUserActions } from "../../../hooks/actions/useUserActions";
import { useLoadingStates } from "../../../hooks/useLoadingStates";
import { useNavigation } from "../../../hooks/useNavigation";
import { AppContext } from "../../../providers/AppContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { UserContext } from "../../../providers/UserContextProvider";
import { CustomFieldEntityType } from "../../../types/custom-field";
import { UserTypes } from "../../../types/user";
import { WPQTIconButton } from "../../common/Button/WPQTIconButton/WPQTIconButton";
import { AutoSaveInput } from "../../common/Input/AutoSaveInput/AutoSaveInput";
import { AutoSaveTextarea } from "../../common/Input/AutoSaveTextarea/AutoSaveTextarea";
import { CustomFieldsInModalWrap } from "../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap";
import { WPQTConfirmTooltip } from "../../Dialog/ConfirmTooltip/ConfirmTooltip";
import { CommentsWithVisibility } from "../../Tab/CommentsAndLogs/CommentsWithVisibility";
import { WPQTTabs } from "../../Tab/WPQTTabs";
import { WPQTModalField, WPQTModalFieldSet } from "../WPQTModal";

const UserModalContent = () => {
  const {
    state: { userToEdit },
    modalDispatch,
  } = useContext(ModalContext);
  const {
    state: { isUserAllowedToDelete },
  } = useContext(AppContext);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const { changeUserStatus, deleteUser, resetUserPassword, editUser } =
    useUserActions();
  const { userDispatch } = useContext(UserContext);
  const {
    loading1: isResetPWLoading,
    setLoading1: setIsResetPWLoading,
    loading2: isActivateLoading,
    setLoading2: setIsActivateLoading,
    loading3: isDeleteLoading,
    setLoading3: setIsDeleteLoading,
  } = useLoadingStates();
  const { navigatePage } = useNavigation();

  useEffect(() => {
    if (userToEdit) {
      setIsActiveUser(userToEdit.is_active);
      setHasPassword(userToEdit.has_password);
    }
  }, [userToEdit]);

  if (!userToEdit) return null;

  return (
    <>
      <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[1fr_auto]">
        <div className="wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-r-gray-300 md:wpqt-pr-6">
          <WPQTTabs
            tabs={[
              { name: __("Details", "quicktasker") },
              { name: __("Comments", "quicktasker") },
            ]}
            tabClassName="!wpqt-flex-none wpqt-px-4 wpqt-text-left wpqt-font-semibold wpqt-text-gray-400 hover:wpqt-text-gray-600 data-[selected]:wpqt-text-blue-600 data-[selected]:!wpqt-border-b-[3px]"
            tabsContent={[
              <div
                key="details"
                className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-10 md:wpqt-grid-cols-[1fr_0.7fr]"
              >
                <div>
                  <WPQTModalFieldSet>
                    <WPQTModalField label={__("Name", "quicktasker")}>
                      <AutoSaveInput
                        isAutoFocus={true}
                        value={userToEdit.name}
                        wrapperClassName="wpqt-w-full"
                        className="wpqt-w-full"
                        onChange={async (value) => {
                          const { success, user: updatedUser } = await editUser(
                            userToEdit.id,
                            { name: value },
                          );
                          if (success && updatedUser) {
                            userDispatch({
                              type: EDIT_USER,
                              payload: updatedUser,
                            });
                          }
                        }}
                      />
                    </WPQTModalField>

                    <WPQTModalField label={__("Description", "quicktasker")}>
                      <AutoSaveTextarea
                        value={userToEdit.description}
                        className="wpqt-w-full"
                        onChange={async (value) => {
                          const { success, user: updatedUser } = await editUser(
                            userToEdit.id,
                            { description: value },
                          );
                          if (success && updatedUser) {
                            userDispatch({
                              type: EDIT_USER,
                              payload: updatedUser,
                            });
                          }
                        }}
                      />
                    </WPQTModalField>
                  </WPQTModalFieldSet>
                </div>
                <CustomFieldsInModalWrap
                  entityId={userToEdit!.id}
                  entityType={CustomFieldEntityType.QUICKTASKER}
                />
              </div>,
              <div key="comments">
                <CommentsWithVisibility
                  subjectId={userToEdit.id}
                  subjectType={UserTypes.QUICKTASKER}
                />
              </div>,
            ]}
          />
        </div>
        <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
          <WPQTIconButton
            icon={<UserIcon className="wpqt-icon-blue wpqt-size-4" />}
            text={__("User details", "quicktasker")}
            onClick={() => {
              navigatePage(`#/user-management/${userToEdit!.id}`);
              modalDispatch({
                type: CLOSE_USER_MODAL,
              });
            }}
          />
          <WPQTIconButton
            icon={<RectangleStackIcon className="wpqt-icon-blue wpqt-size-5" />}
            text={__("User tasks", "quicktasker")}
            onClick={() => {
              navigatePage(`#/user-management/${userToEdit!.id}/tasks`);
              modalDispatch({
                type: CLOSE_USER_MODAL,
              });
            }}
          />
          <WPQTIconButton
            icon={
              <ClipboardDocumentListIcon className="wpqt-icon-blue wpqt-size-5" />
            }
            text={__("View logs", "quicktasker")}
            onClick={() => {
              modalDispatch({
                type: OPEN_USER_LOGS_MODAL,
                payload: {
                  userId: userToEdit.id,
                  userType: UserTypes.QUICKTASKER,
                },
              });
            }}
          />
          {hasPassword && (
            <WPQTIconButton
              icon={<KeyIcon className="wpqt-icon-red wpqt-size-5" />}
              text={__("Reset password", "quicktasker")}
              loading={isResetPWLoading}
              onClick={async () => {
                setIsResetPWLoading(true);
                await resetUserPassword(userToEdit.id, () => {
                  userDispatch({
                    type: RESET_PASSWORD,
                    payload: userToEdit.id,
                  });
                  setHasPassword(false);
                });
                setIsResetPWLoading(false);
              }}
            />
          )}
          {!isActiveUser && (
            <WPQTIconButton
              icon={<PowerIcon className="wpqt-icon-green wpqt-size-5" />}
              text={__("Activate user", "quicktasker")}
              loading={isActivateLoading}
              onClick={async () => {
                setIsActivateLoading(true);
                await changeUserStatus(userToEdit!.id, true, (userData) => {
                  userDispatch({
                    type: EDIT_USER,
                    payload: { ...userData },
                  });
                  setIsActiveUser(true);
                });
                setIsActivateLoading(false);
              }}
            />
          )}
          {isActiveUser && (
            <WPQTIconButton
              icon={<PowerIcon className="wpqt-icon-red wpqt-size-5" />}
              text={__("Disable user", "quicktasker")}
              loading={isActivateLoading}
              onClick={async () => {
                setIsActivateLoading(true);
                await changeUserStatus(userToEdit!.id, false, (userData) => {
                  userDispatch({
                    type: EDIT_USER,
                    payload: { ...userData },
                  });
                  setIsActiveUser(false);
                });
                setIsActivateLoading(false);
              }}
            />
          )}
          {isUserAllowedToDelete && (
            <WPQTConfirmTooltip
              confirmMessage={__(
                "Are you sure you want to delete this user?",
                "quicktasker",
              )}
              onConfirm={async () => {
                setIsDeleteLoading(true);
                await deleteUser(userToEdit!.id, (userId) => {
                  userDispatch({
                    type: DELETE_USER,
                    payload: userId,
                  });
                  modalDispatch({
                    type: CLOSE_USER_MODAL,
                  });
                });
                setIsDeleteLoading(false);
              }}
              containerClassName="wpqt-flex"
            >
              {({ onClick }) => (
                <WPQTIconButton
                  icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
                  text={__("Delete user", "quicktasker")}
                  loading={isDeleteLoading}
                  onClick={onClick}
                  className="wpqt-w-full"
                />
              )}
            </WPQTConfirmTooltip>
          )}
        </div>
      </div>
    </>
  );
};

export { UserModalContent };
