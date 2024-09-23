import { environment } from "../environment";

export function idGenerator() {
  const projectName = environment.PROJECT_NAME;
  return `${projectName}-${randomId()}`;
}

function randomId(): string {
  const now = Date.now().toString(36);

  const nowRelevant = now.slice(-7);
  const randomSalt = Math.random().toString(36).substr(2, 9);
  return `${nowRelevant}-${randomSalt}`;
}
