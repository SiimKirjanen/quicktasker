import {
  expect,
  test,
  type Browser,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import { ADMIN_USERNAME } from "./constants";
import { loginToWordPress } from "./utils/auth";
import {
  createBoard,
  createStage,
  createTask,
  generateUniqueDescription,
  generateUniqueName,
  getTaskCard,
} from "./utils/board-helpers";
import { addComment } from "./utils/comment-helpers";
import {
  navigateToBoardsPage,
  navigateToMyTasksPage,
} from "./utils/navigation";
import {
  assignWordPressUserToTask,
  closeUserAssignmentDropdown,
  createWPUser,
  grantWPUserCaps,
  uniqueLogin,
} from "./utils/user-helpers";

async function loginAsWPUser(
  browser: Browser,
  login: string,
): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext();
  const page = await context.newPage();
  await loginToWordPress(page, login, "password123");
  return { context, page };
}

test.describe("My Tasks page", () => {
  test("shows tasks created by and assigned to the current user", async ({
    page,
  }) => {
    const stageName = generateUniqueName("MT-Stage");
    const createdTaskName = generateUniqueName("MT-Created");
    const assignedTaskName = generateUniqueName("MT-Assigned");

    await navigateToBoardsPage(page);
    await createBoard(
      page,
      generateUniqueName("MT-Board"),
      generateUniqueDescription("Board for My Tasks e2e"),
    );
    await createStage(page, stageName);

    await createTask(page, stageName, createdTaskName);

    await createTask(page, stageName, assignedTaskName);
    await assignWordPressUserToTask(
      page,
      assignedTaskName,
      ADMIN_USERNAME,
      false,
    );
    await closeUserAssignmentDropdown(page, assignedTaskName);

    await navigateToMyTasksPage(page);

    const createdSection = page
      .locator("div.wpqt-mt-6")
      .filter({ has: page.getByRole("heading", { name: "Tasks I created" }) });
    const assignedSection = page.locator("div.wpqt-mt-6").filter({
      has: page.getByRole("heading", { name: "Tasks assigned to me" }),
    });

    await expect(createdSection.getByText(createdTaskName)).toBeVisible();
    await expect(createdSection.getByText(assignedTaskName)).toBeVisible();
    await expect(assignedSection.getByText(assignedTaskName)).toBeVisible();
  });

  test.describe("comments modal", () => {
    test("opens from the task card and shows the private/public toggle for admins", async ({
      page,
    }) => {
      const stageName = generateUniqueName("MTC-Stage");
      const taskName = generateUniqueName("MTC-Task");

      await navigateToBoardsPage(page);
      await createBoard(
        page,
        generateUniqueName("MTC-Board"),
        generateUniqueDescription("Board for My Tasks comments"),
      );
      await createStage(page, stageName);
      await createTask(page, stageName, taskName);

      await navigateToMyTasksPage(page);

      const card = page
        .getByTestId("wpqt-card")
        .filter({ hasText: taskName })
        .first();
      await card.getByTestId("task-comments-button").click();

      const modal = page.getByTestId("task-comments-modal");
      await expect(modal).toBeVisible();
      await expect(modal.getByText("Task comments")).toBeVisible();
      await expect(
        modal.getByRole("button", { name: "Private" }),
      ).toBeVisible();
      await expect(modal.getByRole("button", { name: "Public" })).toBeVisible();
    });

    test("admin can add a private comment from the my-tasks card", async ({
      page,
    }) => {
      const stageName = generateUniqueName("MTC-Stage");
      const taskName = generateUniqueName("MTC-Task");
      const commentText = `private-${Date.now()}`;

      await navigateToBoardsPage(page);
      await createBoard(
        page,
        generateUniqueName("MTC-Board"),
        generateUniqueDescription("Private comment via my-tasks"),
      );
      await createStage(page, stageName);
      await createTask(page, stageName, taskName);

      await navigateToMyTasksPage(page);

      const card = page
        .getByTestId("wpqt-card")
        .filter({ hasText: taskName })
        .first();
      await card.getByTestId("task-comments-button").click();

      const modal = page.getByTestId("task-comments-modal");
      await expect(modal).toBeVisible();
      await modal.getByRole("button", { name: "Private" }).click();
      await addComment(modal, commentText);

      await expect(modal.getByText(commentText)).toBeVisible();
    });

    test("admin can add a public comment from the my-tasks card", async ({
      page,
    }) => {
      const stageName = generateUniqueName("MTC-Stage");
      const taskName = generateUniqueName("MTC-Task");
      const commentText = `public-${Date.now()}`;

      await navigateToBoardsPage(page);
      await createBoard(
        page,
        generateUniqueName("MTC-Board"),
        generateUniqueDescription("Public comment via my-tasks"),
      );
      await createStage(page, stageName);
      await createTask(page, stageName, taskName);

      await navigateToMyTasksPage(page);

      const card = page
        .getByTestId("wpqt-card")
        .filter({ hasText: taskName })
        .first();
      await card.getByTestId("task-comments-button").click();

      const modal = page.getByTestId("task-comments-modal");
      await expect(modal).toBeVisible();
      await modal.getByRole("button", { name: "Public" }).click();
      await addComment(modal, commentText);

      await expect(modal.getByText(commentText)).toBeVisible();
    });

    test("my-tasks-only user sees only public comments and no visibility toggle", async ({
      browser,
      request,
    }) => {
      const userLogin = uniqueLogin("wpmytasks");
      const userId = await createWPUser(
        request,
        userLogin,
        `${userLogin}@example.com`,
        "editor",
      );
      // Grant full admin caps + view-my-tasks initially so the user can create
      // a board, stage, task and seed both a private and a public comment as
      // themselves (so the task ends up in their "Tasks I created" list).
      // manage_settings is required for the "Add new board" / "Add stage" UI.
      await grantWPUserCaps(request, userId, [
        "quicktasker_admin_role",
        "quicktasker_admin_role_manage_settings",
        "quicktasker_view_my_tasks",
      ]);

      const { context, page } = await loginAsWPUser(browser, userLogin);

      const stageName = generateUniqueName("MTC-Stage");
      const taskName = generateUniqueName("MTC-Task");
      const privateText = `private-${Date.now()}`;
      const publicText = `public-${Date.now()}`;

      await navigateToBoardsPage(page);
      await createBoard(
        page,
        generateUniqueName("MTC-Board"),
        generateUniqueDescription("Board for my-tasks-only comments test"),
      );
      await createStage(page, stageName);
      await createTask(page, stageName, taskName);

      // Seed comments from the board task modal while the user still has admin caps.
      const boardTaskCard = getTaskCard(page, taskName);
      await boardTaskCard.click();
      const boardTaskModal = page.getByTestId("task-modal");
      await boardTaskModal
        .getByRole("tab", { name: "Comments", exact: true })
        .click();
      await boardTaskModal.getByRole("button", { name: "Private" }).click();
      await addComment(boardTaskModal, privateText);
      await expect(boardTaskModal.getByText(privateText)).toBeVisible();
      await boardTaskModal.getByRole("button", { name: "Public" }).click();
      await addComment(boardTaskModal, publicText);
      await expect(boardTaskModal.getByText(publicText)).toBeVisible();
      await page.getByTestId("wpqt-modal-close-button").click();

      // Strip admin role; user is now MyTasks-only.
      await grantWPUserCaps(request, userId, ["quicktasker_view_my_tasks"]);

      await navigateToMyTasksPage(page);

      const card = page
        .getByTestId("wpqt-card")
        .filter({ hasText: taskName })
        .first();
      await card.getByTestId("task-comments-button").click();

      const modal = page.getByTestId("task-comments-modal");
      await expect(modal).toBeVisible();
      await expect(modal.getByText("Task comments")).toBeVisible();

      // No toggle for non-admins.
      await expect(
        modal.getByRole("button", { name: "Private" }),
      ).not.toBeVisible();
      await expect(
        modal.getByRole("button", { name: "Public" }),
      ).not.toBeVisible();

      // Public comment is visible, private comment is hidden.
      await expect(modal.getByText(publicText)).toBeVisible();
      await expect(modal.getByText(privateText)).not.toBeVisible();

      await context.close();
    });

    test("private comments added in the modal stay scoped to that toggle", async ({
      page,
    }) => {
      const stageName = generateUniqueName("MTC-Stage");
      const taskName = generateUniqueName("MTC-Task");
      const privateText = `private-only-${Date.now()}`;

      await navigateToBoardsPage(page);
      await createBoard(
        page,
        generateUniqueName("MTC-Board"),
        generateUniqueDescription("Scoped comments"),
      );
      await createStage(page, stageName);
      await createTask(page, stageName, taskName);

      await navigateToMyTasksPage(page);

      const card = page
        .getByTestId("wpqt-card")
        .filter({ hasText: taskName })
        .first();
      await card.getByTestId("task-comments-button").click();

      const modal = page.getByTestId("task-comments-modal");
      await modal.getByRole("button", { name: "Private" }).click();
      await addComment(modal, privateText);
      await expect(modal.getByText(privateText)).toBeVisible();

      await modal.getByRole("button", { name: "Public" }).click();
      await expect(modal.getByText(privateText)).not.toBeVisible();
    });
  });
});
