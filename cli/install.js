#!/usr/bin/env node

/**
 * Agent Assistant CLI Installer
 * 
 * Installs the Agent Assistant framework for different AI coding tools:
 * - Cursor
 * - GitHub Copilot
 * - Antigravity (Gemini)
 * 
 * Usage:
 *   npx agent-assistant install [tool]
 *   npx agent-assistant install --all
 *   npx agent-assistant uninstall [tool]
 *   npx agent-assistant list
 */

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const readline = require('node:readline');

// ============================================================================
// Configuration
// ============================================================================

const HOME = os.homedir();
const ROOT = path.join(__dirname, '..');

// Platform-specific VS Code prompts folder
function getVSCodePromptsFolder() {
    switch (process.platform) {
        case 'win32':
            return path.join(process.env.APPDATA || '', 'Code', 'User', 'prompts');
        case 'darwin':
            return path.join(HOME, 'Library', 'Application Support', 'Code', 'User', 'prompts');
        default:
            return path.join(HOME, '.config', 'Code', 'User', 'prompts');
    }
}

const TOOLS = {
    cursor: {
        name: 'Cursor',
        description: 'Cursor AI Editor',
        paths: {
            editorHome: path.join(HOME, '.cursor'),
            rules: path.join(HOME, '.cursor', 'rules'),
            skills: path.join(HOME, '.cursor', 'skills'),
            agents: path.join(HOME, '.cursor', 'agents'),
            commands: path.join(HOME, '.cursor', 'commands'),
            agentAssistant: path.join(HOME, '.cursor', 'skills', 'agent-assistant'),
        },
        replacements: {
            '{TOOL}/agent-assistant/': 'cursor/skills/agent-assistant/',
            '{TOOL}': 'cursor',
            '~/.agent/': '~/.cursor/skills/agent-assistant/'
        },
        assets: {
            rules: path.join(ROOT, 'code-assistants', 'cursor-assistant', 'rules'),
            cursorRules: path.join(ROOT, 'code-assistants', 'cursor-assistant', '.cursorrules'),
        }
    },
    copilot: {
        name: 'GitHub Copilot',
        description: 'GitHub Copilot in VS Code',
        paths: {
            home: path.join(HOME, '.copilot'),
            skills: path.join(HOME, '.copilot', 'skills'),
            commands: path.join(HOME, '.copilot', 'commands'),
            agents: path.join(HOME, '.copilot', 'agents'),
            rules: path.join(HOME, '.copilot', 'rules'),
            agentAssistant: path.join(HOME, '.copilot', 'skills', 'agent-assistant'),
            vsCodePrompts: getVSCodePromptsFolder(),
        },
        replacements: {
            '{TOOL}/agent-assistant/': 'copilot/skills/agent-assistant/',
            '{TOOL}': 'copilot'
        },
        assets: {
            agentFile: path.join(ROOT, 'code-assistants', 'copilot-assistant', 'agent-assistant.agent.md'),
        }
    },
    antigravity: {
        name: 'Antigravity (Gemini)',
        description: 'Google Antigravity / Gemini',
        paths: {
            editorHome: path.join(HOME, '.antigravity'),
            gemini: path.join(HOME, '.gemini'),
            antigravity: path.join(HOME, '.gemini', 'antigravity'),
            skills: path.join(HOME, '.gemini', 'antigravity', 'skills'),
            agents: path.join(HOME, '.antigravity', 'agents'), // User accessible agents
            globalAgents: path.join(HOME, '.gemini', 'agents'), // Global config
            workflows: path.join(HOME, '.antigravity', 'workflows'),
            globalWorkflows: path.join(HOME, '.gemini', 'antigravity', 'global_workflows'),
            agentAssistant: path.join(HOME, '.gemini', 'antigravity', 'skills', 'agent-assistant'),
        },
        replacements: {
            '{TOOL}/agent-assistant/': 'gemini/antigravity/skills/agent-assistant/',
            '{TOOL}': 'gemini/antigravity',
            '~/.agent/': '~/.gemini/antigravity/skills/agent-assistant/'
        },
        assets: {
            geminiMd: path.join(ROOT, 'code-assistants', 'antigravity-assistant', 'GEMINI.md'),
            agentFile: path.join(ROOT, 'code-assistants', 'antigravity-assistant', 'AntigravityGlobal.agent.md'),
        }
    },
    claude: {
        name: 'Claude Code',
        description: 'Anthropic Claude CLI',
        paths: {
            home: path.join(HOME, '.claude'),
            skills: path.join(HOME, '.claude', 'skills'),
            commands: path.join(HOME, '.claude', 'commands'),
            agents: path.join(HOME, '.claude', 'agents'),
            agentAssistant: path.join(HOME, '.claude', 'skills', 'agent-assistant'),
        },
        replacements: {
            '{TOOL}/agent-assistant/': 'claude/skills/agent-assistant/',
            '{TOOL}': 'claude',
            '~/.agent/': '~/.claude/skills/agent-assistant/'
        },
        assets: {
            claudeMd: path.join(ROOT, 'code-assistants', 'claude-assistant', 'CLAUDE.md'),
        }
    }
};

// Core directories to copy for agent-assistant framework
// Note: 'workflows' used to exist but was merged into 'rules'
// We copy 'commands' to both 'commands' and 'workflows' for backward compatibility
const CORE_DIRS = ['agents', 'rules', 'documents', 'commands', 'matrix-skills'];

// Root files to copy
const ROOT_FILES = ['README.md'];

// List of bundled agent names (for cleanup - only remove our agents, keep user-custom)
const BUNDLED_AGENTS = [
    'backend-engineer.md',
    'brainstormer.md',
    'business-analyst.md',
    'database-architect.md',
    'debugger.md',
    'designer.md',
    'devops-engineer.md',
    'docs-manager.md',
    'frontend-engineer.md',
    'game-engineer.md',
    'mobile-engineer.md',
    'performance-engineer.md',
    'planner.md',
    'project-manager.md',
    'researcher.md',
    'reviewer.md',
    'scouter.md',
    'security-engineer.md',
    'tech-lead.md',
    'tester.md',
];

// ============================================================================
// Utility Functions
// ============================================================================

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyWithReplace(src, dest, replacements = {}) {
    if (!fs.existsSync(src)) return 0;
    ensureDir(dest);
    let count = 0;

    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        // Skip hidden files and node_modules
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        
        // Skip symbolic links for security (prevents path traversal attacks)
        if (entry.isSymbolicLink()) {
            console.log(`  ⚠️ Skipping symlink: ${entry.name}`);
            continue;
        }

        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            count += copyWithReplace(srcPath, destPath, replacements);
        } else {
            // Apply replacements for text files
            const textExtensions = ['.md', '.txt', '.json', '.mdc', '.yaml', '.yml'];
            const ext = path.extname(entry.name).toLowerCase();

            if (textExtensions.includes(ext)) {
                try {
                    let content = fs.readFileSync(srcPath, 'utf8');
                    // Sort keys by length (longer first) to prevent partial replacements
                    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
                    for (const search of keys) {
                        content = content.replaceAll(search, replacements[search]);
                    }
                    fs.writeFileSync(destPath, content);
                } catch (e) {
                    // Log warning but continue with binary copy as fallback
                    if (process.env.DEBUG) {
                        console.warn(`  ⚠️ Could not process ${entry.name} as text, copying as binary`);
                    }
                    fs.copyFileSync(srcPath, destPath);
                }
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
            count++;
        }
    }
    return count;
}

function copyFileWithReplace(src, dest, replacements = {}) {
    if (!fs.existsSync(src)) return false;

    ensureDir(path.dirname(dest));

    let content = fs.readFileSync(src, 'utf8');
    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    for (const search of keys) {
        content = content.replaceAll(search, replacements[search]);
    }
    fs.writeFileSync(dest, content);
    return true;
}

function removeDir(dir) {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        return true;
    }
    return false;
}

function formatNumber(num) {
    return num.toLocaleString();
}

// ============================================================================
// Installation Functions
// ============================================================================

function installCursor() {
    const tool = TOOLS.cursor;
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...\n`);

    let total = 0;

    // --- 1. INSTALL EDITOR CONFIG (~/.cursor) ---
    // 1.1 Global MDCs (Rules)
    console.log('  1. Installing global rules (MDC files)...');
    if (tool.assets.rules && fs.existsSync(tool.assets.rules)) {
        total += copyWithReplace(tool.assets.rules, tool.paths.rules, tool.replacements);
    }

    // 1.2 Global Commands (Suggestions)
    console.log('  2. Installing global commands...');
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.commands, tool.replacements);

    // --- 1.2 Global Config Files (CURSOR.md, AGENT.md, CLAUDE.md) ---
    console.log('  2.1 Installing global config files...');
    // We want CURSOR.md, AGENT.md, CLAUDE.md in ~/.cursor/
    // .cursorrules from extension becomes CURSOR.md
    if (tool.assets.cursorRules && fs.existsSync(tool.assets.cursorRules)) {
        const destFile = path.join(tool.paths.editorHome, 'CURSOR.md');
        if (copyFileWithReplace(tool.assets.cursorRules, destFile, tool.replacements)) total++;
    }

    // AGENT.md, CLAUDE.md
    const globalFiles = ['AGENT.md', 'CLAUDE.md'];
    for (const file of globalFiles) {
        const src = path.join(ROOT, file);
        const dest = path.join(tool.paths.editorHome, file);
        if (fs.existsSync(src)) {
            if (copyFileWithReplace(src, dest, tool.replacements)) total++;
        }
    }

    // --- 2. INSTALL EXTENSION BRAIN (~/.cursor/skills/agent-assistant) ---
    console.log('  3. Installing core framework...');

    // Clean install - remove old framework
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    // Copy all core directories
    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Also copy 'commands' to 'workflows' for backward compatibility
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    // Copy root files (README.md, etc.)
    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) {
                total++;
            }
        }
    }

    // --- 3. INSTALL USER SKILLS (~/.cursor/skills/) ---
    console.log('  4. Installing skills...');
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    // --- 4. NATIVE SUBAGENT SUPPORT (~/.cursor/agents/) ---
    console.log('  5. Installing native agents...');
    // Only copy bundled agents (merge/update)
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.agents, tool.replacements);

    console.log(`\n✅ ${tool.name}: ${formatNumber(total)} files installed`);
    console.log(`   Rules: ${tool.paths.rules}`);
    console.log(`   Commands: ${tool.paths.commands}`);
    console.log(`   Core Framework: ${tool.paths.agentAssistant}`);
    console.log(`   Skills: ${tool.paths.skills}`);
    console.log(`   Native Agents: ${tool.paths.agents}`);

    return total;
}

function installCopilot() {
    const tool = TOOLS.copilot;
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...\n`);

    let total = 0;

    // --- 1. INSTALL TO VS CODE PROMPTS & GLOBAL CONFIG ---
    console.log('  1. Installing agent definitions...');
    if (tool.assets.agentFile && fs.existsSync(tool.assets.agentFile)) {
        // 1.1 Custom Prompt (VS Code) -> agent-assistant.agent.md
        ensureDir(tool.paths.vsCodePrompts);
        const promptDest = path.join(tool.paths.vsCodePrompts, 'agent-assistant.agent.md');
        if (copyFileWithReplace(tool.assets.agentFile, promptDest, tool.replacements)) {
            total++;
            console.log(`     → Custom Prompt: ${promptDest}`);
        }
    }

    // --- 1.2 Global Config Files (COPILOT.md, AGENT.md, CLAUDE.md) ---
    console.log('  1.2 Installing global config files...');
    ensureDir(tool.paths.home);
    const globalFiles = ['COPILOT.md', 'AGENT.md', 'CLAUDE.md'];
    for (const file of globalFiles) {
        const src = path.join(ROOT, file);
        const dest = path.join(tool.paths.home, file);
        if (fs.existsSync(src)) {
            if (copyFileWithReplace(src, dest, tool.replacements)) {
                total++;
                console.log(`     → ${file}: ${dest}`);
            }
        }
    }

    // --- 2. INSTALL CORE FRAMEWORK (~/.copilot/skills/agent-assistant) ---
    console.log('  2. Installing core framework...');

    // Clean install - remove old framework
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    // Copy all core directories
    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Install commands to ~/.copilot/commands
    console.log('  2.1 Installing commands...');
    if (fs.existsSync(path.join(ROOT, 'commands'))) {
        ensureDir(tool.paths.commands);
        total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.commands, tool.replacements);
    }

    // Also copy 'commands' to 'workflows' for backward compatibility
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    // Copy root files (README.md, etc.)
    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) {
                total++;
            }
        }
    }

    // --- 3. INSTALL USER SKILLS (~/.copilot/skills/) ---
    console.log('  3. Installing skills...');
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    // --- 4. NATIVE SUBAGENT SUPPORT (~/.copilot/agents/) ---
    console.log('  4. Installing native agents...');
    // We overwrite/update user agents on install as per user request (sync logic)
    // But typically we'd just ensure dir.
    // The previous logic for other tools was just copy.
    // For copilot, we want agents in ~/.copilot/agents
    ensureDir(tool.paths.agents);
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.agents, tool.replacements);

    console.log(`\n✅ ${tool.name}: ${formatNumber(total)} files installed`);
    console.log(`   VS Code Prompts: ${tool.paths.vsCodePrompts}`);
    console.log(`   Global Config: ${tool.paths.home}`);
    console.log(`   Commands: ${tool.paths.commands}`);
    console.log(`   Core Framework: ${tool.paths.agentAssistant}`);
    console.log(`   Skills: ${tool.paths.skills}`);
    console.log(`   Native Agents: ${tool.paths.agents}`);

    return total;
}

function installAntigravity() {
    const tool = TOOLS.antigravity;
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...\n`);

    let total = 0;

    // --- 1. INSTALL EDITOR CONFIG (~/.antigravity) ---
    console.log('  1. Installing editor config (~/.antigravity)...');

    // 1.1 Workflows (from commands) -> ~/.antigravity/workflows
    ensureDir(tool.paths.workflows);
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.workflows, tool.replacements);

    // 1.2 Agents -> ~/.antigravity/agents
    ensureDir(tool.paths.agents);
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.agents, tool.replacements);


    // --- 2. INSTALL PLATFORM CONFIG (~/.gemini) ---
    console.log('  2. Installing platform config (~/.gemini)...');
    ensureDir(tool.paths.gemini);

    // 2.1 GEMINI.md
    if (tool.assets.geminiMd && fs.existsSync(tool.assets.geminiMd)) {
        const destFile = path.join(tool.paths.gemini, 'GEMINI.md');
        // Simple overwrite or append logic here, simpler than surgical for now to match extension
        const MARKER_START = '<!-- AGENT-ASSISTANT-START -->';
        const MARKER_END = '<!-- AGENT-ASSISTANT-END -->';

        let bundledContent = fs.readFileSync(tool.assets.geminiMd, 'utf8');
        const keys = Object.keys(tool.replacements).sort((a, b) => b.length - a.length);
        for (const search of keys) {
            bundledContent = bundledContent.replaceAll(search, tool.replacements[search]);
        }

        const wrappedContent = `${MARKER_START}\n${bundledContent}\n${MARKER_END}`;
        let existingContent = '';
        if (fs.existsSync(destFile)) existingContent = fs.readFileSync(destFile, 'utf8');

        if (existingContent.includes(MARKER_START)) {
            const regex = new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`, 'g');
            fs.writeFileSync(destFile, existingContent.replace(regex, wrappedContent));
        } else {
            const separator = existingContent.trim() === '' ? '' : '\n\n';
            fs.writeFileSync(destFile, existingContent + separator + wrappedContent);
        }
        total++;
    }

    // 2.2 Global Config Files (AGENT.md, CLAUDE.md)
    const globalFiles = ['AGENT.md', 'CLAUDE.md'];
    for (const file of globalFiles) {
        const src = path.join(ROOT, file);
        const dest = path.join(tool.paths.gemini, file);
        if (fs.existsSync(src)) {
            if (copyFileWithReplace(src, dest, tool.replacements)) total++;
        }
    }

    // 2.3 Global Agents (~/.gemini/agents)
    console.log('  2.3 Installing global agents...');
    ensureDir(tool.paths.globalAgents);

    // AntigravityGlobal.agent.md
    if (tool.assets.agentFile && fs.existsSync(tool.assets.agentFile)) {
        const destFile = path.join(tool.paths.globalAgents, 'AntigravityGlobal.agent.md');
        if (copyFileWithReplace(tool.assets.agentFile, destFile, tool.replacements)) total++;
    }

    // Other Agents
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.globalAgents, tool.replacements);


    // --- 3. INSTALL EXTENSION BRAIN (~/.gemini/antigravity) ---
    console.log('  3. Installing extension brain...');

    // 3.1 Global Workflows (~/.gemini/antigravity/global_workflows)
    ensureDir(tool.paths.globalWorkflows);
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.globalWorkflows, tool.replacements);

    // 3.2 Core Framework (~/.gemini/antigravity/skills/agent-assistant)
    console.log('  3.2 Installing core framework...');
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Backward compat workflows
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) total++;
        }
    }

    // 3.3 Skills (~/.gemini/antigravity/skills)
    console.log('  3.3 Installing skills...');
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    console.log(`\n✅ ${tool.name}: ${formatNumber(total)} files installed`);
    console.log(`   Editor Config: ${tool.paths.editorHome}`);
    console.log(`   Platform Config: ${tool.paths.gemini}`);
    console.log(`   Extension Brain: ${tool.paths.antigravity}`);

    return total;
}

function installClaude() {
    const tool = TOOLS.claude;
    console.log(`\n📦 Installing Agent Assistant for ${tool.name}...\n`);

    let total = 0;

    // --- 1. INSTALL GLOBAL CONFIG (~/.claude) ---
    console.log('  1. Installing global config...');
    ensureDir(tool.paths.home);

    // 1.1 CLAUDE.md (Global Instructions)
    if (tool.assets.claudeMd && fs.existsSync(tool.assets.claudeMd)) {
        const destFile = path.join(tool.paths.home, 'CLAUDE.md');
        if (copyFileWithReplace(tool.assets.claudeMd, destFile, tool.replacements)) total++;
    }

    // 1.2 Commands (~/.claude/commands)
    console.log('  1.2 Installing commands...');
    ensureDir(tool.paths.commands);
    total += copyWithReplace(path.join(ROOT, 'commands'), tool.paths.commands, tool.replacements);

    // 1.3 Native Agents (~/.claude/agents)
    console.log('  1.3 Installing native agents...');
    ensureDir(tool.paths.agents);
    total += copyWithReplace(path.join(ROOT, 'agents'), tool.paths.agents, tool.replacements);

    // --- 2. INSTALL CORE FRAMEWORK (~/.claude/skills/agent-assistant) ---
    console.log('  2. Installing core framework...');
    if (fs.existsSync(tool.paths.agentAssistant)) {
        fs.rmSync(tool.paths.agentAssistant, { recursive: true, force: true });
    }
    ensureDir(tool.paths.agentAssistant);

    for (const dir of CORE_DIRS) {
        const srcDir = path.join(ROOT, dir);
        if (fs.existsSync(srcDir)) {
            total += copyWithReplace(srcDir, path.join(tool.paths.agentAssistant, dir), tool.replacements);
        }
    }

    // Copy backward compat workflows
    const commandsSrc = path.join(ROOT, 'commands');
    if (fs.existsSync(commandsSrc)) {
        total += copyWithReplace(commandsSrc, path.join(tool.paths.agentAssistant, 'workflows'), tool.replacements);
    }

    // Copy root files
    for (const file of ROOT_FILES) {
        const srcFile = path.join(ROOT, file);
        if (fs.existsSync(srcFile)) {
            if (copyFileWithReplace(srcFile, path.join(tool.paths.agentAssistant, file), tool.replacements)) total++;
        }
    }

    // --- 3. INSTALL SKILLS (~/.claude/skills) ---
    console.log('  3. Installing skills...');
    total += copyWithReplace(path.join(ROOT, 'skills'), tool.paths.skills, tool.replacements);

    console.log(`\n✅ ${tool.name}: ${formatNumber(total)} files installed`);
    console.log(`   Home: ${tool.paths.home}`);
    console.log(`   Commands: ${tool.paths.commands}`);
    console.log(`   Skills: ${tool.paths.skills}`);

    return total;
}

// ============================================================================
// Uninstall Functions
// ============================================================================

function removeBundledAgents(agentsDir) {
    if (!fs.existsSync(agentsDir)) return 0;

    let removed = 0;
    for (const agentFile of BUNDLED_AGENTS) {
        const agentPath = path.join(agentsDir, agentFile);
        if (fs.existsSync(agentPath)) {
            try {
                fs.unlinkSync(agentPath);
                console.log(`    ✓ Removed bundled agent: ${agentFile}`);
                removed++;
            } catch (e) {
                console.error(`    ✗ Failed to remove: ${agentPath}`);
            }
        }
    }

    // Cleanup: Remove agents folder if empty
    try {
        const remaining = fs.readdirSync(agentsDir);
        if (remaining.length === 0) {
            fs.rmdirSync(agentsDir);
            console.log(`    ✓ Removed empty agents folder`);
        } else {
            console.log(`    ℹ Kept ${remaining.length} user-custom agents`);
        }
    } catch (e) {
        // Ignore
    }

    return removed;
}

function uninstallCursor() {
    const tool = TOOLS.cursor;
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...\n`);

    let removed = 0;

    // 1. Remove Rules & Global Configs
    console.log('  1. Removing rules and global configs...');
    const filesToRemove = [
        path.join(tool.paths.rules, 'agent-assistant.mdc'),
        path.join(tool.paths.editorHome, 'CURSOR.md'),
        path.join(tool.paths.editorHome, 'AGENT.md'),
        path.join(tool.paths.editorHome, 'CLAUDE.md')
    ];

    for (const file of filesToRemove) {
        if (fs.existsSync(file)) {
            try {
                fs.unlinkSync(file);
                console.log(`    ✓ Removed: ${file}`);
                removed++;
            } catch (e) {
                console.error(`    ✗ Failed to remove: ${file}`, e);
            }
        }
    }

    // 2. Remove Commands (Entire folder)
    console.log('  2. Removing commands...');
    if (removeDir(tool.paths.commands)) {
        console.log(`    ✓ Removed: ${tool.paths.commands}`);
        removed++;
    }

    // 3. Remove Core Framework
    console.log('  3. Removing core framework...');
    if (removeDir(tool.paths.agentAssistant)) {
        console.log(`    ✓ Removed: ${tool.paths.agentAssistant}`);
        removed++;
    }

    // 4. Remove Native Agents (Entire folder)
    console.log('  4. Removing native agents...');
    if (removeDir(tool.paths.agents)) {
        console.log(`    ✓ Removed: ${tool.paths.agents}`);
        removed++;
    }

    // Note: User skills are preserved

    console.log(`\n✅ ${tool.name}: Uninstalled (user skills preserved, everything else removed)`);
    return removed;
}

function uninstallCopilot() {
    const tool = TOOLS.copilot;
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...\n`);

    let removed = 0;

    // 1. Remove from VS Code Prompts
    console.log('  1. Removing from VS Code Prompts...');
    const promptFile = path.join(tool.paths.vsCodePrompts, 'agent-assistant.agent.md');
    if (fs.existsSync(promptFile)) {
        fs.unlinkSync(promptFile);
        console.log(`    ✓ Removed: ${promptFile}`);
        removed++;
    }

    // 2. Remove core framework
    console.log('  2. Removing core framework...');
    if (removeDir(tool.paths.agentAssistant)) {
        console.log(`    ✓ Removed: ${tool.paths.agentAssistant}`);
        removed++;
    }

    // 3. Remove commands
    console.log('  3. Removing commands...');
    if (removeDir(tool.paths.commands)) {
        console.log(`    ✓ Removed: ${tool.paths.commands}`);
        removed++;
    }

    // 4. Remove Global Config Files
    console.log('  4. Removing global config files...');
    const globalFiles = ['AGENT.md', 'COPILOT.md', 'CLAUDE.md'];
    for (const file of globalFiles) {
        const filePath = path.join(tool.paths.home, file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`    ✓ Removed: ${filePath}`);
            removed++;
        }
    }

    // 5. Remove native agents (Entire folder)
    console.log('  5. Removing native agents...');
    if (removeDir(tool.paths.agents)) {
        console.log(`    ✓ Removed: ${tool.paths.agents}`);
        removed++;
    }

    // Note: Skills are preserved (user may have custom ones)

    console.log(`\n✅ ${tool.name}: Uninstalled (skills preserved, everything else removed)`);
    return removed;
}

function uninstallAntigravity() {
    const tool = TOOLS.antigravity;
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...\n`);

    let removed = 0;

    // 1. Remove Editor Config (~/.antigravity)
    console.log('  1. Removing editor config...');

    // 1.1 Remove Workflows (~/.antigravity/workflows/)
    if (removeDir(tool.paths.workflows)) {
        console.log(`    ✓ Removed: ${tool.paths.workflows}`);
        removed++;
    }

    // 1.2 Remove Agents (~/.antigravity/agents/)
    if (removeDir(tool.paths.agents)) {
        console.log(`    ✓ Removed: ${tool.paths.agents}`);
        removed++;
    }


    // 2. Remove Platform Config (~/.gemini)
    console.log('  2. Removing platform config...');

    // 2.1 Remove GEMINI.md, AGENT.md, CLAUDE.md
    const globalFiles = ["GEMINI.md", "AGENT.md", "CLAUDE.md"];
    for (const file of globalFiles) {
        const filePath = path.join(tool.paths.gemini, file);
        if (fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); removed++; } catch (e) { }
            console.log(`    ✓ Removed: ${filePath}`);
        }
    }

    // 2.2 Remove Global Agents Folder (~/.gemini/agents/)
    if (removeDir(tool.paths.globalAgents)) {
        console.log(`    ✓ Removed: ${tool.paths.globalAgents}`);
        removed++;
    }

    // 3. Remove Extension Brain (~/.gemini/antigravity)
    console.log('  3. Removing extension brain...');

    // 3.1 Remove Global Workflows (~/.gemini/antigravity/global_workflows)
    if (removeDir(tool.paths.globalWorkflows)) {
        console.log(`    ✓ Removed: ${tool.paths.globalWorkflows}`);
        removed++;
    }

    // 3.2 Remove Core Framework (~/.gemini/antigravity/skills/agent-assistant)
    console.log('    - Removing core framework...');
    if (removeDir(tool.paths.agentAssistant)) {
        console.log(`    ✓ Removed: ${tool.paths.agentAssistant}`);
        removed++;
    }

    // Note: Skills in ~/.gemini/antigravity/skills are preserved (except agent-assistant)

    console.log(`\n✅ ${tool.name}: Uninstalled (skills preserved, everything else removed)`);
    return removed;
}

function uninstallClaude() {
    const tool = TOOLS.claude;
    console.log(`\n🗑️  Uninstalling Agent Assistant from ${tool.name}...\n`);

    let removed = 0;

    // 1. Remove Global Config
    console.log('  1. Removing global config...');
    const claudeMd = path.join(tool.paths.home, 'CLAUDE.md');
    if (fs.existsSync(claudeMd)) {
        try { fs.unlinkSync(claudeMd); removed++; } catch (e) { }
        console.log(`    ✓ Removed: ${claudeMd}`);
    }

    // 2. Remove Commands
    console.log('  2. Removing commands...');
    if (removeDir(tool.paths.commands)) {
        console.log(`    ✓ Removed: ${tool.paths.commands}`);
        removed++;
    }

    // 3. Remove Native Agents
    console.log('  3. Removing native agents...');
    if (removeDir(tool.paths.agents)) {
        console.log(`    ✓ Removed: ${tool.paths.agents}`);
        removed++;
    }

    // 4. Remove Core Framework
    console.log('  4. Removing core framework...');
    if (removeDir(tool.paths.agentAssistant)) {
        console.log(`    ✓ Removed: ${tool.paths.agentAssistant}`);
        removed++;
    }

    // Note: Skills in ~/.claude/skills are preserved (except agent-assistant)

    console.log(`\n✅ ${tool.name}: Uninstalled (skills preserved, everything else removed)`);
    return removed;
}

// ============================================================================
// CLI Interface
// ============================================================================

function printBanner() {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🤖 Agent Assistant Framework Installer                      ║
║                                                               ║
║   Multi-agent orchestration for AI coding assistants          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);
}

function printUsage() {
    console.log(`
Usage: npx agent-assistant <command> [options]

Commands:
  install [tool]     Install for a specific tool (cursor, copilot, antigravity)
  install --all      Install for all supported tools
  uninstall [tool]   Uninstall from a specific tool
  list               List supported tools and installation status
  help               Show this help message

Examples:
  npx agent-assistant install cursor
  npx agent-assistant install --all
  npx agent-assistant uninstall copilot
  npx agent-assistant list
`);
}

function listTools() {
    console.log('\n📋 Supported Tools:\n');

    for (const [key, tool] of Object.entries(TOOLS)) {
        // Check for the agentAssistant path which all tools now have
        const installed = fs.existsSync(tool.paths.agentAssistant);
        const status = installed ? '✅ Installed' : '⬚ Not installed';

        console.log(`  ${key.padEnd(12)} ${tool.name.padEnd(25)} ${status}`);

        if (installed) {
            // Show installation details
            const details = [];
            if (key === 'cursor') {
                if (fs.existsSync(path.join(tool.paths.rules, 'agent-assistant.mdc'))) {
                    details.push('rules');
                }
            }
            if (key === 'copilot') {
                if (fs.existsSync(path.join(tool.paths.vsCodePrompts, 'agent-assistant.agent.md'))) {
                    details.push('VS Code prompts');
                }
            }
            if (key === 'antigravity') {
                const geminiPath = path.join(tool.paths.gemini, 'GEMINI.md');
                if (fs.existsSync(geminiPath)) {
                    const content = fs.readFileSync(geminiPath, 'utf8');
                    if (content.includes('AGENT-ASSISTANT-START')) {
                        details.push('GEMINI.md');
                    }
                }
            }
            if (key === 'claude') {
                if (fs.existsSync(path.join(tool.paths.home, 'CLAUDE.md'))) {
                    details.push('CLAUDE.md');
                }
            }
            if (details.length > 0) {
                console.log(`               ${' '.padEnd(25)} (${details.join(', ')})`);
            }
        }
    }
    console.log('');
}

async function promptToolSelection() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        console.log('\n📋 Select tools to install:\n');
        console.log('  1. Cursor');
        console.log('  2. GitHub Copilot');
        console.log('  3. Antigravity (Gemini)');
        console.log('  4. Claude Code');
        console.log('  5. All tools');
        console.log('  0. Cancel\n');

        rl.question('Enter your choice (0-5): ', (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function interactiveInstall() {
    const choice = await promptToolSelection();

    switch (choice) {
        case '1':
            installCursor();
            break;
        case '2':
            installCopilot();
            break;
        case '3':
            installAntigravity();
            break;
        case '4':
            installClaude();
            break;
        case '5':
            installCursor();
            installCopilot();
            installAntigravity();
            installClaude();
            break;
        case '0':
            console.log('\n❌ Installation cancelled.\n');
            break;
        default:
            console.log('\n❌ Invalid choice. Please enter 0-5.\n');
    }
}

// ============================================================================
// Main Entry Point
// ============================================================================

async function main() {
    const args = process.argv.slice(2);
    const command = args[0]?.toLowerCase();
    const target = args[1]?.toLowerCase();

    printBanner();

    if (!command || command === 'help' || command === '--help' || command === '-h') {
        printUsage();
        return;
    }

    switch (command) {
        case 'install':
            if (target === '--all' || target === 'all') {
                console.log('🚀 Installing for all supported tools...');
                installCursor();
                installCopilot();
                installAntigravity();
                installClaude();
                console.log('\n🎉 All installations complete!\n');
            } else if (target === 'cursor') {
                installCursor();
            } else if (target === 'copilot') {
                installCopilot();
            } else if (target === 'antigravity' || target === 'gemini') {
                installAntigravity();
            } else if (target === 'claude' || target === 'claude-code') {
                installClaude();
            } else if (!target) {
                await interactiveInstall();
            } else {
                console.log(`❌ Unknown tool: ${target}`);
                console.log('   Supported tools: cursor, copilot, antigravity, claude');
            }
            break;

        case 'uninstall':
            if (target === '--all' || target === 'all') {
                console.log('🗑️  Uninstalling from all tools...');
                uninstallCursor();
                uninstallCopilot();
                uninstallAntigravity();
                uninstallClaude();
                console.log('\n✅ All uninstallations complete!\n');
            } else if (target === 'cursor') {
                uninstallCursor();
            } else if (target === 'copilot') {
                uninstallCopilot();
            } else if (target === 'antigravity' || target === 'gemini') {
                uninstallAntigravity();
            } else if (target === 'claude' || target === 'claude-code') {
                uninstallClaude();
            } else {
                console.log(`❌ Please specify a tool: cursor, copilot, antigravity, claude, or --all`);
            }
            break;

        case 'list':
            listTools();
            break;

        default:
            console.log(`❌ Unknown command: ${command}`);
            printUsage();
    }
}

main().catch(console.error);
