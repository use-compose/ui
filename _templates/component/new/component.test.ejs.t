---
to: src/components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.test.ts
---

import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import <%= h.changeCase.pascalCase(name) %> from './<%= h.changeCase.pascalCase(name) %>.vue'

describe('<%= h.changeCase.pascalCase(name) %>', () => {
  it('renders', () => {
    const <%= name.toLowerCase() %> = render(<%= h.changeCase.pascalCase(name) %>, {
      // slots: {
      //   default: 'Default content for <%= h.changeCase.pascalCase(name) %> component',
      // },
    })

    // expect(<%= name.toLowerCase() %>.html()).toContain('Default content for <%= h.changeCase.pascalCase(name) %> component')
    expect(<%= name.toLowerCase() %>.html()).toMatchSnapshot()
  })
})
