
        class TerminalPortfolio {
            constructor() {
                this.output = document.getElementById('output');
                this.input = document.getElementById('command-input');
                this.commandHistory = [];
                this.historyIndex = -1;
                
                this.commands = {
                    help: this.showHelp.bind(this),
                    about: this.showAbout.bind(this),
                    skills: this.showSkills.bind(this),
                    projects: this.showProjects.bind(this),
                    experience: this.showExperience.bind(this),
                    education: this.showEducation.bind(this),
                    contact: this.showContact.bind(this),
                    clear: this.clearScreen.bind(this),
                    whoami: this.whoami.bind(this),
                    ls: this.listFiles.bind(this),
                    pwd: this.showPath.bind(this),
                    cat: this.catFile.bind(this),
                    date: this.showDate.bind(this),
                    echo: this.echo.bind(this),
                    neofetch: this.neofetch.bind(this)
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

            // Command implementations
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
                this.addToOutput(helpText);
            }

            showAbout() {
                const aboutText = `
<span class="success">About Me</span>

Hi! I'm Chethan Kailashnath, a result-driven Software Developer with over 5+ years 
of hands-on experience in both research and industry settings. I specialize in 
building scalable cloud solutions and automation tools.

I'm proficient in a wide range of programming languages including Python, Java, 
and Golang, with extensive experience in microservices architecture, DevOps, 
and cloud technologies. Currently working as a Software Engineer at Hewlett 
Packard Enterprise, where I focus on monitoring tools and infrastructure automation.

<span class="info">Current Focus:</span>
• Building scalable AAS Monitoring Tools with FastAPI and Next.js
• Developing Apache Airflow plugins and alerting systems
• Cloud infrastructure automation and observability
• Real-time monitoring and data pipeline optimization

<span class="warning">Fact:</span> I reduced manual infrastructure monitoring time by 40% and 
incident response time by 35% with my latest monitoring tool implementation!
                `;
                this.addToOutput(aboutText);
            }

            showSkills() {
                const skillsText = `
<span class="success">Technical Skills</span>

<span class="info">Programming Languages:</span>
├── Python               ████████████ Expert
├── Java                 ██████████   Advanced
├── Golang               ██████████   Advanced
├── Shell                █████████    Advanced
├── C++                  ███████      Intermediate
└── C                    ███████      Intermediate

<span class="info">Backend & Frameworks:</span>
├── FastAPI              ████████████ Expert
├── Flask                ███████████  Expert
├── Django               ██████████   Advanced
├── Node.js              █████████    Advanced
├── Spring Boot          ████████     Intermediate
└── Bootstrap            █████████    Advanced

<span class="info">Databases:</span>
├── MySQL                ████████████ Expert
├── MongoDB              ███████████  Expert
├── CRDB                 ████████     Intermediate
└── PostgreSQL           ███████      Intermediate

<span class="info">Cloud & DevOps:</span>
├── AWS EC2              ██████████   Advanced
├── Docker               ████████████ Expert
├── Kubernetes           ████████████ Expert
├── Helm2                ████████     Intermediate
├── Grafana 10           ███████████  Expert
└── Apache Airflow       ██████████   Advanced

<span class="info">Network & Protocols:</span>
├── HTTPS/TCP/IP         ████████████ Expert
├── DHCP/DNS             ██████████   Advanced
├── FTP/SMTP             ██████████   Advanced
├── SNMP/SPI             █████████    Advanced
└── gRPC                 ████████     Intermediate

<span class="info">Tools & Technologies:</span>
├── Postman              ████████████ Expert
├── Selenium             ███████████  Expert
├── JIRA/Confluence      ████████████ Expert
├── Git                  ████████████ Expert
└── Linux/Unix           ████████████ Expert
                `;
                this.addToOutput(skillsText);
            }

            showProjects() {
                const projectsText = `
<span class="success">Featured Projects</span>

<div class="project-item">
<span class="info">🔧 AAS Monitoring Tool</span>
Scalable monitoring tool for distributed infrastructure environments
• Built with FastAPI (Python) and Next.js
• Real-time server health data and alert tracking
• Geolocation mapping with Leaflet.js
• 40% reduction in manual monitoring time
<span class="warning">Impact:</span> Reduced incident response time by 35%
</div>

<div class="project-item">
<span class="info">📊 Dash_Tool Enhancement</span>
Enterprise dashboard deployment and validation tool
• Python3 with Grafana 7 & 10 API integration
• Multi-environment deployment capabilities
• Pre-validation system for dashboards and alerts
• Custom notification policies implementation
<span class="warning">Impact:</span> 40% reduction in deployment time, 30% fewer deployment errors
</div>

<div class="project-item">
<span class="info">📋 Log Collector Tool</span>
Kubernetes log collection and audit system
• Java, Spring Boot, Python, and Golang
• Fetches logs from all containers in K8s namespace
• HTTPS, TCP/IP, and FTP audit capabilities
• Pre-deployment validation system
<span class="warning">Impact:</span> 50% faster log collection, 30% fewer deployment failures
</div>

<div class="project-item">
<span class="info">⚙️ TIAMS Automation Tool</span>
Automated installation system for CFX-5000 call function platform
• Python and Selenium WebDriver automation
• Server installation and configuration
• Automated deployment workflows
• Configuration management integration
<span class="warning">Impact:</span> Saves 3 hours of manual work per installation
</div>

<div class="project-item">
<span class="info">🛡️ Certificate Authority Microservice</span>
Optimized CA microservice for configuration management
• Kubernetes, Java, Golang, and gRPC
• Istio service mesh for traffic management
• Performance metrics and monitoring
• Resource optimization and scaling
<span class="warning">Impact:</span> 30% reduction in resource footprint, 15% faster response time
</div>

Type 'cat project-name' for more details about any project.
                `;
                this.addToOutput(projectsText);
            }

            showExperience() {
                const experienceText = `
<span class="success">Work Experience</span>

<span class="info">Software Engineer</span> @ Hewlett Packard Enterprise
<span class="warning">August 2024 - Present (Remote, Chicago, USA)</span>
├── Developed scalable AAS Monitoring Tool using FastAPI and Next.js
├── Achieved 40% reduction in manual infrastructure monitoring time
├── Integrated real-time server health data and geolocation mapping
├── Built custom Apache Airflow plugins and alerting systems
├── Reduced incident response time by 35% and resolution time by 40%
└── Technologies: FastAPI, Python, Next.js, Apache Airflow, Flask

<span class="info">Software Engineer - Cloud</span> @ CISCO
<span class="warning">April 2024 - August 2024 (Remote, Chicago, USA)</span>
├── Upgraded Dash_Tool to support Grafana 7 modules using Python3
├── Extended tool lifecycle by 2 years with backward compatibility
├── Implemented Deploy subcommand with Grafana 10 API integration
├── Created pre-validation system reducing deployment errors by 30%
├── Developed custom notification policies improving response by 25%
└── Technologies: Python3, Grafana 7/10 API, Dashboard Management

<span class="info">Lab Automation Intern</span> @ NOKIA
<span class="warning">February 2023 - May 2023 (Naperville, USA)</span>
├── Engineered Log Collector Tool for Kubernetes pod log management
├── Built comprehensive audit tool for Kubernetes pre-deployment
├── Performed troubleshooting and debugging of K8s deployments
├── Reduced log collection time by 50% and deployment failures by 30%
├── Maintained uninterrupted service availability through proactive monitoring
└── Technologies: Java, Spring Boot, Python, Golang, Kubernetes

<span class="info">Software Developer (R&D)</span> @ NOKIA
<span class="warning">July 2019 - July 2021 (Bangalore, India)</span>
├── Spearheaded microservices for Life Cycle and Configuration Management
├── Developed automation tool for TIAMS platform installation
├── Optimized Certificate Authority microservice reducing footprint by 30%
├── Implemented Istio service for traffic management in K8s clusters
├── Generated performance metrics reducing response time by 15%
├── Managed client escalations coordinating with three teams
└── Technologies: Python, Java, Golang, Kubernetes, gRPC, Selenium
                `;
                this.addToOutput(experienceText);
            }

            showEducation() {
                const educationText = `
<span class="success">Education</span>

<span class="info">Master of Science in Computer Science (MSCS)</span>
Illinois Institute of Technology, Chicago, USA
<span class="warning">August 2021 - August 2023</span>
├── Advanced coursework in software engineering and system design
├── Research focus on intelligent automated systems
├── Practical experience with cloud technologies and DevOps
├── Collaborative projects with industry partnerships
└── Location: Chicago, USA

<span class="info">Master in Computer Application</span>
PES University, Bengaluru, India
<span class="warning">August 2016 - May 2019</span>
├── Comprehensive software development curriculum
├── Database management and system architecture
├── Web technologies and application development
├── Software engineering methodologies
└── Location: Bengaluru, India

<span class="info">Bachelor in Computer Application</span>
PES University, Bengaluru, India
<span class="warning">August 2013 - May 2016</span>
├── Foundational computer science concepts
├── Programming fundamentals and data structures
├── System analysis and design principles
├── Mathematics and algorithms
└── Location: Bengaluru, India

<span class="info">Publications:</span>
├── "Towards an Intelligent Automated Code Compliance System"
├── Authors: Nishanth Purushotham, Chethan Kailashnath & Dr Ivan Mutis
├── Published: i3CE 2023
├── DOI: https://ascelibrary.org/doi/abs/10.1061/9780784485224.007
└── Research focus: Automation and intelligent systems

<span class="info">Methodologies:</span>
├── SAFe Agile Engineering Methods
├── Software Development Life Cycle (SDLC)
├── DevOps and CI/CD practices
└── Research and development methodologies
                `;
                this.addToOutput(educationText);
            }

            showContact() {
                const contactText = `
<span class="success">Contact Information</span>

<span class="info">Let's connect! I'm always open to discussing new opportunities,
collaborations, or technical challenges in cloud infrastructure and automation.</span>

<div class="contact-item">📧 Email: chethankailashnath@gmail.com</div>
<div class="contact-item">📱 Phone: +1 (312) *** - ****</div>
<div class="contact-item">🌐 Website: ck.codes</div>
<div class="contact-item">💼 LinkedIn: linkedin.com/in/chethan-kailashnath</div>
<div class="contact-item">🐙 GitHub: github.com/chethankailashnath</div>
<div class="contact-item">📍 Location: Chicago, IL, USA</div>

<span class="warning">Response Time:</span> I typically respond within 24 hours!

<span class="info">Preferred Contact Methods:</span>
├── For job opportunities: Email or LinkedIn
├── For technical discussions: Email or GitHub
├── For collaborations: Email or Phone
├── For urgent matters: Phone
└── For everything else: Email works great!

<span class="info">Specializations:</span>
├── Cloud Infrastructure & Monitoring
├── DevOps & Automation Tools
├── Microservices Architecture
├── Kubernetes & Container Orchestration
└── Backend Development & APIs
                `;
                this.addToOutput(contactText);
            }

            clearScreen() {
                this.output.innerHTML = '';
            }

            whoami() {
                this.addToOutput('chethan', 'success');
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
                this.addToOutput(files);
            }

            showPath() {
                this.addToOutput('/home/chethan/portfolio', 'info');
            }

            catFile(args) {
                if (!args.length) {
                    this.addToOutput('Usage: cat [filename]', 'warning');
                    return;
                }

                const file = args[0].toLowerCase();
                switch(file) {
                    case 'about.txt':
                        this.showAbout();
                        break;
                    case 'skills.json':
                        this.showSkills();
                        break;
                    case 'experience.md':
                        this.showExperience();
                        break;
                    case 'education.txt':
                        this.showEducation();
                        break;
                    case 'contact.vcf':
                        this.showContact();
                        break;
                    case 'resume.pdf':
                        this.addToOutput('📄 Resume.pdf - Download available at: ck.codes/resume.pdf', 'info');
                        break;
                    default:
                        this.addToOutput(`cat: ${file}: No such file or directory`, 'error');
                }
            }

            showDate() {
                const now = new Date();
                this.addToOutput(now.toString(), 'info');
            }

            echo(args) {
                const text = args.join(' ');
                this.addToOutput(text || '', 'success');
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
                this.addToOutput(systemInfo);
            }
        }

        // Initialize the terminal when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new TerminalPortfolio();
        });