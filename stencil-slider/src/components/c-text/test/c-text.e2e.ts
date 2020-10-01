import { newE2EPage } from '@stencil/core/testing';

describe('c-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-text></c-text>');

    const element = await page.find('c-text');
    expect(element).toHaveClass('hydrated');
  });
});
