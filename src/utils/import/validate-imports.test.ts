import { validateAsanaImport, validateTrelloImport } from "./validate-import";

describe("validateTrelloImport", () => {
  it("should return error if import data is not an object", () => {
    expect(validateTrelloImport(null)).toBe(
      "Import data is missing or not an object",
    );
    expect(validateTrelloImport(undefined)).toBe(
      "Import data is missing or not an object",
    );
    expect(validateTrelloImport("string")).toBe(
      "Import data is missing or not an object",
    );
    expect(validateTrelloImport(123)).toBe(
      "Import data is missing or not an object",
    );
  });

  it("should return error if required top-level properties are missing", () => {
    expect(validateTrelloImport({})).toBe("Missing board name");
    expect(validateTrelloImport({ name: "Board" })).toBe("Missing cards array");
    expect(validateTrelloImport({ name: "Board", cards: [] })).toBe(
      "Missing lists array",
    );
    expect(validateTrelloImport({ name: "Board", cards: [], lists: [] })).toBe(
      "Missing labels array",
    );
  });

  it("should return error if cards, lists or labels are not arrays", () => {
    expect(
      validateTrelloImport({
        name: "Board",
        cards: "not an array",
        lists: [],
        labels: [],
      }),
    ).toBe("Cards property is not an array");

    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: "not an array",
        labels: [],
      }),
    ).toBe("Lists property is not an array");

    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: [],
        labels: "not an array",
      }),
    ).toBe("Labels property is not an array");
  });

  it("should return error if all lists are closed", () => {
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: [{ id: "list1", name: "List 1", closed: true }],
        labels: [],
      }),
    ).toBe("All lists are closed, at least one open list is required");
  });

  it("should return error if a card is missing required properties", () => {
    const card = { name: "Card 1", idList: "list1", labels: [] };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [card],
        lists: [{ id: "list1", name: "List 1", closed: false }],
        labels: [],
      }),
    ).toContain("Card missing ID");

    const card2 = { id: "card1", idList: "list1", labels: [] };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [card2],
        lists: [{ id: "list1", name: "List 1", closed: false }],
        labels: [],
      }),
    ).toBe("Card missing name: card1");

    const card3 = { id: "card1", name: "Card 1", labels: [] };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [card3],
        lists: [{ id: "list1", name: "List 1", closed: false }],
        labels: [],
      }),
    ).toBe("Card missing list ID: card1");

    const card4 = {
      id: "card1",
      name: "Card 1",
      idList: "list1",
      labels: "not an array",
    };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [card4],
        lists: [{ id: "list1", name: "List 1", closed: false }],
        labels: [],
      }),
    ).toBe("Card labels is not an array: card1");
  });

  it("should return error if a list is missing required properties", () => {
    const list = { name: "List 1", closed: false };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: [list],
        labels: [],
      }),
    ).toContain("List missing ID");

    const list2 = { id: "list1", closed: false };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: [list2],
        labels: [],
      }),
    ).toBe("List missing name: list1");

    const list3 = { id: "list1", name: "List 1" };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: [list3],
        labels: [],
      }),
    ).toBe("List closed status is not boolean: list1");
  });

  it("should return error if a label is missing required properties", () => {
    const label = { name: "Label 1", color: "green" };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: [{ id: "list1", name: "List 1", closed: false }],
        labels: [label],
      }),
    ).toContain("Label missing ID");

    const label2 = { id: "label1", color: "green" };
    // Empty string is a valid name for a label
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: [{ id: "list1", name: "List 1", closed: false }],
        labels: [{ ...label2, name: "" }],
      }),
    ).toBe(true);

    const label3 = { id: "label1", name: "Label 1" };
    expect(
      validateTrelloImport({
        name: "Board",
        cards: [],
        lists: [{ id: "list1", name: "List 1", closed: false }],
        labels: [label3],
      }),
    ).toBe("Label missing color: label1");
  });

  it("should return true for valid Trello import data", () => {
    const validData = {
      name: "Board",
      cards: [
        {
          id: "card1",
          name: "Card 1",
          idList: "list1",
          labels: [],
        },
      ],
      lists: [
        {
          id: "list1",
          name: "List 1",
          closed: false,
        },
      ],
      labels: [
        {
          id: "label1",
          name: "Label 1",
          color: "green",
        },
      ],
    };
    expect(validateTrelloImport(validData)).toBe(true);
  });
});

describe("validateAsanaImport", () => {
  it("should return error if import data is not an object", () => {
    expect(validateAsanaImport(null)).toBe(
      "Import data is missing or not an object",
    );
    expect(validateAsanaImport(undefined)).toBe(
      "Import data is missing or not an object",
    );
    expect(validateAsanaImport("string")).toBe(
      "Import data is missing or not an object",
    );
    expect(validateAsanaImport(123)).toBe(
      "Import data is missing or not an object",
    );
  });

  it("should return error if required top-level structure is missing", () => {
    expect(validateAsanaImport({})).toBe("Missing data array");
    expect(validateAsanaImport({ data: "not an array" })).toBe(
      "Data property is not an array",
    );
    expect(validateAsanaImport({ data: [] })).toBe("Data array is empty");
  });

  it("should return error if a task is missing required properties", () => {
    const task = {
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task] })).toContain("Task missing GID");

    const task2 = {
      gid: "task1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task2] })).toBe(
      "Task missing name: task1",
    );

    const task3 = {
      gid: "task1",
      name: "Task 1",
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task3] })).toBe(
      "Task completed status is not boolean: task1",
    );
  });

  it("should return error if a task has invalid arrays", () => {
    const task = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: "not an array",
      memberships: [],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task] })).toBe(
      "Task projects is not an array: task1",
    );

    const task2 = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [],
      memberships: [],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task2] })).toBe(
      "Task has no projects: task1",
    );

    const task3 = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: "not an array",
      tags: [],
    };
    expect(validateAsanaImport({ data: [task3] })).toBe(
      "Task memberships is not an array: task1",
    );

    const task4 = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [],
      tags: "not an array",
    };
    expect(validateAsanaImport({ data: [task4] })).toBe(
      "Task tags is not an array: task1",
    );
  });

  it("should return error if a project is missing required properties", () => {
    const task = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ name: "Project 1" }],
      memberships: [],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task] })).toBe(
      "Project missing GID in task task1",
    );

    const task2 = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1" }],
      memberships: [],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task2] })).toBe(
      "Project missing name in task task1",
    );
  });

  it("should return error if a membership is missing required properties", () => {
    const task = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [{ section: { gid: "sect1", name: "Section 1" } }],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task] })).toBe(
      "Membership missing project in task task1",
    );

    const task2 = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [{ project: { gid: "proj1", name: "Project 1" } }],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task2] })).toBe(
      "Membership missing section in task task1",
    );

    const task3 = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [
        {
          project: { name: "Project 1" },
          section: { gid: "sect1", name: "Section 1" },
        },
      ],
      tags: [],
    };
    expect(validateAsanaImport({ data: [task3] })).toBe(
      "Membership project missing GID in task task1",
    );
  });

  it("should return error if a tag is missing required properties", () => {
    const task = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [],
      tags: [{ name: "Tag 1" }],
    };
    expect(validateAsanaImport({ data: [task] })).toBe(
      "Tag missing GID in task task1",
    );

    const task2 = {
      gid: "task1",
      name: "Task 1",
      completed: false,
      projects: [{ gid: "proj1", name: "Project 1" }],
      memberships: [],
      tags: [{ gid: "tag1" }],
    };
    expect(validateAsanaImport({ data: [task2] })).toBe(
      "Tag missing name in task task1",
    );
  });

  it("should return true for valid Asana import data", () => {
    const validData = {
      data: [
        {
          gid: "task1",
          name: "Task 1",
          completed: false,
          projects: [{ gid: "proj1", name: "Project 1" }],
          memberships: [
            {
              project: { gid: "proj1", name: "Project 1" },
              section: { gid: "sect1", name: "Section 1" },
            },
          ],
          tags: [{ gid: "tag1", name: "Tag 1" }],
        },
      ],
    };
    expect(validateAsanaImport(validData)).toBe(true);
  });
});
