import fs from "fs";
import path from "path";
import processing from "../../components/imageProc";
import utils from "../../components/utilities";

describe("Test image resize processing", (): void => {
  it("raises an error (Values of height and width must be a positive number over 0)", (): void => {
    processing({ imageName: "palmtunnel.jpg", height: 0, width: 100 }).then(
      (rtn) => {
        expect(rtn.completed).toBeFalse();
      }
    );
  });

  it("raises an error (no negative values are allowed)", (): void => {
    processing({ imageName: "palmtunnel.jpg", height: -100, width: 100 }).then(
      (rtn) => {
        expect(rtn.completed).toBeFalse();
      }
    );
  });

  it("succeeds to write resized thumbnail file", (): void => {
    processing({ imageName: "palmtunnel.jpg", height: 77, width: 77 }).then(
      (rtn) => {
        expect(rtn.completed).toBeTrue();
      }
    );
  });

  it("raises an error (source image not found)", (): void => {
    processing({ imageName: "Xpalmtunnel.jpg", height: 88, width: 88 }).then(
      (rtn) => {
        expect(rtn.completed).toBeFalse();
      }
    );
  });
});

// Cleaning test images from thumbnail folder
afterAll(async (): Promise<void> => {
  const resizedImagePath = path.resolve(
    utils.getOutputPath(),
    "palmtunnel_77_77.jpg"
  );
  try {
    fs.promises.access(resizedImagePath);
    fs.promises.unlink(resizedImagePath);
  } catch {}
});
