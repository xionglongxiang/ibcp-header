/**
 * @Title           : { 请补充该文件的名称 }
 * @Description     : { 请补充该文件的描述 }
 * @Author          : 未知
 * @createdTime     : 未知
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-17 01:11:52
 * @Copyright       : Shanghai BatchSight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */
import generateTpl from './generateTpl';
import {
  extractContentByKey,
  getContentFromDocumentText,
  getHeaderFromDocumentText,
} from './utils';

export default function (documentText: string) {
  documentText = documentText || '';
  let header = getHeaderFromDocumentText(documentText);
  let content = getContentFromDocumentText(documentText);

  const Title = extractContentByKey(header, 'title') || extractContentByKey(header, '@Title');
  const Description = extractContentByKey(header, 'desc') || extractContentByKey(header, '@Description');

    const history = extractContentByKey(header, 'history');
  const Author = history?.split(' by ')?.[1] || extractContentByKey(header, '@Author');
  const CreatedTime = history?.split(' by ')?.[0] || extractContentByKey(header, '@CreatedTime');




  let updateHeader = generateTpl({
    Title,
    Description,
    Author,
    CreatedTime,
  });

  return updateHeader.replace(/[\s\n]+$/, '\n') + content;
}
