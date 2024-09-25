import { useContext, useState } from "@wordpress/element";
import { WPQTButton } from "../../common/Button/Button";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { UserContext } from "../../../providers/UserContextProvider";
import { useUserActions } from "../../../hooks/actions/useUserActions";
import { ADD_USER } from "../../../constants";

function AddUser() {
  const [showInput, setShowInput] = useState(false);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const { userDispatch } = useContext(UserContext);
  const { createUser } = useUserActions();

  const onCreateUser = async () => {
    await createUser(userName, userDescription, (userData) => {
      userDispatch({ type: ADD_USER, payload: userData });
      clearStatus();
    });
  };

  const clearStatus = () => {
    setUserName("");
    setUserDescription("");
    setShowInput(false);
  };

  return (
    <div>
      {showInput ? (
        <div>
          <WPQTInput value={userName} onChange={setUserName} />
          <WPQTTextarea value={userDescription} onChange={setUserDescription} />
          <WPQTButton btnText="Save" onClick={onCreateUser} />
          <WPQTButton btnText="Close" onClick={clearStatus} />
        </div>
      ) : (
        <WPQTButton onClick={() => setShowInput(true)} btnText="Add user" />
      )}
    </div>
  );
}

export { AddUser };
