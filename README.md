1. 新增文件时，无需生成文件头，因为文件最终都是要保存的，保存时自动生成文件头。
   
2. 如果文件没有文件头，那么自动新增文件头。区分vue和其他文件。目前支持这些类型的文件：
 ".vue", ".mjs",".css",".scss", ".sass", ".js", ".ts", ".tsx", ".jsx"

3. 如果检测到文件有旧的文件头，自动提取旧的信息：文件创作者、创建时间、title、desc等。并转换文件头到新的规范、同时更新lastmodified信息：
```
/**  
 * Title            : 示例文件的名称  
 * Desc     : 示例文件的描述  
 * Copyright : 2024-07-15 16:59:09  
 * version   : 2024-07-15 16:59:09  
 * History   : 2020/2/19 by macanglian  
 * History   : 2021/2/19 by xlx  
 */

asdfasdf
 ```
将自动转换为：
```
/**
 * @Title           : 示例文件的名称
 * @Description     : 示例文件的描述
 * @Author          : macanglian
 * @createdTime     : 2020/2/19
 * @LastModifiedBy  : xionglongxiang
 * @LastModifiedTime: 2024-07-15 20:59:12
 * @Copyright       : Copyright: Shanghai Batchsight Pharmaceutical Technologies, Inc. Copyright(c) 2024
 */

asdfasdf
```