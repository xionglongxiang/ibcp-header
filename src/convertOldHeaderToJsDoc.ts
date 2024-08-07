/**
 * @Title           : { 该文件的名称 }
 * @Description     : { 该文件的描述 }
 * @Author          : xionglongxiang
 * @createdTime     : 2024-07-15 20:53:10
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-17 01:11:57
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
