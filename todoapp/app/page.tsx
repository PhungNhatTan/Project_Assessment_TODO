import Image from "next/image";
import getAuthorTODO from "./actions/getAuthorTODO";
import getCurrentUser from "./actions/getCurrentUser";
import getAssignTODO from "./actions/getAssignTODO";

export default async function Home() {
  const currentUser = await getCurrentUser();
  let authorTODOs = null;
  let assignTODOs = null;
  let currentTODOs = null;

  if (currentUser) {
    authorTODOs = await getAuthorTODO(currentUser);
    assignTODOs = await getAssignTODO(currentUser);
  }

  if (!currentTODOs) {
    return (
      <div>

      </div>
    )
  }

  return (
    <div>
      Hello todoapp
    </div>
  );
}
