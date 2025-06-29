// commands/file-commands.js - File system simulation commands
export class FileCommands {
    constructor(terminal) {
        this.terminal = terminal;
    }

    listFiles() {
        const files = `
<span class="info">drwxr-xr-x</span>  chethan  groot    about.txt
<span class="info">drwxr-xr-x</span>  chethan  groot    skills.json
<span class="info">drwxr-xr-x</span>  chethan  groot    projects
<span class="info">drwxr-xr-x</span>  chethan  groot    experience.md
<span class="info">drwxr-xr-x</span>  chethan  groot    education.txt
<span class="info">drwxr-xr-x</span>  chethan  groot    contact.vcf
<span class="info">drwxr-xr-x</span>  chethan  groot    resume.pdf
<span class="info">drwxr-xr-x</span>  chethan  groot    publications/
        `;
        this.terminal.addToOutput(files);
    }

    showPath() {
        this.terminal.addToOutput('/home/chethan/portfolio', 'info');
    }

    catFile(args) {
        if (!args.length) {
            this.terminal.addToOutput('Usage: cat [filename]', 'warning');
            return;
        }

        const file = args[0].toLowerCase();
        switch(file) {
            case 'about.txt':
                this.terminal.portfolioCommands.showAbout();
                break;
            case 'skills.json':
                this.terminal.portfolioCommands.showSkills();
                break;
            case 'experience.md':
                this.terminal.portfolioCommands.showExperience();
                break;
            case 'education.txt':
                this.terminal.portfolioCommands.showEducation();
                break;
            case 'contact.vcf':
                this.terminal.portfolioCommands.showContact();
                break;
            case 'resume.pdf':
                this.terminal.addToOutput('📄 Resume.pdf - Download available at: ck.codes/resume.pdf', 'info');
                break;
            default:
                this.terminal.addToOutput(`cat: ${file}: No such file or directory`, 'error');
        }
    }
}