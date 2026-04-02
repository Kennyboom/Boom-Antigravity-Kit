#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { downloadTemplate } from "giget";
import path from "path";
import fse from "fs-extra";
import readline from "readline";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = await fse.readJson(
  path.join(__dirname, "..", "package.json")
);

// ============================================================
// CONSTANTS
// ============================================================
const REPO = "github:Kennyboom/Boom-Antigravity-Kit";
const AGENT_FOLDER = ".agent";
const BRAIN_FOLDER = ".brain";
const TEMP_FOLDER = ".temp_boom_ag_kit";
const KIT_NAME = "Boom Antigravity Kit";

// ============================================================
// UTILITIES
// ============================================================

/** Display branded banner */
const showBanner = (quiet = false) => {
  if (quiet) return;
  console.log(
    chalk.cyanBright(`
  ╔══════════════════════════════════════════╗
  ║   ⚡ BOOM ANTIGRAVITY KIT V${pkg.version}         ║
  ║   The Autonomous AI Workforce            ║
  ╚══════════════════════════════════════════╝
    `)
  );
};

/** Conditional log */
const log = (message, quiet = false) => {
  if (!quiet) console.log(message);
};

/** Interactive yes/no prompt */
const confirmAction = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      chalk.yellow(`${question} (y/N): `),
      (answer) => {
        rl.close();
        const normalized = answer.toLowerCase();
        resolve(normalized === "y" || normalized === "yes");
      }
    );
  });
};

/** Remove temporary download directory */
const cleanupTemp = async (tempDir) => {
  await fse.remove(tempDir);
};

/** Copy .agent from downloaded repo to target */
const copyAgentFolder = async (tempDir, destDir) => {
  const sourceAgent = path.join(tempDir, AGENT_FOLDER);

  if (!(await fse.pathExists(sourceAgent))) {
    throw new Error(
      `Could not find ${AGENT_FOLDER} in source repository!`
    );
  }

  await fse.copy(sourceAgent, destDir, { overwrite: true });
};

/** Copy .brain from downloaded repo to target */
const copyBrainFolder = async (tempDir, destDir) => {
  const sourceBrain = path.join(tempDir, BRAIN_FOLDER);

  if (await fse.pathExists(sourceBrain)) {
    await fse.copy(sourceBrain, destDir, { overwrite: true });
    return true;
  }
  return false;
};

// ============================================================
// COMMANDS
// ============================================================

/** ag-kit init — download and install .agent + .brain */
const initCommand = async (options) => {
  const quiet = options.quiet || false;
  const dryRun = options.dryRun || false;

  showBanner(quiet);

  const targetDir = path.resolve(options.path || process.cwd());
  const tempDir = path.join(targetDir, TEMP_FOLDER);
  const agentDir = path.join(targetDir, AGENT_FOLDER);
  const brainDir = path.join(targetDir, BRAIN_FOLDER);

  if (dryRun) {
    console.log(
      chalk.blueBright("\n[Dry Run] No changes will be made\n")
    );
    console.log(chalk.white("Would perform:"));
    console.log(chalk.gray("─".repeat(44)));
    const branch = options.branch
      ? `#${options.branch}`
      : "";
    console.log(`  1. Download: ${chalk.cyan(REPO)}${branch}`);
    console.log(`  2. Install ${AGENT_FOLDER} → ${chalk.cyan(agentDir)}`);
    console.log(`  3. Install ${BRAIN_FOLDER} → ${chalk.cyan(brainDir)}`);

    if (await fse.pathExists(agentDir)) {
      console.log(
        `  4. ${chalk.yellow("Overwrite existing .agent folder")}`
      );
    }
    console.log(chalk.gray("─".repeat(44) + "\n"));
    return;
  }

  if (await fse.pathExists(agentDir)) {
    if (!options.force) {
      log(
        chalk.yellow(
          `Warning: ${AGENT_FOLDER} already exists at: ${agentDir}`
        ),
        quiet
      );
      const shouldOverwrite = await confirmAction(
        "Do you want to overwrite it?"
      );

      if (!shouldOverwrite) {
        log(chalk.gray("Operation cancelled."), quiet);
        process.exit(0);
      }
    }
    log(chalk.gray(`Overwriting ${AGENT_FOLDER}...`), quiet);
  }

  const spinner = quiet
    ? null
    : ora({ text: "Downloading Boom AG Kit...", color: "cyan" }).start();

  try {
    const repoSource = options.branch
      ? `${REPO}#${options.branch}`
      : REPO;
    await downloadTemplate(repoSource, {
      dir: tempDir,
      force: true,
    });

    if (spinner) spinner.text = "Installing .agent...";
    await fse.remove(agentDir);
    await copyAgentFolder(tempDir, agentDir);

    if (spinner) spinner.text = "Installing .brain...";
    const hasBrain = await copyBrainFolder(tempDir, brainDir);

    await cleanupTemp(tempDir);

    if (spinner) {
      spinner.succeed(chalk.green("Kit installed!"));
    }

    // Auto-index with GitNexus Knowledge Graph
    const gnSpinner = quiet
      ? null
      : ora({
          text: "Indexing codebase with GitNexus...",
          color: "magenta",
        }).start();

    try {
      execSync(
        "npx -y gitnexus@latest analyze",
        { cwd: targetDir, stdio: "pipe", timeout: 120000 }
      );
      if (gnSpinner) {
        gnSpinner.succeed(
          chalk.green("Knowledge Graph ready!")
        );
      }
    } catch {
      if (gnSpinner) {
        gnSpinner.warn(
          chalk.yellow(
            "GitNexus skipped (empty project or offline)"
          )
        );
      }
    }

    if (!quiet) {
      console.log(chalk.gray("\n" + "─".repeat(44)));
      console.log(chalk.white("Result:"));
      console.log(
        `  ${chalk.cyan(AGENT_FOLDER)} → ${chalk.gray(agentDir)}`
      );
      if (hasBrain) {
        console.log(
          `  ${chalk.cyan(BRAIN_FOLDER)} → ${chalk.gray(brainDir)}`
        );
      }
      console.log(
        `  ${chalk.magenta("🧠 GitNexus")} → MCP configured`
      );
      console.log(chalk.gray("─".repeat(44)));
      console.log(chalk.green("\nFully ready! ⚡\n"));
    }
  } catch (error) {
    if (spinner) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
    } else {
      console.error(chalk.red(`Error: ${error.message}`));
    }
    await cleanupTemp(tempDir);
    process.exit(1);
  }
};

/** ag-kit update — re-download latest version */
const updateCommand = async (options) => {
  const quiet = options.quiet || false;

  showBanner(quiet);

  const targetDir = path.resolve(options.path || process.cwd());
  const agentDir = path.join(targetDir, AGENT_FOLDER);

  if (!(await fse.pathExists(agentDir))) {
    console.log(
      chalk.red(
        `Error: ${AGENT_FOLDER} not found at: ${targetDir}`
      )
    );
    console.log(
      chalk.yellow(
        `Run ${chalk.cyan("boom-ag-kit init")} first.`
      )
    );
    process.exit(1);
  }

  if (!options.force && !quiet) {
    log(
      chalk.yellow(
        `Warning: Update overwrites the entire ${AGENT_FOLDER}`
      ),
      quiet
    );
    const shouldUpdate = await confirmAction(
      "Are you sure?"
    );

    if (!shouldUpdate) {
      log(chalk.gray("Operation cancelled."), quiet);
      process.exit(0);
    }
  }

  await initCommand({ ...options, force: true });
};

/** ag-kit status — check installation */
const statusCommand = async (options) => {
  const targetDir = path.resolve(options.path || process.cwd());
  const agentDir = path.join(targetDir, AGENT_FOLDER);
  const brainDir = path.join(targetDir, BRAIN_FOLDER);

  console.log(
    chalk.cyanBright(`\n⚡ ${KIT_NAME} Status\n`)
  );

  if (await fse.pathExists(agentDir)) {
    const stats = await fse.stat(agentDir);
    const files = await fse.readdir(agentDir);

    console.log(chalk.green("[OK] .agent installed"));
    console.log(chalk.gray("─".repeat(44)));
    console.log(`Path:     ${chalk.cyan(agentDir)}`);
    console.log(
      `Modified: ${chalk.gray(stats.mtime.toLocaleString("en-US"))}`
    );
    console.log(
      `Items:    ${chalk.yellow(files.length)} at root`
    );
    console.log(chalk.gray("─".repeat(44)));
  } else {
    console.log(chalk.red("[X] .agent not installed"));
    console.log(
      chalk.yellow(
        `Run ${chalk.cyan("boom-ag-kit init")} to install.`
      )
    );
  }

  if (await fse.pathExists(brainDir)) {
    const brainFiles = await fse.readdir(brainDir);
    console.log(
      chalk.green(
        `[OK] .brain active (${brainFiles.length} files)`
      )
    );
  } else {
    console.log(chalk.yellow("[~] .brain not initialized"));
  }

  console.log("");
};

// ============================================================
// CLI DEFINITION
// ============================================================
const program = new Command();

program
  .name("boom-ag-kit")
  .description(`CLI for ${KIT_NAME} — AI Agent templates`)
  .version(pkg.version, "-v, --version", "Display version");

program
  .command("init")
  .description("Install .agent + .brain into your project")
  .option("-f, --force", "Overwrite if exists", false)
  .option(
    "-p, --path <dir>",
    "Project directory",
    process.cwd()
  )
  .option("-b, --branch <name>", "Repository branch")
  .option("-q, --quiet", "Suppress output (CI/CD)", false)
  .option("--dry-run", "Preview without executing", false)
  .action(initCommand);

program
  .command("update")
  .description("Update to latest version")
  .option("-f, --force", "Skip confirmation", false)
  .option(
    "-p, --path <dir>",
    "Project directory",
    process.cwd()
  )
  .option("-b, --branch <name>", "Repository branch")
  .option("-q, --quiet", "Suppress output (CI/CD)", false)
  .option("--dry-run", "Preview without executing", false)
  .action(updateCommand);

program
  .command("status")
  .description("Check installation status")
  .option(
    "-p, --path <dir>",
    "Project directory",
    process.cwd()
  )
  .action(statusCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
