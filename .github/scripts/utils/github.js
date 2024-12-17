/**
 * GitHub API utility functions
 */
class GitHubUtils {
  /**
   * Creates a pull request
   * @param {Object} github - GitHub API client
   * @param {Object} params - Pull request parameters
   * @returns {Object} Created pull request data
   */
  static async createPullRequest(github, { owner, repo, title, body, head, base }) {
    return await github.rest.pulls.create({
      owner,
      repo,
      title,
      body,
      head,
      base
    });
  }

  /**
   * Adds a comment to an issue
   * @param {Object} github - GitHub API client
   * @param {Object} params - Comment parameters
   */
  static async addIssueComment(github, { owner, repo, issueNumber, body }) {
    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body
    });
  }

  /**
   * Generates a branch name for an issue
   * @param {number} issueNumber - GitHub issue number
   * @returns {string} Formatted branch name
   */
  static getBranchName(issueNumber) {
    return `fix/issue-${issueNumber}`;
  }
}

if (require.main === module) {
  const [,, command, owner, branchName, title, body] = process.argv;
  if (command === 'createPullRequest') {
    const github = require('@actions/github');
    const context = github.context;
    GitHubUtils.createPullRequest(github, {
      owner,
      repo: context.repo.repo,
      title,
      body,
      head: branchName,
      base: 'main'
    });
  }
}

module.exports = GitHubUtils;
