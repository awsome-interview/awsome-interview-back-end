/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = [],
    queue = [];
  queue.push(root);
  if (root === null) {
    return res;
  }
  while (queue.length) {
    let lengthLevel = queue.length,
      currentLevel = [];
    while (lengthLevel--) {
      const node = queue.shift();
      currentLevel.push(node.val);
      // 找到下一层的所有节点
      const childLength = node.children.length;
      for (let i = 0; i < childLength; i++) {
        queue.push(node.children[i]);
      }
    }
    res.push(currentLevel);
  }
  return res;
};
// @lc code=end
