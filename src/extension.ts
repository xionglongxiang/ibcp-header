import * as vscode from 'vscode';

import { createFileCallback } from './createFileCallback';
import {
  saveFileWhenHeaderExistCallback,
} from './saveFileWhenHeaderExistCallback';

export function activate(context: vscode.ExtensionContext) {

  let fileSave = vscode.workspace.onDidSaveTextDocument((document) => {

    saveFileWhenHeaderExistCallback(document);
  });
  let disposable = vscode.workspace.onDidCreateFiles(createFileCallback);
  let manual = vscode.commands.registerCommand('ibcp-fileheader.fileheader', ()=> {
    let document = vscode.window.activeTextEditor?.document

    if (!document) return
    if (!document?.save) return
    const text = document.getText()
    document.save().then(() => {
      if (text.match(/[\n\s]*\/\*\*/) || text.match(/[\n\s]*\<\!\-\-/)) {
        vscode.window.showInformationMessage('match exist')
        saveFileWhenHeaderExistCallback(document);
      } else {  
        vscode.window.showInformationMessage('match not exist')
        createFileCallback(document);
      }
    })
  });  


  context.subscriptions.push(fileSave, disposable, manual);
}

export function deactivate() {}
