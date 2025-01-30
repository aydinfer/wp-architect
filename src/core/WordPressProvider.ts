import * as vscode from 'vscode';
import { ClineProvider } from './webview/ClineProvider';
import { ProductOwnerAgent } from './agents/ProductOwnerAgent';
import { DeveloperAgent } from './agents/DeveloperAgent';
import { QAAgent } from './agents/QAAgent';

export class WordPressProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
    private productOwner: ProductOwnerAgent;
    private developer: DeveloperAgent;
    private qaAgent: QAAgent;
    private clineProvider: ClineProvider;

    constructor(private readonly context: vscode.ExtensionContext) {
        this.clineProvider = new ClineProvider(context, vscode.window.createOutputChannel("WP Architect"));
        this.productOwner = new ProductOwnerAgent(this.clineProvider);
        this.developer = new DeveloperAgent(this.clineProvider);
        this.qaAgent = new QAAgent(this.clineProvider);
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ) {
        this._view = webviewView;
        
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.context.extensionUri]
        };

        this.clineProvider.resolveWebviewView(webviewView);
    }

    public dispose() {
        // Clean up resources
        this.clineProvider.dispose();
    }
}