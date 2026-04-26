import generateUniqueId from "./generateUniqueId";

describe("generateUniqueId", () => {
  it("should generate a unique ID with rds- prefix when no prefix provided", () => {
    const id = generateUniqueId();
    expect(id).toMatch(/^rds-[a-f0-9-]{36}$/);
  });

  it("should generate a unique ID with rds-{prefix}- format", () => {
    const id = generateUniqueId("checkbox");
    expect(id).toMatch(/^rds-checkbox-[a-f0-9-]{36}$/);
  });

  it("should generate different IDs on subsequent calls", () => {
    const id1 = generateUniqueId("test");
    const id2 = generateUniqueId("test");
    expect(id1).not.toEqual(id2);
  });

  it("should treat empty string prefix as no additional prefix", () => {
    const id = generateUniqueId("");
    expect(id).toMatch(/^rds-[a-f0-9-]{36}$/);
  });

  it("should handle multi-part prefixes", () => {
    const id = generateUniqueId("textarea-counterID");
    expect(id).toMatch(/^rds-textarea-counterID-[a-f0-9-]{36}$/);
  });
});
