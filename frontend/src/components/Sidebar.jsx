import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    
    // Filter users based on the search query and online filter toggle
    const filtered = users.filter((user) => {
      const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOnlineFilter = showOnlineOnly ? onlineUsers.includes(user._id) : true;
      return matchesSearch && matchesOnlineFilter; //match both conditions
    });
    
    setFilteredUsers(filtered);
  }, [users, showOnlineOnly, searchQuery, onlineUsers]);
  
  if (isUsersLoading) return <SidebarSkeleton />;
  
  
  return (
    <aside className="h-full w-full md:w-72 border-r border-base-300 flex flex-col transition-all duration-200 ">
      <div className="border-b border-base-300 w-full p-5">
        
        {/* contact logo and contact */}
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium  lg:block">Contacts</span>
        </div>
                                                                 
        {/* TODO: Online filter toggle */}
        <div className="mt-3  lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>

      {/* to search users */}
        {/* Search bar */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered h-8 w-full text-sm"
          />
        </div>
      {/* to search users [end] */}  

      </div>

      {/* mapping the user */}
      <div className="overflow-y-auto w-full py-3 ">
  {filteredUsers.map((user) => (
    <button
      key={user._id}
      onClick={() => setSelectedUser(user)}
      className={`w-full p-3 flex items-center gap-4 lg:gap-3 
                  hover:bg-base-300 transition-colors text-left 
                  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
    >
      <div className="relative mx-0">
        <img
          src={user.profilePic || "/avatar.png"}
          alt={user.name}
          className="w-10 h-10 object-cover rounded-full"
        />
        {onlineUsers.includes(user._id) && (
          <span
            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                       rounded-full ring-2 ring-white"
          />
        )}
      </div>

      <div className="flex flex-col  w-full min-w-0">
        <div className="font-medium truncate">{user.fullName}</div>
        <div className="text-sm text-zinc-400 ">
          {onlineUsers.includes(user._id) ? "Online" : "Offline"}
        </div>
      </div>
    </button>
  ))}
</div>

    </aside>
  );
};
export default Sidebar;