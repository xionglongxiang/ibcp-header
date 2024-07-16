/**
 * @Title           : { 该文件的名称 }
 * @Description     : { 该文件的描述 }
 * @Author          : xionglongxiang
 * @createdTime     : 2024-07-15 20:29:18
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-17 01:11:21
 * @Copyright       : Shanghai BatchSight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */
import * as vscode from 'vscode';

import createFileCallback from './createFileCallback';
import saveFileCallback from './main';

export function activate(context: vscode.ExtensionContext) {

  let fileSave = vscode.workspace.onDidSaveTextDocument((document) => {
    saveFileCallback(document);
  });

  let createFile = vscode.workspace.onDidCreateFiles(createFileCallback);
  context.subscriptions.push(fileSave, createFile);
}

export function deactivate() {}
