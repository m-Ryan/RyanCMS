export function comparePath(path: string, mathPath: string) {
  const paths = path.split('/');
  const mathPaths = mathPath.split('/');

  if (paths.length !== mathPaths.length) {
    if (paths.length > mathPaths.length) {
      return false;
    }
    if (mathPaths[mathPaths.length - 1] !== '*') {
      return false;
    }
  } else {
    for (let i = 0; i < paths.length; i++) {
      if (paths[i] !== mathPaths[i] && mathPaths[i] !== ':id') {
        return false;
      }
    }
  }

  return true;
}
