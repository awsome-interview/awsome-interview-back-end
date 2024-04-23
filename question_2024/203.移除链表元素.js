/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 */

/**
 * 方法一：递归
链表的定义具有递归的性质，因此链表题目常可以用递归的方法求解。这道题要求删除链表中所有节点值等于特定值的节点，可以用递归实现。

对于给定的链表，首先对除了头节点 head\textit{head}head 以外的节点进行删除操作，然后判断 head\textit{head}head 的节点值是否等于给定的 val\textit{val}val。如果 head\textit{head}head 的节点值等于 val\textit{val}val，则 head\textit{head}head 需要被删除，因此删除操作后的头节点为 head.next\textit{head}.\textit{next}head.next；如果 head\textit{head}head 的节点值不等于 val\textit{val}val，则 head\textit{head}head 保留，因此删除操作后的头节点还是 head\textit{head}head。上述过程是一个递归的过程。

递归的终止条件是 head\textit{head}head 为空，此时直接返回 head\textit{head}head。当 head\textit{head}head 不为空时，递

作者：力扣官方题解
链接：https://leetcode.cn/problems/remove-linked-list-elements/solutions/813358/yi-chu-lian-biao-yuan-su-by-leetcode-sol-654m/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 * @param {*} head 
 * @param {*} val 
 */
// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var removeElements = function (head, val) {
  if (head === null) {
    return head;
  }
  head.next = removeElements(head.next, val);
  return head.val === val ? head.next : head;
};
