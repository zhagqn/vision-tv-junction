export function getQueryString(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function getClientRect(el) {
  let rect = { x: el.offsetLeft, y: el.offsetTop };
  let parent = el.offsetParent;
  while (parent) {
    rect.x += parent.offsetLeft;
    rect.y += parent.offsetTop;
    parent = parent.offsetParent;
  }
  let parentElement = el.parentElement;
  while (parentElement) {
    rect.x -= parentElement.scrollLeft;
    rect.y -= parentElement.scrollTop;
    parentElement = parentElement.parentElement;
  }
  rect.width = el.offsetWidth;
  rect.height = el.offsetHeight;
  return rect;
}