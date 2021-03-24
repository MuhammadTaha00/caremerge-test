//this function assumes that the given tag has a closing tag.
module.exports = (html, tag) => {
  if (!html) return "";
  if (!tag) throw new Error("Invalid tag: tag must be a non empty string");
  const htmlOpeningTag = `<${tag}>`;
  const htmlClosingTag = `</${tag}>`;
  const contentStartIndex =
    html.indexOf(htmlOpeningTag) + htmlOpeningTag.length;
  const contentEndIndex = html.indexOf(htmlClosingTag);
  return html.substring(contentStartIndex, contentEndIndex);
};
