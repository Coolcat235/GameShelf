import { pathToFileURL } from 'node:url';

export function getStarterMessage(name = 'friend') {
  return `Hello, ${name}! Your Node starter app is running.`;
}

if (process.argv[1]) {
  const currentFile = pathToFileURL(process.argv[1]).href;
  if (import.meta.url === currentFile) {
    console.log(getStarterMessage('developer'));
  }
}
