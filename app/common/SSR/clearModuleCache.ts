
export function clearModuleCache(module: string) {
  if (module && module.includes('node_modules')) {
    return;
  }
  const mod = require.cache[require.resolve(module)];
  if (mod) {
    delete require.cache[require.resolve(module)];
    mod.children.forEach(((m: { id: string; }) => {
      clearModuleCache(require.resolve(m.id));
    }));
  }
}