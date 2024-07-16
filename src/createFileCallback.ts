/**
 * @Title           : { 请补充该文件的名称 }
 * @Description     : { 请补充该文件的描述 }
 * @Author          : 未知
 * @createdTime     : 未知
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-17 01:12:03
 * @Copyright       : Shanghai BatchSight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */
import * as path from 'path';
import * as vscode from 'vscode';

import generateTpl from './generateTpl';
import { getFormattedTime, getGitAuthor } from './utils';

export default function (event: vscode.FileCreateEvent) {
  for (const uri of event.files) {
    const filePath = uri.fsPath;
    let content: string | null = null;

    try {
      // 尝试异步读取文件内容
      vscode.workspace.fs.readFile(uri).then(uint8Array=> {


        content = Buffer.from(uint8Array).toString('utf8');
        const extname = path.extname(filePath);

        // 检查文件扩展名
        if ([".vue", ".mjs", ".css", ".scss", ".sass", ".js", ".ts", ".tsx", ".jsx"].includes(extname)) {
          let template = generateTpl({extname, Author: getGitAuthor(), CreatedTime: getFormattedTime()});

          // 将模板添加到文件内容的开头
          const newContent = template + content;

          // 异步写入新内容到文件
          vscode.workspace.fs.writeFile(uri, Buffer.from(newContent, 'utf8'));
        }
        // 如果文件是空的或读取时发生错误（但这里我们使用了try-catch来捕获错误）
      });

    } catch {
      console.log('error create file header');
    }
  }
}
