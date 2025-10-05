export function updatePageMetadata(params: {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}) {
  // Update title
  document.title = params.title;

  // Helper function to update or create meta tag
  const updateMetaTag = (
    selector: string,
    content: string,
    property?: boolean
  ) => {
    const attribute = property ? "property" : "name";
    let element = document.querySelector(
      `meta[${attribute}="${selector}"]`
    ) as HTMLMetaElement;

    if (!element) {
      element = document.createElement("meta");
      if (property) {
        element.setAttribute("property", selector);
      } else {
        element.setAttribute("name", selector);
      }
      document.head.appendChild(element);
    }

    element.content = content;
  };

  // Update description
  updateMetaTag("description", params.description);

  // Update Open Graph tags
  if (params.ogTitle || params.title) {
    updateMetaTag("og:title", params.ogTitle || params.title, true);
  }

  if (params.ogDescription || params.description) {
    updateMetaTag(
      "og:description",
      params.ogDescription || params.description,
      true
    );
  }

  if (params.ogImage) {
    updateMetaTag("og:image", params.ogImage, true);
  }

  if (params.ogUrl) {
    updateMetaTag("og:url", params.ogUrl, true);
  }

  // Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", params.ogTitle || params.title);
  updateMetaTag(
    "twitter:description",
    params.ogDescription || params.description
  );

  if (params.ogImage) {
    updateMetaTag("twitter:image", params.ogImage);
  }
}
