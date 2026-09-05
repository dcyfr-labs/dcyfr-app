import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'https://dcyfr.app';

test.describe('dcyfr.app smoke tests', () => {
  test.describe('desktop (1280×800)', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test('homepage loads and renders hero', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page).toHaveTitle(/DCYFR Templates/);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('link', { name: /Browse Templates/i })).toBeVisible();
    });

    test('template grid renders at least one card', async ({ page }) => {
      await page.goto(BASE_URL);
      const cards = page.locator('section#templates article, section#templates [data-testid="template-card"]');
      // Fallback: look for cards by heading role within templates section
      const headings = page.locator('section#templates h2');
      const count = await headings.count();
      expect(count).toBeGreaterThan(0);
    });

    test('filter chips are interactive', async ({ page }) => {
      await page.goto(BASE_URL);
      // Scoped to the templates section on purpose. Page-wide,
      // `getByRole('button').first()` resolves to the v2 header's theme toggle,
      // and this test used to assert nothing after the click — so it passed
      // against whichever control happened to come first in the DOM.
      const filters = page.locator('section#templates');
      const allFrameworks = filters.getByRole('button', { name: 'All', exact: true }).first();
      const web = filters.getByRole('button', { name: 'Web', exact: true });

      await expect(allFrameworks).toHaveClass(/bg-primary/);
      await expect(web).toBeVisible();

      await web.click();

      // The click moves the active state off the default chip onto this one.
      await expect(web).toHaveClass(/bg-primary/);
      await expect(allFrameworks).not.toHaveClass(/bg-primary/);
    });

    test('template detail page loads', async ({ page }) => {
      await page.goto(`${BASE_URL}/templates/next-ai-starter`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('no console errors on homepage', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.goto(BASE_URL);
      expect(errors).toHaveLength(0);
    });
  });

  test.describe('tablet (768×1024)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('homepage renders at tablet width', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  });

  test.describe('mobile (390×844)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('homepage renders at mobile width', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('link', { name: /Browse Templates/i })).toBeVisible();
    });

    test('no horizontal scroll on mobile', async ({ page }) => {
      await page.goto(BASE_URL);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // 1px tolerance
    });
  });
});
