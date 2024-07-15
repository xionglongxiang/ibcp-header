import * as path from 'path';
import * as vscode from 'vscode';

import generateTpl from './generateTpl';

export function createFileCallback(document: any) {
  document?.save().then(() => {
    const fileUri = document.uri;
    const extname = path.extname(fileUri.fsPath);
    vscode.window.showInformationMessage(extname);
    if (![".vue", ".mjs",".css",".scss", ".sass", ".js", ".ts", ".tsx", ".jsx"].includes(extname)) {
      return;
    }
    vscode.workspace.fs.readFile(fileUri).then((buffer: any) => {
      const content = Buffer.from(buffer).toString('utf8');
      let template = generateTpl({}, extname);
      if (content.length === 0) {
        vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(template));
      } else {
        vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(template+ content));
      }
    });
  })
}
