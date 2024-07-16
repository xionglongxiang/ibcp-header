/**
 * @Title           : { 该文件的名称 }
 * @Description     : { 该文件的描述 }
 * @Author          : xionglongxiang
 * @createdTime     : 2024-07-15 20:29:18
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-15 20:34:06
 * @Copyright       : Copyright: Shanghai Batchsight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */
import * as vscode from 'vscode';

import {
  saveFileWhenHeaderExistCallback,
} from './saveFileWhenHeaderExistCallback';

export function activate(context: vscode.ExtensionContext) {

  let fileSave = vscode.workspace.onDidSaveTextDocument((document) => {

    saveFileWhenHeaderExistCallback(document);
  });
  let manual = vscode.commands.registerCommand('ibcp-fileheader.fileheader', ()=> {
    let document = vscode.window.activeTextEditor?.document

    if (!document) return
    saveFileWhenHeaderExistCallback(document);
  });  


  context.subscriptions.push(fileSave, manual);
}

export function deactivate() {}
