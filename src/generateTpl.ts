import { format } from 'date-fns';
import * as vscode from 'vscode';

import { getGitAuthor } from './utils';

interface ITplParams {
  title?: string,
  desc?: string,
  author?: string,
  createdTime?: string,
  LastModifiedBy?: string,
  LastModifiedTime?: string,
  copyright?: string,
}

export default function generateTpl (params?: ITplParams, extname?: string) {


  vscode.window.showInformationMessage('params: ' + JSON.stringify(params));


  let prefix = extname === '.vue' ? '<!--' : '/**';
  let postfix = extname === '.vue' ? '-->': '*/';
  const time = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  let title = params?.title || '{ 该文件的名称 }';
  let desc = params?.desc || '{ 该文件的描述 }';
  let author = params?.author || getGitAuthor();
  let createdTime = params?.createdTime || time;
  let LastModifiedBy = author;
  let LastModifiedTime = time;
  let copyright = params?.copyright || 'Copyright: Shanghai Batchsight Pharmaceutical Technologies, Inc. Copyright(c) 2024';

  return `${prefix}
 * @Title           : ${title}
 * @Description     : ${desc}
 * @Author          : ${author}
 * @createdTime     : ${createdTime}
 * @LastModifiedBy  : ${LastModifiedBy}
 * @LastModifiedTime: ${LastModifiedTime}
 * @Copyright       : ${copyright}
 ${postfix}
`;
}



