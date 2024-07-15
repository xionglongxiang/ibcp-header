function extractContentByKey(str, key) {  
  // 使用模板字符串和 RegExp 对象来动态构建正则表达式  
  // 注意：这里不需要全局匹配标志 'g'，因为我们只关心第一个匹配项  
  // 捕获组 ([^\\r\\n]*) 匹配 `key:` 后面的任意字符（除了换行符），直到行尾或遇到其他分隔符  
  // 但由于你的字符串中可能包含多个空格，所以使用 + 而不是 * 来确保至少匹配一个字符  
  const regex = new RegExp(`${key}\\s*:\\s*([^\\r\\n]+)`, 'i'); // 添加 'i' 标志以进行不区分大小写的匹配  
  
  // 执行匹配操作  
  const match = str.match(regex);  
  
  // 检查是否找到匹配项  
  if (match && match.length > 1) {  
    // 返回捕获组的内容（去除前后空白，尽管在这个特定情况下可能不是必需的，因为正则表达式已经用 \\s* 匹配了空白）  
    return match[1].trim();  
  }  
  
  // 如果没有找到匹配项，则返回 null 或其他适当的值  
  return null;  
}  
  
// 示例字符串  
let str = `  
/**  
 * Title            : 示例文件的名称  
 * Desc     : 示例文件的描述  
 * Copyright : 2024-07-15 16:59:09  
 * version   : 2024-07-15 16:59:09  
 * History   : 2020/2/19 by macanglian  
 * History   : 2021/2/19 by xlx  
 */ 
`;  
  
// 调用函数并打印结果  
console.log(extractContentByKey(str, 'Title')); // 应该输出: 示例文件的名称
console.log(extractContentByKey(str, 'desc')); // 应该输出: 示例文件的名称
console.log(extractContentByKey(str, 'history')); // 应该输出: 示例文件的名称