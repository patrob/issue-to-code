const { exec } = require('@actions/exec');

/**
 * Git utility functions for managing repository changes
 */
class GitUtils {
  /**
   * Initializes git configuration for GitHub Actions bot
   */
  static async configureGitUser() {
    await exec('git', [
      'config',
      '--global',
      'user.email',
      'github-actions[bot]@users.noreply.github.com'
    ]);
    await exec('git', [
      'config',
      '--global',
      'user.name',
      'github-actions[bot]'
    ]);
  }

  /**
   * Creates and checks out a new branch
   * @param {string} branchName - Name of the branch to create
   */
  static async createBranch(branchName) {
    await exec('git', ['checkout', '-b', branchName]);
  }

  /**
   * Commits and pushes changes to the repository
   * @param {string} branchName - Name of the branch
   * @param {string} message - Commit message
   */
  static async commitAndPush(branchName, message) {
    await exec('git', ['add', '.']);
    await exec('git', ['commit', '-m', message]);
    await exec('git', ['push', 'origin', branchName]);
  }
}

if (require.main === module) {
  const [,, command, branchName, message] = process.argv;
  if (command === 'commitAndPush') {
    GitUtils.commitAndPush(branchName, message);
  }
}

module.exports = GitUtils;
