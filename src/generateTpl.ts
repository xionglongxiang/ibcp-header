/**
 * @Title           : { 请补充该文件的名称 }
 * @Description     : { 请补充该文件的描述 }
 * @Author          : 未知
 * @createdTime     : 未知
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-17 01:11:23
 * @Copyright       : Shanghai BatchSight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */
import { getFormattedTime, getGitAuthor } from './utils';
interface ITplParams {
  Title?: string,
  Description?: string,
  Author: string,
  CreatedTime: string,
  LastModifiedBy?: string,
  LastModifiedTime?: string,
  extname?: string
}

export default function generateTpl (params: ITplParams) {

  let prefix = params?.extname === '.vue' ? '<!--' : '/**';
  let postfix = params?.extname === '.vue' ? '-->': '*/';

  let title = params?.Title || '{ 请补充该文件的名称 }';
  let desc = params?.Description || '{ 请补充该文件的描述 }';
  let author = params.Author;
  let createdTime = params.CreatedTime;
  let LastModifiedBy = getGitAuthor();
  let LastModifiedTime = getFormattedTime();
  let copyright = 'Shanghai BatchSight Pharmaceutical Technologies, Inc. Copyright(c) 2024';

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



