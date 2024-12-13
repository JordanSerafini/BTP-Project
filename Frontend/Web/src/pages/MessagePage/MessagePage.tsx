import { useState } from "react";
import UserNavMenu from "./components/UserNavMenu"
import { Group } from "./types/group.interface";

function MessagePage() {

  const [ currentGroup, setCurrentGroup ] = useState<Group | null>(null);

  return (
    <div>
      <UserNavMenu setCurrentGroup={setCurrentGroup}/>
    </div>
  )
}

export default MessagePage