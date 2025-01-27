import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import Message from "../../../backend/src/models/message.model.js";
import { useAuthStore } from "./useAuthStore.js";



export const useChatStore = create((set,get) => ({

    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendingImage: false,

    getUsers: async () => {
        set({isUsersLoading: true});
        const {users} = get();
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
            console.log(users);
        }catch (error) {
            toast.error(error.response.data.message)
        }finally {
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages: res.data});
            console.log(res.data);
        }catch (error) {
            toast.error(error.response.data.message);
        }finally {
            set({isMessagesLoading: false});
        }
    },

    //todo : optimize this one later
    setSelectedUser: async (selectedUser) => set({selectedUser : selectedUser}),
 
    sendMessage: async (messageData) => {
        
        
        const {selectedUser , messages} = get();
        set({isSendingImage: true});
        
        try {
            
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({messages:[...messages ,  res.data]});
            
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSendingImage: false});
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
          const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;
    
          set({
            messages: [...get().messages, newMessage],
          });
        });
      },
    
      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
      },

    
}))     