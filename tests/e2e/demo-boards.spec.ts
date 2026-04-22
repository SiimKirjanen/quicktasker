import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { getTasksInStage } from './utils/board-helpers';

test.describe('QuickTasker Demo Boards', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('demo board exists after plugin installation', async ({ page }) => {
    // Verify demo board header is visible
    await expect(page.getByText('Demo board').first()).toBeVisible();
    
    // Verify board description
    await expect(page.getByText('This is a demo food store')).toBeVisible();
  });

  test('demo board contains all pipeline stages', async ({ page }) => {
    // Verify all three pipeline stages exist
    await expect(page.getByText('Order Received')).toBeVisible();
    await expect(page.getByText('Preparing Order')).toBeVisible();
    await expect(page.getByText('Out for Delivery')).toBeVisible();
    await expect(page.getByText('Delivered')).toBeVisible();
  });

  test('demo board contains demo tasks', async ({ page }) => {
    // Verify Order Received stage tasks
    await expect(page.getByRole('button', { name: 'Order #1001 Large pizza and a soda.' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Order #1002 Burger and fries.' })).toBeVisible();
    
    // Verify Preparing Order stage tasks
    await expect(page.getByRole('button', { name: 'Order #1003 Tacos and nachos.' })).toBeVisible();
    
    // Verify Out for Delivery stage tasks
    await expect(page.getByRole('button', { name: 'Order #1004 Steak dinner with' })).toBeVisible();
  });

  test('tasks are placed in correct stages', async ({ page }) => {
    // Verify "Order Received" stage contains correct tasks
    const orderReceivedTasks = await getTasksInStage(page, 'Order Received');
    expect(orderReceivedTasks).toContain('Order #1001');
    expect(orderReceivedTasks).toContain('Order #1002');
    expect(orderReceivedTasks).toHaveLength(2);
    
    // Verify "Preparing Order" stage contains correct tasks
    const preparingOrderTasks = await getTasksInStage(page, 'Preparing Order');
    expect(preparingOrderTasks).toContain('Order #1003');
    expect(preparingOrderTasks).toHaveLength(1);
    
    // Verify "Out for Delivery" stage contains correct tasks
    const outForDeliveryTasks = await getTasksInStage(page, 'Out for Delivery');
    expect(outForDeliveryTasks).toContain('Order #1004');
    expect(outForDeliveryTasks).toHaveLength(1);
    
    // Verify "Delivered" stage is empty
    const deliveredTasks = await getTasksInStage(page, 'Delivered');
    expect(deliveredTasks).toHaveLength(0);
  });
});
