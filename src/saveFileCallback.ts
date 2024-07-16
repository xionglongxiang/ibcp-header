/**
 * @Title           : { 该文件的名称 }
 * @Description     : { 该文件的描述 }
 * @Author          : xionglongxiang
 * @createdTime     : 2024-07-15 20:35:44
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-15 20:53:17
 * @Copyright       : Copyright: Shanghai Batchsight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */
import * as path from 'path';
import * as vscode from 'vscode';

import generateTpl from './generateTpl';
import { replacePartInfoOfOldHeader } from './replacePartInfoOfOldHeader';
import { replaceWholeOldHeader } from './replaceWholeOldHeader';

export function saveFileCallback (document: any) {
  document?.save().then(() => {
    const fileUri = document.uri;
    const extname = path.extname(fileUri.fsPath);
  
    if (![".vue", ".mjs",".css",".scss", ".sass", ".js", ".ts", ".tsx", ".jsx"].includes(extname)) {
      return;
    }
  
    // 读取文件内容
    vscode.workspace.fs.readFile(fileUri).then((buffer: any) => {
      const documentText = Buffer.from(buffer).toString('utf8');
  
      
      let updateddocumentText = '';
      if (documentText.match(/\* version\s*:/)) {
        updateddocumentText = replaceWholeOldHeader(documentText);
      } else if (documentText.match(/^[\n\s]*\/\*\*/) || documentText.match(/^[\n\s]*\<\!\-\-/)) {
        updateddocumentText = replacePartInfoOfOldHeader(documentText);
      } else {
        updateddocumentText = generateTpl({}, extname) + documentText;
      }
  
      vscode.workspace.fs
        .writeFile(fileUri, new TextEncoder().encode(updateddocumentText))
        .then(undefined, (error: any) => {
          console.error("Error updating file:", error);
        });
    });
  })
  
}