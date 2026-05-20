import { test, expect, Browser, APIRequestContext, Page } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  createBoard,
  createStage,
  createTask,
  generateUniqueName,
  getTaskCard,
} from './utils/board-helpers';
import { addComment } from './utils/comment-helpers';
import {
  assignWordPressUserToTask,
  createQuickTaskerUser,
  createWPUser,
  disableQuickTaskerUser,
  navigateToQuickTaskersTab,
  navigateToUserDetailPage,
  uniqueLogin,
} from './utils/user-helpers';
import { loginToWordPressViaApi } from './utils/auth';
import { ADMIN_USERNAME } from './constants';
import { TIMEOUTS } from './utils/timeouts';
import {
  navigateToTasksApp,
  navigateToAssignedTasks,
  navigateToAssignableTasks,
  navigateToUserProfile,
  navigateToUserComments,
  navigateToNotifications,
  getTasksAppTaskCard,
  addTasksAppComment,
  getQuickTaskerUserPageUrl,
  openAnonymousPage,
  completeQuickTaskerSetup,
} from './utils/tasks-app-helpers';

// ── Shared setup helpers ──────────────────────────────────────────────────────

async function setupBoardWithTask(
  page: Page,
  boardName: string,
  stageName: string,
  taskName: string,
  extraStageNames: string[] = [],
): Promise<void> {
  await navigateToBoardsPage(page);
  await createBoard(page, boardName);
  await createStage(page, stageName);
  for (const name of extraStageNames) {
    await createStage(page, name);
  }
  await createTask(page, stageName, taskName);
}

async function openTaskDetail(page: Page, taskName: string): Promise<void> {
  await navigateToAssignedTasks(page);
  const card = getTasksAppTaskCard(page, taskName);
  await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  await card.click();
  await expect(page.getByText('Unassign from task')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

// ── Test suites ───────────────────────────────────────────────────────────────

test.describe('Tasks App – Homepage', () => {
  test('shows assigned and assignable task counts', async ({ page }) => {
    await navigateToTasksApp(page);
    await expect(page.getByText(/Assigned tasks:/)).toBeVisible();
    await expect(page.getByText(/Assignable tasks:/)).toBeVisible();
  });

  test('View assigned tasks button navigates to assigned tasks page', async ({ page }) => {
    await navigateToTasksApp(page);
    await page.getByText('View assigned tasks').click();
    await expect(page.getByText('Assigned tasks')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).toContain('#/user-tasks');
  });

  test('View assignable tasks button navigates to assignable tasks page', async ({ page }) => {
    await navigateToTasksApp(page);
    await page.getByText('View assignable tasks').click();
    await expect(page.getByText('Assignable tasks')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).toContain('#/assignable-tasks');
  });

  test('home icon navigates back to homepage from another page', async ({ page }) => {
    await navigateToAssignedTasks(page);
    // HomeIcon SVG has class wpqt-size-8
    await page.locator('svg[class*="wpqt-size-8"]').click();
    await expect(page.getByText(/Assigned tasks:/)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).not.toContain('#/user-tasks');
  });
});

test.describe('Tasks App – Assigned Tasks', () => {
  test('shows page structure with heading, description and filter', async ({ page }) => {
    await navigateToAssignedTasks(page);
    await expect(page.getByText('Assigned tasks')).toBeVisible();
    await expect(page.getByText('Tasks that are assigned to you')).toBeVisible();
    await expect(page.getByText('Filter tasks')).toBeVisible();
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test.describe('with an assigned task', () => {
    let boardName: string;
    let taskName: string;

    test.beforeEach(async ({ page }) => {
      boardName = generateUniqueName('TA-AT-Board');
      const stageName = generateUniqueName('TA-AT-Stage');
      taskName = generateUniqueName('TA-AT-Task');
      await setupBoardWithTask(page, boardName, stageName, taskName);
      await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME);
    });

    test('shows task card with task name, board name and completion status', async ({ page }) => {
      await navigateToAssignedTasks(page);
      const card = getTasksAppTaskCard(page, taskName);
      await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
      await expect(card.getByText(boardName)).toBeVisible();
      await expect(card.getByText('Task not completed')).toBeVisible();
    });

    test('filter by name shows matching task', async ({ page }) => {
      await navigateToAssignedTasks(page);
      await expect(getTasksAppTaskCard(page, taskName)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
      await page.getByRole('textbox').fill(taskName.slice(0, 8));
      await expect(getTasksAppTaskCard(page, taskName)).toBeVisible();
    });

    test('filter with no match shows no-match message', async ({ page }) => {
      await navigateToAssignedTasks(page);
      await expect(getTasksAppTaskCard(page, taskName)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
      await page.getByRole('textbox').fill('XXXTHISSHOULDNOTMATCHXXX');
      await expect(page.getByText('No tasks match your search filter')).toBeVisible();
      await expect(getTasksAppTaskCard(page, taskName)).not.toBeVisible();
    });

    test('clicking task card navigates to task detail page', async ({ page }) => {
      await navigateToAssignedTasks(page);
      const card = getTasksAppTaskCard(page, taskName);
      await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
      await card.click();
      await expect(page.getByText(taskName)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
      expect(page.url()).toContain('#/tasks/');
    });
  });
});

test.describe('Tasks App – Assignable Tasks', () => {
  test('shows empty state when no assignable tasks', async ({ page }) => {
    await navigateToAssignableTasks(page);
    await expect(page.getByText('No tasks assignable to you')).toBeVisible();
  });

  test('filter with no match shows no-match message', async ({ page }) => {
    await navigateToAssignableTasks(page);
    await page.getByRole('textbox').fill('XXXTHISSHOULDNOTMATCHXXX');
    await expect(page.getByText('No tasks match your search filter')).toBeVisible();
  });
});

test.describe('Tasks App – Task Detail', () => {
  let boardName: string;
  let stageName: string;
  let stage2Name: string;
  let taskName: string;

  test.beforeEach(async ({ page }) => {
    boardName = generateUniqueName('TA-TD-Board');
    stageName = generateUniqueName('TA-TD-Stage1');
    stage2Name = generateUniqueName('TA-TD-Stage2');
    taskName = generateUniqueName('TA-TD-Task');
    await setupBoardWithTask(page, boardName, stageName, taskName, [stage2Name]);
    await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME);
  });

  test('renders task detail with name, board, stage, action buttons and done toggle', async ({ page }) => {
    await openTaskDetail(page, taskName);
    await expect(page.getByText(taskName).first()).toBeVisible();
    await expect(page.getByText(boardName)).toBeVisible();
    await expect(page.getByText(`Task is on stage ${stageName}`)).toBeVisible();
    await expect(page.getByText('Unassign from task')).toBeVisible();
    await expect(page.getByText('Manage task comments')).toBeVisible();
    await expect(page.getByText('Change stage')).toBeVisible();
    await expect(page.getByText('Task is incomplete')).toBeVisible();
    await expect(page.getByText('Click to change')).toBeVisible();
  });

  test('unassigning navigates back to homepage', async ({ page }) => {
    await openTaskDetail(page, taskName);
    await page.getByText('Unassign from task').click();
    await expect(page.getByText(/Assigned tasks:/)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('can change task stage via stage selection modal', async ({ page }) => {
    await openTaskDetail(page, taskName);
    await page.getByText('Change stage').click();
    await expect(page.getByTestId('stage-selection-modal')).toBeVisible();
    await expect(page.getByText('Task stage selection')).toBeVisible();
    await page.getByText(stage2Name).click();
    await page.getByText('Save').click();
    await expect(page.getByTestId('stage-selection-modal')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText(`Task is on stage ${stage2Name}`)).toBeVisible();
  });

  test('can toggle task done status to completed and back to incomplete', async ({ page }) => {
    await openTaskDetail(page, taskName);
    await expect(page.getByText('Task is incomplete')).toBeVisible();
    // The incomplete CheckBadgeIcon has wpqt-text-gray-300, unique among SVG icons on this page
    await page.locator('svg.wpqt-text-gray-300').click();
    await expect(page.getByText('Task is completed')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    // The completed CheckBadgeIcon has wpqt-icon-green wpqt-size-9 (size-9 is unique vs action button icons at size-5)
    await page.locator('svg.wpqt-icon-green.wpqt-size-9').click();
    await expect(page.getByText('Task is incomplete')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('Manage task comments navigates to task comments page', async ({ page }) => {
    await openTaskDetail(page, taskName);
    await page.getByText('Manage task comments').click();
    await expect(page.getByText(`${taskName} comments`)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).toContain('/comments');
  });
});

test.describe('Tasks App – Task Comments', () => {
  let taskName: string;

  test.beforeEach(async ({ page }) => {
    const boardName = generateUniqueName('TA-TC-Board');
    const stageName = generateUniqueName('TA-TC-Stage');
    taskName = generateUniqueName('TA-TC-Task');
    await setupBoardWithTask(page, boardName, stageName, taskName);
    await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME);
  });

  async function openTaskComments(page: Page): Promise<void> {
    await openTaskDetail(page, taskName);
    await page.getByText('Manage task comments').click();
    await expect(page.getByText(`${taskName} comments`)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  }

  test('shows empty state with task name in heading', async ({ page }) => {
    await openTaskComments(page);
    await expect(page.getByText('No comments found')).toBeVisible();
    await expect(page.getByText('Comments related to the task')).toBeVisible();
  });

  test('can add a comment and it shows the author name', async ({ page }) => {
    await openTaskComments(page);
    await addTasksAppComment(page, 'Test task comment');
    await expect(page.getByText('Test task comment')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    // Use .first() since WP admin bar also contains the username
    await expect(page.getByText(ADMIN_USERNAME).first()).toBeVisible();
  });

  test('shows toast error when submitting empty comment', async ({ page }) => {
    await openTaskComments(page);
    await page.getByText('Add comment').click();
    await expect(page.getByText('Comment cant be empty')).toBeVisible();
  });
});

test.describe('Tasks App – User Profile', () => {
  test('shows user details with username', async ({ page }) => {
    await navigateToUserProfile(page);
    await expect(page.getByText('User details')).toBeVisible();
    // Use .first() since WP admin bar also contains the username
    await expect(page.getByText(ADMIN_USERNAME).first()).toBeVisible();
  });

  test('Manage user comments navigates to user comments page', async ({ page }) => {
    await navigateToUserProfile(page);
    await page.getByText('Manage user comments').click();
    await expect(page.getByText('User comments')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).toContain('#/user/comments');
  });
});

test.describe('Tasks App – User Comments', () => {
  test('shows page structure with heading and input', async ({ page }) => {
    await navigateToUserComments(page);
    await expect(page.getByText('User comments')).toBeVisible();
    await expect(page.getByText('Comments related to your user')).toBeVisible();
    await expect(page.getByPlaceholder('Write a comment...')).toBeVisible();
    await expect(page.getByText('Add comment')).toBeVisible();
  });

  test('can add a comment', async ({ page }) => {
    await navigateToUserComments(page);
    const uniqueComment = `UC-${generateUniqueName('comment')}`;
    await addTasksAppComment(page, uniqueComment);
    await expect(page.getByText(uniqueComment).first()).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('shows toast error when submitting empty comment', async ({ page }) => {
    await navigateToUserComments(page);
    await page.getByText('Add comment').click();
    await expect(page.getByText('Comment cant be empty')).toBeVisible();
  });
});

test.describe('Tasks App – Notifications', () => {
  async function assignerCreatesAndAssignsTask(
    browser: Browser,
    request: APIRequestContext,
    boardName: string,
    stageName: string,
    taskName: string,
    assigneeLogin: string,
    options: { commentText?: string } = {},
  ): Promise<void> {
    const assignerLogin = uniqueLogin('tasksAppNotifAssigner');
    await createWPUser(request, assignerLogin, `${assignerLogin}@example.com`, 'administrator');

    const assignerContext = await loginToWordPressViaApi(browser, assignerLogin);
    const assignerPage = await assignerContext.newPage();
    await navigateToBoardsPage(assignerPage);
    await assignerPage.getByTestId('pipeline-selection-dropdown').click();
    await assignerPage.getByText(boardName).click();
    await expect(assignerPage.getByText(stageName)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

    await createTask(assignerPage, stageName, taskName);
    await assignWordPressUserToTask(assignerPage, taskName, assigneeLogin);

    if (options.commentText) {
      const taskCard = getTaskCard(assignerPage, taskName);
      await taskCard.click();
      await assignerPage.getByRole('tab', { name: 'Comments', exact: true }).click();
      await assignerPage.getByRole('button', { name: 'Public' }).click();
      const taskModal = assignerPage.getByTestId('task-modal');
      await addComment(taskModal, options.commentText);
      await expect(taskModal.getByText(options.commentText)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    }

    await assignerContext.close();
  }

  test('shows empty state when the user has no notifications', async ({ page }) => {
    await navigateToNotifications(page);
    await expect(page.getByText(/You have \d+ unread notification/)).toBeVisible();
  });

  test('clicking a task-assignment notification marks it read and navigates to task detail', async ({
    page,
    browser,
    request,
  }) => {
    const boardName = generateUniqueName('TA-NotifBoard');
    const stageName = generateUniqueName('TA-NotifStage');
    const taskName = generateUniqueName('TA-NotifTask');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);

    await assignerCreatesAndAssignsTask(browser, request, boardName, stageName, taskName, ADMIN_USERNAME);

    await navigateToNotifications(page);

    const notificationCard = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await expect(notificationCard).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

    await notificationCard.click();

    // Assignment notifications route to the task detail page, not comments.
    await expect(page.getByText('Unassign from task')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).toMatch(/#\/tasks\/[^/]+$/);
  });

  test('clicking a comment-added notification navigates to task comments', async ({
    page,
    browser,
    request,
  }) => {
    const boardName = generateUniqueName('TA-NotifCommentBoard');
    const stageName = generateUniqueName('TA-NotifCommentStage');
    const taskName = generateUniqueName('TA-NotifCommentTask');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);

    await assignerCreatesAndAssignsTask(
      browser,
      request,
      boardName,
      stageName,
      taskName,
      ADMIN_USERNAME,
      { commentText: 'Hello from assigner' },
    );

    await navigateToNotifications(page);

    // Find the comment-added notification specifically (vs. the assignment notification for the same task).
    const commentCard = page
      .getByTestId('wpqt-card')
      .filter({ hasText: taskName })
      .filter({ hasText: 'public comment was added' });
    await expect(commentCard).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

    await commentCard.click();

    await expect(page.getByText(`${taskName} comments`)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).toMatch(/#\/tasks\/[^/]+\/comments$/);
  });
});

test.describe('Tasks App – QuickTasker User First Login Flow', () => {
  let userName: string;
  let userPageUrl: string;
  const password = 'qt-pass-123';

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('TA-FL-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
    await navigateToUserDetailPage(page, userName);
    userPageUrl = await getQuickTaskerUserPageUrl(page);
  });

  test('first visit walks through setup, login, and reaches homepage', async ({ browser }) => {
    const { context, page } = await openAnonymousPage(browser);
    await page.goto(userPageUrl);
    await expect(page.getByText(`Hello ${userName}`)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('Please complete the setup')).toBeVisible();
    await page.locator('input[type="password"]').nth(0).fill(password);
    await page.locator('input[type="password"]').nth(1).fill(password);
    await page.getByRole('button', { name: 'Setup' }).click();
    await expect(page.getByText('Please log in to continue')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await page.getByTestId('password-input').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(/Assigned tasks:/)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await context.close();
  });

  test('returning visit after setup goes straight to login page', async ({ browser }) => {
    const { context, page } = await openAnonymousPage(browser);
    await completeQuickTaskerSetup(page, userPageUrl, password);
    await page.goto(userPageUrl);
    await expect(page.getByText('Please log in to continue')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('Please complete the setup')).not.toBeVisible();
    await context.close();
  });

  test('disabled user sees not-active notification instead of setup or login', async ({ page, browser }) => {
    await navigateToQuickTaskersTab(page);
    await disableQuickTaskerUser(page, userName);

    const { context, page: anonPage } = await openAnonymousPage(browser);
    await anonPage.goto(userPageUrl);
    await expect(
      anonPage.getByRole('heading', { name: 'User is not active' }),
    ).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(
      anonPage.getByText('Your user is not active. Please contact site administrator.'),
    ).toBeVisible();
    await expect(anonPage.getByText('Please complete the setup')).not.toBeVisible();
    await context.close();
  });
});
