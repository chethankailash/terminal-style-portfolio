// commands/system-commands.js - System and utility commands
export class SystemCommands {
    constructor(terminal) {
        this.terminal = terminal;
    }

    showHelp() {
        const helpText = `
<span class="success">Available Commands:</span>

<span class="info">Portfolio Commands:</span>
  about       - Learn about me
  skills      - View my technical skills
  projects    - See my projects
  experience  - View work experience
  education   - Academic background
  contact     - Get in touch

<span class="info">System Commands:</span>
  help        - Show this help message
  clear       - Clear the terminal
  whoami      - Display current user
  ls          - List directory contents
  pwd         - Show current directory
  cat [file]  - Display file contents
  date        - Show current date
  echo [text] - Display text
  neofetch    - System information

<span class="warning">Tips:</span>
- Use arrow keys to navigate command history
- Press Tab for command autocomplete
        `;
        this.terminal.addToOutput(helpText);
    }

    clearScreen() {
        this.terminal.output.innerHTML = '';
    }

    whoami() {
        this.terminal.addToOutput('chethan', 'success');
    }

    showDate() {
        const now = new Date();
        this.terminal.addToOutput(now.toString(), 'info');
    }

    echo(args) {
        const text = args.join(' ');
        this.terminal.addToOutput(text || '', 'success');
    }

    neofetch() {
        const systemInfo = `
<span class="ascii-art">

  ██████╗ ██╗  ██╗    ██████╗ ██████╗ ██████╗ ███████╗███████╗
 ██╔════╝ ██║ ██╔╝   ██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝
 ██║      █████╔╝    ██║     ██║   ██║██║  ██║█████╗  ███████╗
 ██║      ██╔═██╗    ██║     ██║   ██║██║  ██║██╔══╝  ╚════██║
 ╚██████╗ ██║  ██╗██╗╚██████╗╚██████╔╝██████╔╝███████╗███████║
  ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝   
</span>

<span class="success">chethan@ck.codes</span>
─────────────────────
<span class="info">OS:</span> Portfolio Linux 
<span class="info">Shell:</span> bash 5.1.8
<span class="info">IDE:</span> VS Code
<span class="info">Languages:</span> Python, Java, JS
<span class="info">Frameworks:</span> FastAPI, Flask, React, Node.js, Vue.js
<span class="info">Database:</span> MongoDB, PostgreSQL
<span class="info">Cloud:</span> AWS, Google Cloud
<span class="info">Status:</span> Available for opportunities
<span class="info">Coffee:</span> ████████████ 100%
        `;
        this.terminal.addToOutput(systemInfo);
    }
}