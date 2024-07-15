import vscode from 'vscode';

import generateTpl from './generateTpl';
import {
  extractContentByKey,
  OLD_HEADER_REG,
} from './utils';

export function replaceWholeOldHeader (fileContent: string) {

  vscode.window.showInformationMessage(fileContent);

  let header = fileContent.match(OLD_HEADER_REG)?.[0] || '';
  const content = fileContent.replace(OLD_HEADER_REG, '');

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
  
  return updateHeader + content;
}