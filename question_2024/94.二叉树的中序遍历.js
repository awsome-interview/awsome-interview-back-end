/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  // 中序遍历：左中右
  // 第一种
  //   let res = [];
  //   const dfs = (_root) => {
  //     if (_root === null) return;
  //     dfs(_root.left);
  //     res.push(_root.val);
  //     dfs(_root.right);
  //     return res;
  //   };
  //   dfs(root);
  //   return res;
  // 第二种
  return root
    ? [
        // 中遍历：左中右
        // 递归左子树
        ...inorderTraversal(root.left),
        root.val,
        // 递归右子树
        ...inorderTraversal(root.right),
      ]
    : [];
};
// @lc code=end
