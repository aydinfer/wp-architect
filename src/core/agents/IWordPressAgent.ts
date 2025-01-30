import { ClineProvider } from '../webview/ClineProvider';

export interface IWordPressAgent {
    clineProvider: ClineProvider;
    
    // Core methods that all agents must implement
    initialize(): Promise<void>;
    processMessage(message: string): Promise<string>;
    getRole(): string;
    getCapabilities(): string[];

    // Optional method for cleanup
    dispose?(): void;
}

export interface ProjectRequirements {
    projectType: 'plugin' | 'theme';
    projectName: string;
    description: string;
    features: string[];
    targetAudience: string[];
    wpVersion: string;
    phpVersion: string;
    dependencies: string[];
    database: {
        tables: string[];
        customPostTypes: string[];
        taxonomies: string[];
    };
    apis: {
        rest: boolean;
        customEndpoints: string[];
    };
    blocks: {
        required: boolean;
        types: string[];
    };
}