const GitUtils = require('./utils/git');
const GitHubUtils = require('./utils/github');

/**
 * Main function to process Aider-generated changes and create a PR
 * @param {Object} params - Parameters object
 * @param {Object} params.github - GitHub API client
 * @param {Object} params.context - GitHub Actions context
 * @param {Object} params.exec - GitHub Actions exec tool
 */
async function processAiderChanges({ github, context, exec }) {
  const issue = context.payload.issue;
  const branchName = GitHubUtils.getBranchName(issue.number);

  try {
    await GitUtils.configureGitUser();
    await GitUtils.createBranch(branchName);
    
    const commitMessage = `fix: Resolve issue #${issue.number}\n\n${issue.title}`;
    await GitUtils.commitAndPush(branchName, commitMessage);

    const pr = await GitHubUtils.createPullRequest(github, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      title: `fix: ${issue.title}`,
      body: `Fixes #${issue.number}\n\nAutomatically generated solution using Aider.`,
      head: branchName,
      base: 'main'
    });

    await GitHubUtils.addIssueComment(github, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      issueNumber: issue.number,
      body: `I've generated a solution and created PR #${pr.data.number} to resolve this issue. Please review the changes.`
    });
  } catch (error) {
    console.error('Error processing changes:', error);
    throw error;
  }
}

module.exports = {
  processAiderChanges
};