import * as path from 'path';
import * as vscode from 'vscode';

import generateTpl from './generateTpl';
import { replacePartInfoOfOldHeader } from './replacePartInfoOfOldHeader';
import { replaceWholeOldHeader } from './replaceWholeOldHeader';

export function saveFileWhenHeaderExistCallback (document: any) {
  document?.save().then(() => {
    const fileUri = document.uri;
    const extname = path.extname(fileUri.fsPath);
  
    if (![".vue", ".mjs",".css",".scss", ".sass", ".js", ".ts", ".tsx", ".jsx"].includes(extname)) {
      return;
    }
  
    // 读取文件内容
    vscode.workspace.fs.readFile(fileUri).then((buffer: any) => {
      const content = Buffer.from(buffer).toString('utf8');
  
      
      let updatedContent = '';
      if (content.match(/\* version\s*:/)) {
        updatedContent = replaceWholeOldHeader(content);
      } else if (content.match(/[\n\s]*\/\*\*/) || content.match(/[\n\s]*\<\!\-\-/)) {
        updatedContent = replacePartInfoOfOldHeader(content);
      } else {
        updatedContent = generateTpl({}, extname) + content; 
      }
  
      vscode.workspace.fs
        .writeFile(fileUri, new TextEncoder().encode(updatedContent))
        .then(undefined, (error: any) => {
          console.error("Error updating file:", error);
        });
    });
  })
  
}