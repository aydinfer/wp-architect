import { ClineProvider } from '../webview/ClineProvider';
import { IWordPressAgent, ProjectRequirements } from './IWordPressAgent';

export class ProductOwnerAgent implements IWordPressAgent {
    constructor(public clineProvider: ClineProvider) {}

    async initialize(): Promise<void> {
        await this.clineProvider.postMessageToWebview({
            type: 'systemPrompt',
            text: `You are a WordPress Product Owner and Architect. Your role is to:
1. Gather project requirements
2. Create detailed specifications
3. Plan architecture and database schema
4. Create development tasks
5. Ensure WordPress best practices
6. Maintain project quality standards

You understand WordPress:
- Plugin Development
- Theme Development
- Block Editor
- REST API
- Coding Standards
- Security Best Practices`
        });
    }

    async processMessage(message: string): Promise<string> {
        // Process messages from user and return appropriate responses
        if (message.toLowerCase().includes('requirements')) {
            return await this.gatherRequirements(message);
        }
        
        return 'I am your WordPress Product Owner. How can I help you with your WordPress project?';
    }

    private async gatherRequirements(message: string): Promise<string> {
        // Initialize requirements gathering process
        return `Let's gather the requirements for your WordPress project. Please tell me:
1. What type of project is this? (Plugin/Theme)
2. What is the main purpose of this project?
3. Who is the target audience?
4. What are the core features needed?
5. Any specific WordPress version requirements?
6. Will you need custom blocks?
7. Do you need REST API endpoints?
8. Any specific database requirements?`;
    }

    getRole(): string {
        return 'WordPress Product Owner & Architect';
    }

    getCapabilities(): string[] {
        return [
            'Requirements Gathering',
            'Project Planning',
            'Architecture Design',
            'Task Creation',
            'Quality Assurance',
            'WordPress Best Practices',
            'Project Management'
        ];
    }
}