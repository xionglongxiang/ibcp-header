import vscode from 'vscode';

/**
 * @Title           : { 该文件的名称 }
 * @Description     : { 该文件的描述 }
 * @Author          : xionglongxiang
 * @createdTime     : 2024-07-15 20:53:10
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-16 13:17:33
 * @Copyright       : Copyright: Shanghai Batchsight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */
import generateTpl from './generateTpl';
import {
  extractContentByKey,
  getContentfromDocumentText,
  getHeaderfromDocumentText,
  OLD_HEADER_REG,
} from './utils';

export function replaceWholeOldHeader (documentText: string) {

  let header = getHeaderfromDocumentText(documentText);
  let content = getContentfromDocumentText(documentText);

  vscode.window.showInformationMessage('header: ' + header);
  vscode.window.showInformationMessage('content: ' + content);

  const history = extractContentByKey(header, 'history');
  const author = history.split(' by ')?.[1];
  const createdTime = history.split(' by ')?.[0];
  const title = extractContentByKey(header, 'title');
  const desc = extractContentByKey(header, 'desc');


  let updateHeader = header.replace(OLD_HEADER_REG, generateTpl({
    title,
    desc,
    author,
    createdTime,
  }));
  
  return updateHeader.replace(/[\s\n]+$/, '\n') + content;
}