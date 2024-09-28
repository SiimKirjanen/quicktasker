import { toast } from "react-toastify";
import {
  changeUserStatusRequest,
  createUserRequest,
  deleteUserRequest,
  editUserRequest,
  resetUserPasswordRequest,
} from "../../api/api";
import { ServerUser, User } from "../../types/user";

function useUserActions() {
  const createUser = async (
    userName: string,
    userDescription: string,
    callback?: (userData: ServerUser) => void,
  ) => {
    try {
      const response = await createUserRequest(userName, userDescription);
      if (callback) callback(response.data);
      toast.success("User created successfully");
    } catch (error) {
      console.error(error);
      toast.error("User creation failed. Please try again");
    }
  };

  const editUser = async (
    user: User,
    callback?: (userData: ServerUser) => void,
  ) => {
    try {
      const response = await editUserRequest(user);
      if (callback) callback(response.data);
      toast.success("User edited successfully");
    } catch (error) {
      console.error(error);
      toast.error("User edit failed. Please try again");
    }
  };

  const changeUserStatus = async (
    userId: string,
    status: boolean,
    callback?: (userData: ServerUser) => void,
  ) => {
    try {
      const response = await changeUserStatusRequest(userId, status);
      if (callback) callback(response.data);
      toast.success("User status changed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to change user status. Please try again");
    }
  };

  const deleteUser = async (
    userId: string,
    callback?: (userId: string) => void,
  ) => {
    try {
      await deleteUserRequest(userId);
      if (callback) callback(userId);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user. Please try again");
    }
  };

  const resetUserPassword = async (
    userId: string,
    callback?: (userId: string) => void,
  ) => {
    try {
      await resetUserPasswordRequest(userId);
      if (callback) callback(userId);
      toast.success("User password reset successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset user password. Please try again");
    }
  };

  return {
    createUser,
    editUser,
    changeUserStatus,
    deleteUser,
    resetUserPassword,
  };
}

export { useUserActions };
