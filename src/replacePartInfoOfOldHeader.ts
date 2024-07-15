import { format } from 'date-fns';

import { getGitAuthor } from './utils';

export function replacePartInfoOfOldHeader(content: string) {
  // 获取当前 Git 作者和当前时间
  const author = getGitAuthor(); // 这里需要实现获取 Git 作者的逻辑
  const time = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  // 使用正则表达式替换注释
  let updatedContent = content
    .replace(/(\* @LastModifiedBy\s*):\s+\S+/g, `$1: ${author}`)
    .replace(/(\* @LastModifiedTime\s*):\s+\S+ \S+/g, `$1: ${time}`);
  return updatedContent;
}