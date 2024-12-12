const fs = require('fs').promises;
const path = require('path');

/**
 * Prepares the issue content for Aider processing
 * @param {Object} issue - The GitHub issue object
 * @param {string} issue.title - The issue title
 * @param {string} issue.body - The issue body
 */
async function prepareIssueFile(issue) {
  try {
    const issueContent = formatIssueContent(issue);
    await saveIssueContent(issueContent);
  } catch (error) {
    console.error('Error preparing issue file:', error);
    throw error;
  }
}

/**
 * Formats the issue content in a structured way
 * @param {Object} issue - The GitHub issue object
 * @returns {string} Formatted issue content
 */
function formatIssueContent(issue) {
  return [
    `# ${issue.title}`,
    '',
    '## Description',
    issue.body,
    '',
    '## Requirements',
    '- Generate code changes to resolve the issue',
    '- Follow coding best practices',
    '- Ensure code is well-documented',
    ''
  ].join('\n');
}

/**
 * Saves the issue content to a temporary file
 * @param {string} content - The formatted issue content
 */
async function saveIssueContent(content) {
  const tempDir = path.join(__dirname, '../temp');
  await fs.mkdir(tempDir, { recursive: true });
  await fs.writeFile(path.join(tempDir, 'issue.md'), content, 'utf8');
}

module.exports = {
  prepareIssueFile
};