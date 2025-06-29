// terminal.js - Main terminal interface and command processor
import { SystemCommands } from './commands/system-commands.js';
import { PortfolioCommands } from './commands/portfolio-commands.js';
import { FileCommands } from './commands/file-commands.js';

export class TerminalPortfolio {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('command-input');
        this.commandHistory = [];
        this.historyIndex = -1;
        
        // Initialize command modules
        this.systemCommands = new SystemCommands(this);
        this.portfolioCommands = new PortfolioCommands(this);
        this.fileCommands = new FileCommands(this);
        
        // Combine all commands into a single object
        this.commands = {
            // System commands
            help: this.systemCommands.showHelp.bind(this.systemCommands),
            clear: this.systemCommands.clearScreen.bind(this.systemCommands),
            whoami: this.systemCommands.whoami.bind(this.systemCommands),
            date: this.systemCommands.showDate.bind(this.systemCommands),
            echo: this.systemCommands.echo.bind(this.systemCommands),
            neofetch: this.systemCommands.neofetch.bind(this.systemCommands),
            
            // File system commands
            ls: this.fileCommands.listFiles.bind(this.fileCommands),
            pwd: this.fileCommands.showPath.bind(this.fileCommands),
            cat: this.fileCommands.catFile.bind(this.fileCommands),
            
            // Portfolio commands
            about: this.portfolioCommands.showAbout.bind(this.portfolioCommands),
            skills: this.portfolioCommands.showSkills.bind(this.portfolioCommands),
            projects: this.portfolioCommands.showProjects.bind(this.portfolioCommands),
            experience: this.portfolioCommands.showExperience.bind(this.portfolioCommands),
            education: this.portfolioCommands.showEducation.bind(this.portfolioCommands),
            contact: this.portfolioCommands.showContact.bind(this.portfolioCommands)
        };

        this.initEventListeners();
    }

    initEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocomplete();
            }
        });

        // Keep input focused
        document.addEventListener('click', () => {
            this.input.focus();
        });
    }

    processCommand() {
        const command = this.input.value.trim();
        
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
        }

        this.addToOutput(`chethan@ck.codes:~$ ${command}`, 'command');
        
        if (command) {
            const [cmd, ...args] = command.toLowerCase().split(' ');
            
            if (this.commands[cmd]) {
                this.commands[cmd](args);
            } else {
                this.addToOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
            }
        }

        this.input.value = '';
        this.scrollToBottom();
    }

    addToOutput(text, className = '') {
        const div = document.createElement('div');
        div.className = `output ${className}`;
        div.innerHTML = text;
        this.output.appendChild(div);
    }

    scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
        }
    }

    autocomplete() {
        const partial = this.input.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(partial));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addToOutput(matches.join('  '), 'info');
        }
    }
}