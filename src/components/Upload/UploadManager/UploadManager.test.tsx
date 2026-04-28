import { render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { SET_UPLOADS } from "../../../constants";
import { UploadContext } from "../../../providers/UploadContextProvider";
import { Upload, UploadEntityType } from "../../../types/upload";
import { UploadManager } from "./UploadManager";

const mockGetUplaods = jest.fn();

jest.mock("../../../hooks/actions/useUploadActions", () => ({
  useUploadActions: () => ({
    getUplaods: mockGetUplaods,
  }),
}));

jest.mock("../../Loading/Loading", () => ({
  Loading: () => <div data-testid="loading" />,
}));

jest.mock("../Uploader/Uploader", () => ({
  Uploader: () => <div data-testid="uploader" />,
}));

jest.mock("../UploadedItem/UploadedItem", () => ({
  UploadedItem: ({ upload }: { upload: { id: string; file_name: string } }) => (
    <div data-testid="uploaded-item">{upload.file_name}</div>
  ),
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn() },
}));

const baseUpload = {
  id: "u1",
  file_name: "file.pdf",
  file_type: "application/pdf",
  upload_uuid: "uuid-1",
  entity_id: "task1",
  entity_type: UploadEntityType.TASK,
  created_at: "",
  uploader_id: "1",
  uploader_name: "User",
};

function makeUploadContext(uploads: Upload[] = [], dispatch = jest.fn()) {
  return {
    state: { uploads },
    uploadDispatch: dispatch,
  };
}

afterEach(() => jest.clearAllMocks());

describe("UploadManager", () => {
  it("shows loading state before fetch completes", () => {
    mockGetUplaods.mockReturnValue(new Promise(() => {}));
    render(
      <UploadContext.Provider value={makeUploadContext()}>
        <UploadManager entityId="task1" entityType={UploadEntityType.TASK} />
      </UploadContext.Provider>,
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("always renders the Uploader component", async () => {
    mockGetUplaods.mockResolvedValue({ data: { uploads: [] }, error: null });
    render(
      <UploadContext.Provider value={makeUploadContext()}>
        <UploadManager entityId="task1" entityType={UploadEntityType.TASK} />
      </UploadContext.Provider>,
    );
    expect(screen.getByTestId("uploader")).toBeInTheDocument();
  });

  it("dispatches SET_UPLOADS with fetched uploads after successful fetch", async () => {
    const dispatch = jest.fn();
    mockGetUplaods.mockResolvedValue({
      data: { uploads: [baseUpload] },
      error: null,
    });
    render(
      <UploadContext.Provider value={makeUploadContext([], dispatch)}>
        <UploadManager entityId="task1" entityType={UploadEntityType.TASK} />
      </UploadContext.Provider>,
    );
    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: SET_UPLOADS,
        payload: [baseUpload],
      }),
    );
  });

  it("hides loading and renders UploadedItem for each upload from context", async () => {
    mockGetUplaods.mockResolvedValue({ data: { uploads: [] }, error: null });
    render(
      <UploadContext.Provider
        value={makeUploadContext([
          baseUpload,
          { ...baseUpload, id: "u2", file_name: "img.png" },
        ])}
      >
        <UploadManager entityId="task1" entityType={UploadEntityType.TASK} />
      </UploadContext.Provider>,
    );
    await waitFor(() =>
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument(),
    );
    expect(screen.getAllByTestId("uploaded-item")).toHaveLength(2);
    expect(screen.getByText("file.pdf")).toBeInTheDocument();
    expect(screen.getByText("img.png")).toBeInTheDocument();
  });

  it("shows error toast when fetch returns an error", async () => {
    mockGetUplaods.mockResolvedValue({ data: null, error: new Error("fail") });
    render(
      <UploadContext.Provider value={makeUploadContext()}>
        <UploadManager entityId="task1" entityType={UploadEntityType.TASK} />
      </UploadContext.Provider>,
    );
    await waitFor(() => expect(toast.error).toHaveBeenCalled());
  });

  it("calls getUplaods with the correct entityId and entityType", async () => {
    mockGetUplaods.mockResolvedValue({ data: { uploads: [] }, error: null });
    render(
      <UploadContext.Provider value={makeUploadContext()}>
        <UploadManager entityId="task42" entityType={UploadEntityType.TASK} />
      </UploadContext.Provider>,
    );
    await waitFor(() =>
      expect(mockGetUplaods).toHaveBeenCalledWith(
        "task42",
        UploadEntityType.TASK,
      ),
    );
  });
});
