/**
 * @Title           : { 该文件的名称 }
 * @Description     : { 该文件的描述 }
 * @Author          : xionglongxiang
 * @createdTime     : 2024-07-15 20:35:44
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-17 01:13:09
 * @Copyright       : Shanghai BatchSight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */

import * as path from 'path';
import * as vscode from 'vscode';
import generateTpl from './generateTpl';
import updateJsDocHeader from './updateJsDocHeader';
import updateVueHeader from './updateVueHeader';
import {
  extnameList,
  getFormattedTime,
  getGitAuthor,
  isJsDocHeader,
  isVueHeader
} from './utils';

export default function (document: any) {
  document?.save().then(() => {
    const fileUri = document.uri;
    const extname = path.extname(fileUri.fsPath);

    if (!extnameList.includes(extname)) {
      return;
    }

    // 读取文件内容
    vscode.workspace.fs.readFile(fileUri).then((buffer: any) => {
      const documentText = Buffer.from(buffer).toString('utf8');
      const result = getNewDocument(documentText, extname);
      vscode.workspace.fs
        .writeFile(fileUri, new TextEncoder().encode(result))
        .then(undefined, (error: any) => {
          console.error("Error updating file:", error);
        });
    });
  });

}


function getNewDocument(documentText: string, extname: string): string {


  /** 文件内容为0，识别为新建，作者是当前编辑者 */
  if(documentText.length === 0) {
    // vscode.window.showInformationMessage("新文件, 添加文件头");
    return generateTpl({ Author: getGitAuthor(), CreatedTime: getFormattedTime(), extname});
  }

  if (documentText.length === 1 && documentText.charCodeAt(0) === 10) {
    // vscode.window.showInformationMessage("新css文件, 添加文件头");
    return generateTpl({ Author: getGitAuthor(), CreatedTime: getFormattedTime(), extname});
  }

  /** 以下都是有文件内容的，未标注作者，则识别为【未标注】*/

  if (extname === '.vue' && !isVueHeader(documentText)) {
    // vscode.window.showInformationMessage("旧vue文件, 添加文件头");
    return generateTpl({extname, Author: "未知", CreatedTime: "未知"}) + documentText;
  }

  /** 其他文件 没有文件头 */
  if (extname !== '.vue' && !isJsDocHeader(documentText)) {
    // vscode.window.showInformationMessage("旧文件, 添加文件头");
    return generateTpl({extname, Author: "未知", CreatedTime: "未知"}) + documentText;
  }


  if (extname === '.vue' && isVueHeader(documentText)) {
    // vscode.window.showInformationMessage("旧vue文件, 修正文件头");
    return updateVueHeader(documentText);
  }

  if (extname !== '.vue' && isJsDocHeader(documentText)) {
    // vscode.window.showInformationMessage("旧文件, 修正文件头");
    return updateJsDocHeader(documentText);
  }

  return documentText;
}
