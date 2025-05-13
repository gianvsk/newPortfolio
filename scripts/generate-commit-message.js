const { execSync } = require('child_process');

const CONVENTIONAL_TYPES = {
  feat: 'feat',
  fix: 'fix',
  docs: 'docs',
  style: 'style',
  refactor: 'refactor',
  perf: 'perf',
  test: 'test',
  build: 'build',
  ci: 'ci',
  chore: 'chore',
};

function getStagedChanges() {
  try {
    // Get staged files
    const stagedFiles = execSync('git diff --cached --name-only')
      .toString()
      .trim()
      .split('\n');

    if (
      stagedFiles.length === 0 ||
      (stagedFiles.length === 1 && stagedFiles[0] === '')
    ) {
      console.log(
        'No staged changes found. Please stage your changes first using git add.'
      );
      process.exit(1);
    }

    // Get detailed changes for each staged file
    const changes = stagedFiles.map(file => {
      const diff = execSync(`git diff --cached ${file}`).toString();
      return {
        file,
        changes: diff,
      };
    });

    return changes;
  } catch (error) {
    console.error('Error getting staged changes:', error.message);
    process.exit(1);
  }
}

function determineCommitType(changes) {
  // Analyze changes to determine the most appropriate commit type
  const allChanges = changes.map(({ changes }) => changes).join('\n');

  if (allChanges.includes('test') || allChanges.includes('expect')) {
    return CONVENTIONAL_TYPES.test;
  }
  if (
    allChanges.includes('style') ||
    allChanges.includes('css') ||
    allChanges.includes('format')
  ) {
    return CONVENTIONAL_TYPES.style;
  }
  if (allChanges.includes('fix') || allChanges.includes('bug')) {
    return CONVENTIONAL_TYPES.fix;
  }
  if (allChanges.includes('doc') || allChanges.includes('readme')) {
    return CONVENTIONAL_TYPES.docs;
  }
  if (allChanges.includes('refactor')) {
    return CONVENTIONAL_TYPES.refactor;
  }
  if (allChanges.includes('perf') || allChanges.includes('performance')) {
    return CONVENTIONAL_TYPES.perf;
  }
  if (allChanges.includes('build') || allChanges.includes('dependencies')) {
    return CONVENTIONAL_TYPES.build;
  }
  if (
    allChanges.includes('ci') ||
    allChanges.includes('travis') ||
    allChanges.includes('github actions')
  ) {
    return CONVENTIONAL_TYPES.ci;
  }

  return CONVENTIONAL_TYPES.feat; // Default to feat if no specific type is detected
}

function generateCommitMessage(changes) {
  const commitType = determineCommitType(changes);
  let message = '';

  if (changes.length === 1) {
    // Single file change - use scoped commit with full filename
    const { file, changes: fileChanges } = changes[0];
    const fileName = file.split('/').pop();

    if (fileChanges.includes('+') && !fileChanges.includes('-')) {
      message = `${commitType}(${fileName}): Add ${fileName}`;
    } else if (fileChanges.includes('-') && !fileChanges.includes('+')) {
      message = `${commitType}(${fileName}): Remove ${fileName}`;
    } else {
      message = `${commitType}(${fileName}): Update ${fileName}`;
    }
  } else {
    // Multiple files changed
    message = `${commitType}: `;
    const fileChanges = changes.map(({ file, changes: fileChanges }) => {
      const fileName = file.split('/').pop();
      if (fileChanges.includes('+') && !fileChanges.includes('-')) {
        return `Add ${fileName}`;
      } else if (fileChanges.includes('-') && !fileChanges.includes('+')) {
        return `Remove ${fileName}`;
      } else {
        return `Update ${fileName}`;
      }
    });

    message += fileChanges.join(', ');
  }

  // Ensure message doesn't exceed 300 characters
  if (message.length > 300) {
    message = message.substring(0, 297) + '...';
  }

  return message;
}

function main() {
  const stagedChanges = getStagedChanges();
  const commitMessage = generateCommitMessage(stagedChanges);

  console.log('\nSuggested commit message:');
  console.log('------------------------');
  console.log(commitMessage);
  console.log('------------------------\n');

  console.log('To use this message, run:');
  console.log(`git commit -m "${commitMessage}"`);
}

main();
