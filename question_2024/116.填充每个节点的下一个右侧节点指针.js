/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  let queue = [];
  queue.push(root);
  if (root === null) {
    return root;
  }
  while (queue.length) {
    let lengthLevel = queue.length;
    for (let i = 0; i < lengthLevel; i++) {
      // 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
      const node = queue.shift();
      //   要留出最后一个节点，拿到的node就是第一个节点，现在queue第一个节点就是下一个节点，可以用next链接
      if (i < lengthLevel - 1) {
        node.next = queue[0];
      }
      //   找到下一层的节点
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return root;
};
// @lc code=end
