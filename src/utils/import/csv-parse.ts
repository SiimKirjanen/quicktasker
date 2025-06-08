/**
 * Parses CSV text content into an array of JavaScript objects.
 * Each object will have keys based on the header row with corresponding values from each data row.
 * Object property names are normalized to lowercase with spaces replaced by underscores.
 *
 * @param csvText The CSV content as a string
 * @returns Array of objects with normalized keys from headers and values from rows
 */
export function parseCSV(csvText: string): Record<string, string>[] {
  if (!csvText || typeof csvText !== "string") {
    return [];
  }

  // Split into lines and filter out empty lines
  const lines = csvText.split("\n").filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    return [];
  }

  // Process the header row to get column names and normalize them
  const headers = parseCSVRow(lines[0]).map(normalizePropertyName);

  // Process each data row
  const result: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVRow(lines[i]);

    // Skip if we got an empty row
    if (values.length === 0) continue;

    // Create an object with normalized header keys and row values
    const obj: Record<string, string> = {};

    for (let j = 0; j < headers.length; j++) {
      // Use the normalized header as key and corresponding value from this row
      // If the value is undefined, use an empty string instead
      obj[headers[j]] = j < values.length ? values[j] : "";
    }

    result.push(obj);
  }

  return result;
}

/**
 * Normalizes a property name by converting to lowercase and replacing spaces with underscores.
 * Also removes any non-alphanumeric characters other than underscores.
 *
 * @param name The property name to normalize
 * @returns Normalized property name
 */
function normalizePropertyName(name: string): string {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-z0-9_]/g, ""); // Remove any characters that aren't alphanumeric or underscores
}

/**
 * Parses a single CSV row into an array of values, correctly handling quotes and commas.
 *
 * @param row A single row from a CSV file
 * @returns Array of values from the row
 */
function parseCSVRow(row: string): string[] {
  const values: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      if (insideQuotes && i + 1 < row.length && row[i + 1] === '"') {
        // Handle escaped quotes (two double quotes in a row)
        currentValue += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      // End of value
      values.push(currentValue.trim());
      currentValue = "";
    } else {
      // Regular character
      currentValue += char;
    }
  }

  // Add the last value
  values.push(currentValue.trim());

  return values;
}
