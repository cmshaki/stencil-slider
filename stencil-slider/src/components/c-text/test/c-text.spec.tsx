import { newSpecPage } from '@stencil/core/testing';
import { CText } from '../c-text';

describe('c-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CText],
      html: `<c-text></c-text>`,
    });
    expect(page.root).toEqualHtml(`
      <c-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </c-text>
    `);
  });
});
