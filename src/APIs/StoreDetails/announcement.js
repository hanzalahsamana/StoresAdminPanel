"use client";

import axios from "axios";
import Base_URL from "../../../config";
import { setStoreDetail } from "@/Redux/StoreDetail/StoreDetail.slice";

// ADD ANNOUNCEMENT
export const addAnnouncement = async (announcement, token, dispatch) => {
  try {
    const response = await axios.post(
      `${Base_URL}/addAnnouncement`,
      { announcement },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("addAnnouncement", response.data);

    dispatch(setStoreDetail({ announcements: response.data?.data }));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE ANNOUNCEMENT
export const deleteAnnouncement = async (announcementId, token, dispatch) => {
  try {
    const response = await axios.delete(
      `${Base_URL}/deleteAnnouncement?announcementId=${announcementId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("deleteAnnouncement", response.data);

    dispatch(setStoreDetail({ announcements: response.data?.data }));
    return response.data;
  } catch (error) {
    throw error;
  }
};
