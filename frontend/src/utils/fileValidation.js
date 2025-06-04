export const validateFile = (file) => {
  if (!file) throw new Error("Please select a file");

  const validTypes = ["application/pdf"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error("Only PDF files are supported for analysis");
  }

  if (file.size > maxSize) {
    throw new Error("File size exceeds 5MB limit");
  }
};
