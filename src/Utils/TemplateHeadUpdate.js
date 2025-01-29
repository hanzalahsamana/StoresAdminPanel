export const TemplateHeadUpdate = ({ title, favicon, description }) => {
  if (title) {
    document.title = title;
  }

  if (favicon) {
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = favicon;
  }

  if (description) {
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }

  // Open Graph Tags
  const updateMetaTag = (property, content) => {
    let metaTag = document.querySelector(`meta[property='${property}']`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("property", property);
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  };

  if (title) {
    updateMetaTag("og:title", title);
  }
  if (description) {
    updateMetaTag("og:description", description);
  }
  if (favicon) {
    updateMetaTag("og:image", favicon);
  }
};
