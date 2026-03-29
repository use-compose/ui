---
to: src/components/<%= h.changeCase.pascalCase(name) %>/index.ts
sh: mkdir -p src/components/<%= h.changeCase.pascalCase(name) %>/
---

export { default as <%= h.changeCase.pascalCase(name) %> } from './<%= h.changeCase.pascalCase(name) %>.vue'