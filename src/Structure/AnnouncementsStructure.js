export const AnnouncementsStructure = [
  [
    {
      type: "countdownBar",
      title: "Bar Announcement",
      message: "Get 10% off your first order!",
      isActive: false,
      associatedDiscountId: null,
      data: {},
      fields: [
        {
          name: "title",
          placeholder: "Title",
          input: "text",
        },
        {
          name: "selectedcollections",
          placeholder: "Select Collections",
          input: "multiDropdown",
          options: "collections",
        },
      ],
      config: {
        position: "top", // "top" or "bottom"
        backgroundColor: "#000000",
        textColor: "#ffffff",
        fontSize: "14px",
        closable: true, // "everyVisit" | "firstVisitOnly" | "reload"
        delay: 0,
        repeat: "daily", // "none" | "daily" | "weekly"
      },
    },
    {
      type: "discountPopup",
      title: "Popup Announcement",
      message: "Subscribe to our newsletter and get 15% off!",
      isActive: false,
      associatedDiscountId: null,
      config: {
        position: "center", // "center" | "bottom-right"
        width: "400px",
        height: "300px",
        closable: true,
        backgroundImage: "",
        delay: 3000, // show after 3s
        showOn: "everyVisit", // "scroll" | "firstVisitOnly" | "everyVisit"
        autoCloseAfter: 0, // 0 means never auto-close
      },
    },
  ],
];
