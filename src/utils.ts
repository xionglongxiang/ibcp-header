import { execSync } from 'child_process';

export function getGitAuthor(): string {
  try {
    // 执行Git命令来获取用户名
    const gitConfig = execSync("git config --get user.name", {
      encoding: "utf8",
    }).trim();
    return gitConfig;
  } catch (error) {
    // 如果Git命令执行失败（例如，不在Git仓库中），则返回一个默认值
    return "Not in a git repository, Unknown Author!";
  }
}

export const OLD_HEADER_REG = /^\/\*\*\s*\*\sTitle[\/\w\s\n:,*\*\/\(\)\{\u4e00-\u9fa5\}\.\*@-]*\*\//;


let reg = /\/\*\*[\w\W]*?\*\//;
export function getHeaderfromDocumentText(document: string) {
  try {
    let result = document.match(reg)?.[0];
    return result;
  } catch {
    return '';
  }
}

export function getContentfromDocumentText(document: string) {
  return document?.replace(reg, '');
}

export function extractContentByKey(str: string, key: string) {  
  // 使用模板字符串和 RegExp 对象来动态构建正则表达式    
  // 匹配 `key:` 后面的任意字符（除了换行符），直到行尾或遇到下一个 `*`（假设注释块每行都以 `*` 开始）  
  // \s* 匹配任意数量的空白字符  
  // (.*?) 是非贪婪匹配，确保只匹配到本行结束或遇到下一个 `*`  
  const regex = new RegExp(`${key}\\s*:\\s*(.*?)\\s*(?:\\*|$)`, 'im');  // 'm' 标志用于多行匹配  
    
  // 执行匹配操作    
  const match = str.match(regex);    
    
  // 检查是否找到匹配项    
  if (match && match.length > 1) {    
    // 返回捕获组的内容（已经通过非贪婪匹配和正则表达式处理了空白）  
    return match[1].trim();    
  }    
    
  // 如果没有找到匹配项，返回 null 表示未找到    
  return '';    
} 