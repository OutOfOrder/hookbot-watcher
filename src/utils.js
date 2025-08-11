/**
 * Generate a UUID
 *
 * @returns {string}
 */
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

/**
 * Adds or updates the entry into the store
 *
 * For an update it "merges" keys (vs replacing the object)
 *
 * @param {object[]} records
 * @param {object} entry
 * @param {Object} options A set of options
 * @param {string[]} options.skip A list of keys to skip when building changes
 * @param {string[]} options.only A list of keys to include when building changes
 */
export function addUpdateRecord(records, entry, { skip = [], only = [] } = {}) {
  if (!entry.id) {
    console.error('No ID!', entry);
  }
  let newEntry;
  if (only.length > 0) {
    newEntry = {};
    for (const key of only) {
      newEntry[key] = entry[key];
    }
  } else {
    newEntry = Object.assign({}, entry);
  }
  for (const key of skip) {
    delete newEntry[key];
  }
  const idx = records.findIndex(m => m.id === entry.id);
  if (idx < 0) {
    records.push(newEntry);
  } else {
    newEntry = Object.assign({}, records[idx], newEntry);
    records[idx] = newEntry;
  }
  return newEntry;
}

/**
 * Removes an entry from the store
 *
 * @param {object[]} records
 * @param {string} entry_id
 */
export function removeRecord(records, entry_id) {
  const idx = records.findIndex(m => m.id === entry_id);
  if (idx >= 0) {
    records.splice(idx, 1);
  }
}