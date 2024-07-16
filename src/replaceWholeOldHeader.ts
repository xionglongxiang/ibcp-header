/**
 * @Title           : { 该文件的名称 }
 * @Description     : { 该文件的描述 }
 * @Author          : xionglongxiang
 * @createdTime     : 2024-07-15 20:53:10
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-15 20:53:16
 * @Copyright       : Copyright: Shanghai Batchsight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */
import generateTpl from './generateTpl';
import {
  extractContentByKey,
  OLD_HEADER_REG,
} from './utils';

export function replaceWholeOldHeader (fileContent: string) {

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
  
  return updateHeader.replace(/[\s\n]*$/, '') + content;
}