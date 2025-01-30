import * as vscode from 'vscode';
import { WordPressProvider } from './core/WordPressProvider';

let wpProvider: WordPressProvider;

export function activate(context: vscode.ExtensionContext) {
    wpProvider = new WordPressProvider(context);
    
    // Register our custom provider
    const disposable = vscode.window.registerWebviewViewProvider(
        "wp-architect.SidebarProvider",
        wpProvider
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {
    if (wpProvider) {
        wpProvider.dispose();
    }
}