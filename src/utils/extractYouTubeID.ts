export function extractYouTubeID(input: string) {
  const idRegex = /^[\w\-]+$/;
  const urlRegex =
    /^(?:(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/watch\?v=)|(?:https?:\/\/)?(?:www\.|m\.)?youtu\.be\/)([\w\-]+)/;

  if (input.match(idRegex)) {
    return input;
  }

  const match = input.match(urlRegex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}
