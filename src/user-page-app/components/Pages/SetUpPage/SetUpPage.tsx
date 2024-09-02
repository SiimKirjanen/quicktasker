import { useContext } from "@wordpress/element";
import { setUpUserPageRequest } from "../../../api/user-page-api";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";

function SetUpPage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const setUpUserPage = async () => {
    const data = { password: "siim" };

    try {
      await setUpUserPageRequest(pageHash, data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Set Up Page</h1>
      <button onClick={setUpUserPage}>Setup</button>
    </div>
  );
}

export { SetUpPage };
