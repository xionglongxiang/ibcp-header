let document = `




/**  
 * Title            : 示例文件的名称  
 * Desc     : 示例文件的描述  
 * Copyright : 2024-07-15 16:59:09  
 * version   : 2024-07-15 16:59:09  
 * History   : 2020/2/19 by macanglian  
 * History   : 2021/2/19 by xlx  
 */

asdfasdfasfd

/**  
 * Title            : 示例文件的名称  
 * Desc     : 示例文件的描述  
 * Copyright : 2024-07-15 16:59:09  
 * version   : 2024-07-15 16:59:09  
 * History   : 2020/2/19 by macanglian  
 * History   : 2021/2/19 by xlx  
 */

sadfasdf
`

let reg = /\/\*\*[\w\W]*?\*\//;

console.log(document.match(reg)[0])

console.log('----')

console.log(document.replace(reg, ''))