## 数据结构
数据结构(data structure)是带有结构特性的数据元素的集合，它研究的是数据的逻辑结构和数据的物理结构以及它们之间的相互关系，并对这种结构定义相适应的运算，设计出相应的算法，并确保经过这些运算以后所得到的新结构仍保持原来的结构类型。简而言之，数据结构是相互之间存在一种或多种特定关系的数据元素的集合，即带“结构”的数据元素的集合。“结构”就是指数据元素之间存在的关系，分为逻辑结构和存储结构。 
数据的逻辑结构和物理结构是数据结构的两个密切相关的方面，同一逻辑结构可以对应不同的存储结构。算法的设计取决于数据的逻辑结构，而算法的实现依赖于指定的存储结构。
数据结构的研究内容是构造复杂软件系统的基础，它的核心技术是分解与抽象。通过分解可以划分出数据的3个层次；再通过抽象，舍弃数据元素的具体内容，就得到逻辑结构。类似地，通过分解将处理要求划分成各种功能，再通过抽象舍弃实现细节，就得到运算的定义。上述两个方面的结合可以将问题变换为数据结构。这是一个从具体（即具体问题）到抽象（即数据结构）的过程。然后，通过增加对实现细节的考虑进一步得到存储结构和实现运算，从而完成设计任务。这是一个从抽象（即数据结构）到具体（即具体实现）的过程。 
### 树
树状图是一种数据结构，它是由n（n>=1）个有限结点组成一个具有层次关系的集合。把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。它具有以下的特点：
每个结点有零个或多个子结点；没有父结点的结点称为根结点；每一个非根结点有且只有一个父结点；除了根结点外，每个子结点可以分为多个不相交的子树；
#### 规律
#### 完全二叉树的公式
1. 第n层的节点数最多为2<sup>n</sup>
2. n层二叉树最多有2<sup>0</sup>+...+2<sup>n</sup>=2<sup>n+1</sup>-1个节点
3. 第一个非叶子节点：length/2
4. 一个节点的孩子节点：2n、2n+1
   
#### 插入，遍历，深度，查找
```js
   function Node(data, left, right) {
       this.data = data;
       this.left = left;
       this.right = right;
   }

   Node.prototype = {
       show: function () {
           console.log(this.data);
       }
   }

   function Tree() {
       this.root = null;
   }

   Tree.prototype = {
       insert: function (data) {
           var node = new Node(data, null, null);
           if (!this.root) {
               this.root = node;
               return;
           }
           var current = this.root;
           var parent = null;
           while (current) {
               parent = current;
               if (data < parent.data) {
                   current = current.left;
                   if (!current) {
                       parent.left = node;
                       return;
                   }
               } else {
                   current = current.right;
                   if (!current) {
                       parent.right = node;
                       return;
                   }
               }

           }
       },
       preOrder: function (node) {
           if (node) {
               node.show();
               this.preOrder(node.left);
               this.preOrder(node.right);
           }
       },
       middleOrder: function (node) {
           if (node) {
               this.middleOrder(node.left);
               node.show();
               this.middleOrder(node.right);
           }
       },
       laterOrder: function (node) {
           if (node) {
               this.laterOrder(node.left);
               this.laterOrder(node.right);
               node.show();
           }
       },
       getMin: function () {
           var current = this.root;
           while (current) {
               if (!current.left) {
                   return current;
               }
               current = current.left;
           }
       },
       getMax: function () {
           var current = this.root;
           while (current) {
               if (!current.right) {
                   return current;
               }
               current = current.right;
           }
       },
       getDeep: function (node, deep) {
           deep = deep || 0;
           if (node == null) {
               return deep;
           }
           deep++;
           var dleft = this.getDeep(node.left, deep);
           var dright = this.getDeep(node.right, deep);
           return Math.max(dleft, dright);
       },
       getNode: function (data, node) {
           if (node) {
               if (data === node.data) {
                   return node;
               } else if (data < node.data) {
                   return this.getNode(data, node.left);
               } else {
                   return this.getNode(data, node.right);
               }
           } else {
               return null;
           }
       }
   }

   var t = new Tree();
   t.insert(3);
   t.insert(8);
   t.insert(1);
   t.insert(2);
   t.insert(5);
   t.insert(7);
   t.insert(6);
   t.insert(0);
   console.log(t);
   t.middleOrder(t.root);
   console.log(t.getMin(), t.getMax());
   console.log(t.getDeep(t.root, 0));
   console.log(t.getNode(5, t.root));
```

```
{ root:
   { data: 3,
     left:
      { data: 1,
        left: { data: 0, left: null, right: null },
        right: { data: 2, left: null, right: null } },
     right:
      { data: 8,
        left:
         { data: 5,
           left: null,
           right:
            { data: 7,
              left: { data: 6, left: null, right: null },
              right: null } },
        right: null } } }

0
1
2
3
5
6
7
8
{ data: 0, left: null, right: null } { data: 8,
  left:
   { data: 5,
     left: null,
     right:
      { data: 7,
        left: { data: 6, left: null, right: null },
        right: null } },
  right: null }
5
{ data: 5,
  left: null,
  right:
   { data: 7,
     left: { data: 6, left: null, right: null },
     right: null } 
```

![avatar](http://images.qiufeihong.top/tree.jpg)

上述的查找运用了二分查找
#### 二分查找
二分查找的条件是必须是有序的线性表。

那目标值和线性表中的中点值进行比较，如果相等则返回他在表中的位置；如果小于，那线性表就要对折，起始不变，终点为线性表之前的中点；如果大于，那线性表就要对折，终点不变，起始为线性表之前的中点。依次迭代下去，如果找不到就返回-1

```
function binarySearch(data, arr, start, end) {
    if (start > end) {
        return -1;
    }
    var mid = Math.floor((end + start) / 2);
    if (data == arr[mid]) {
        return mid;
    } else if (data < arr[mid]) {
        return binarySearch(data, arr, start, mid - 1);
    } else {
        return binarySearch(data, arr, mid + 1, end);
    }
}
var arr = [0, 1, 1, 1, 1, 1, 4, 6, 7, 8]
console.log(binarySearch(1, arr, 0, arr.length-1));

```

#### 求二叉树的遍历
给定一棵二叉树的前序遍历和中序遍历，求其后序遍历

输入描述:

两个字符串，其长度n均小于等于26。 第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点。

输出描述:

输入样例可能有多组，对于每组测试样例， 输出一行，为后序遍历的字符串。

样例：
```
输入
ABC
BAC
FDXEAG
XDEFAG

输出
BCA
XEDGAF
```

和上面题目的思路基本相同

1. 前序遍历找到根结点root
2. 找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
3. 截取左子树的中序遍历、右子树的中序遍历
4. 截取左子树的前序遍历、右子树的前序遍历
5. 递归拼接二叉树的后序遍历

<pre>

let pre;
let vin;
 
while((pre = readline())!=null){
    vin = readline();
    print(getHRD(pre,vin));
}
 
    function getHRD(pre, vin) {
      if (!pre) {
        return '';
      }
      if (pre.length === 1) {
        return pre;
      }
      const head = pre[0];
      const splitIndex = vin.indexOf(head);
      const vinLeft = vin.substring(0, splitIndex);
      const vinRight = vin.substring(splitIndex + 1);
      const preLeft = pre.substring(1, splitIndex + 1);
      const preRight = pre.substring(splitIndex + 1);
      return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight) + head;
    }
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 144. 二叉树的前序遍历
给定一个二叉树，返回它的 前序 遍历。

 示例:
```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [1,2,3]
```
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

递归算法

```js
/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root, res = []) {
    if (root) {
        res.push(root.val)
        preorderTraversal(root.left, res)
        preorderTraversal(root.right, res)
    }
    return res
};
```
<pre>
√ Accepted
  √ 68/68 cases passed (76 ms)
  √ Your runtime beats 71.5 % of javascript submissions
  √ Your memory usage beats 46.63 % of javascript submissions (33.7 MB)
</pre>


迭代算法

1. 定义res和tmp数组
2. 目标节点进入res和tmp
3. 左孩子进入res和tmp，直到左边结束
4. 将tmp中的值出栈，右孩子进入，再执行2，3，4

```js
/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    let res = [],
        tmp = []
    let current = root
    while (current || tmp.length > 0) {
        while (current) {
            res.push(current.val)
            tmp.push(current)
            current = current.left
        }
        current = tmp.pop()
        current = current.right
    }
    return res
};
```
```
√ Accepted
  √ 68/68 cases passed (84 ms)
  √ Your runtime beats 37.76 % of javascript submissions
  √ Your memory usage beats 40.42 % of javascript submissions (33.7 MB)
```

> tip:2021-12-1更新

给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

示例 1：

![avatar](./../picture/144.jpg)

```
输入：root = [1,null,2,3]
输出：[1,2,3]
```

示例 2：
```
输入：root = []
输出：[]
```
示例 3：
```
输入：root = [1]
输出：[1]
```
示例 4：
![avatar](./../picture/144-1.jpg)

```
输入：root = [1,2]
输出：[1,2]
```
示例 5：
![avatar](./../picture/144-2.jpg)

```
输入：root = [1,null,2]
输出：[1,2]
``` 

提示：
```
树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100
``` 

进阶：递归算法很简单，你可以通过迭代算法完成吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-preorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// /**
//  * @param {TreeNode} root
//  * @return {number[]}
//  */
// var preorderTraversal = function (root) {
//     /**
//      * 前序遍历：根左右
//      * 一个参数递归，采用闭包存储res
//      */
//     let res = []
//     let recursive = function (root) {
//         // tip:节点都为空了，不可能还有val属性
//         // if (!root.val) return
//         if (!root) return
//         res.push(root.val)
//         // 左子树遍历
//         recursive(root.left)
//         // 遍历右子树
//         recursive(root.right)
//     }
//     recursive(root)
//     return res
// };
/**
 * 
 * @param  {TreeNode} root 
 * @param {number[]} res 
 * @returns {number[]}
 */
var preorderTraversal = function (root, res = []) {
    // /**
    //  * 前序遍历：根左右
    //  * 两个参数递归，非常简单
    //  */
    // if (!root) return res
    // res.push(root.val)
    // preorderTraversal(root.left, res)
    // preorderTraversal(root.right, res)
    // return res
    /**
     * 两个参数迭代
     * 使用 栈
     */
    if (!root) return res
    let stack = [root]
    let cur = null
    while (stack.length) {
        // 根节点先处理
        cur = stack.pop()
        res.push(cur.val)
        // 右节点先入栈，后出
        cur.right && stack.push(cur.right)
        // 左节点后入栈，先出
        cur.left && stack.push(cur.left)
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 94. 二叉树的中序遍历
给定一个二叉树，返回它的中序 遍历。

示例:
```
输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
```
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

迭代：

1. root或者stack不为空，循环不停止
2. 如果root不为空，root塞进stack，root被root的左分支替换
3. 如果root为空，root等于stack中的最后一个元素,root的值塞进res数组
4. root被root右分支替换
5. 最后返回res

```
/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    const stack = [];
    const res = [];
  
    while (root || stack.length) {
      if (root) {
        stack.push(root);
        root = root.left;
      } else {
        root = stack.pop();
        res.push(root.val);
        root = root.right;
      }
    }
  
    return res;
};
```

```
✔ Accepted
  ✔ 68/68 cases passed (88 ms)
  ✔ Your runtime beats 26.11 % of javascript submissions
  ✔ Your memory usage beats 41.05 % of javascript submissions (33.7 MB)
```


> tip:2021-12-1更新



给定一个二叉树的根节点 root ，返回它的 中序 遍历。

 

示例 1：

![avatar](./../picture/94.jpg)

```
输入：root = [1,null,2,3]
输出：[1,3,2]
```
示例 2：
```
输入：root = []
输出：[]
```
示例 3：
```
输入：root = [1]
输出：[1]
```
示例 4：
![avatar](./../picture/94-1.jpg)

输入：root = [1,2]
输出：[2,1]
示例 5：
![avatar](./../picture/94-2.jpg)
```
输入：root = [1,null,2]
输出：[1,2]
``` 

提示：

- 树中节点数目在范围 [0, 100] 内
- -100 <= Node.val <= 100


进阶: 递归算法很简单，你可以通过迭代算法完成吗？



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-inorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// /**
//  * @param {TreeNode} root
//  * @return {number[]}
//  */
// var inorderTraversal = function (root) {
//     /**
//      * 中序遍历：左根右
//      * 一个参数，采用闭包保存res
//      */
//     let res = []
//     let recursive = function (root) {
//         if (!root) return
//         recursive(root.left)
//         res.push(root.val)
//         recursive(root.right)
//     }
//     recursive(root)
//     return res
// };
/**
 * 
 * @param {TreeNode} root 
 * @param {number[]} res 
 * @returns {number[]}
 */
var inorderTraversal = function (root, res = []) {
    // /**
    //  * 中序遍历：左根右
    //  * 2 个参数，每次递归返回 res
    //  */
    // if (!root) return res
    // inorderTraversal(root.left, res)
    // res.push(root.val)
    // inorderTraversal(root.right, res)
    // return res
    /**
     * 迭代，使用栈
     * 入栈：左->右
     * 出栈：左->中->右
     */
    let cur = root
    let stack = []
    while (stack.length || cur) {
        if (cur) {
            // 处理左节点
            stack.push(cur)
            cur = cur.left
        } else {
            // 处理根节点
            cur = stack.pop()
            res.push(cur.val)
            // 处理右节点
            cur = cur.right
        }
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 145. 二叉树的后序遍历
给定一个二叉树，返回它的 后序 遍历。

示例:
```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [3,2,1]
```
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

递归算法

```js
/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root, res = []) {

    if (root) {
        postorderTraversal(root.left, res)
        postorderTraversal(root.right, res)
        res.push(root.val)
    }

    return res
};
```
```
√ Accepted
  √ 68/68 cases passed (88 ms)
  √ Your runtime beats 24.38 % of javascript submissions
  √ Your memory usage beats 38.52 % of javascript submissions (33.7 MB)
```

迭代算法

取跟节点为目标节点，开始遍历
1. 左孩子入栈 -> 直至左孩子为空的节点

2. 栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问

3. 栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3


/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
    let res = [],
        tmp = []
    // 标记为上一个访问的节点
    let last = null
    let current = root
    while (current || tmp.length > 0) {
        while (current) {
            tmp.push(current)
            current = current.left
        }
        current = tmp[tmp.length - 1]
        if (!current.right || current.right == last) {
            current = tmp.pop()
            res.push(current.val)
            last = current
            // 继续弹栈
            current = null
        } else {
            current = current.right
        }
    }
    return res
};
</pre>

<pre>
√ Accepted
  √ 68/68 cases passed (76 ms)
  √ Your runtime beats 71.18 % of javascript submissions
  √ Your memory usage beats 48.36 % of javascript submissions (33.7 MB)
</pre>

> tip:2021-12-1更新

给定一个二叉树，返回它的 后序 遍历。

示例:
```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [3,2,1]
```
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-postorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// /**
//  * @param {TreeNode} root
//  * @return {number[]}
//  */
// var postorderTraversal = function (root) {
//     /**
//      * 后序遍历：左右根
//      * 一个参数，采用闭包保存res
//      */
//     let res = []
//     let recursive = function (root) {
//         if (!root) return
//         recursive(root.left)
//         recursive(root.right)
//         res.push(root.val)
//     }
//     recursive(root)
//     return res
// };
/**
 * 
 * @param {TreeNode[]} root 
 * @param {number[]} res 
 * @returns {number[]}
 */
var postorderTraversal = function (root, res = []) {
    // /**
    //  * 后序遍历：左右根
    //  * 2 个参数，每次递归结束返回res
    //  */
    // if (!root) return res
    // postorderTraversal(root.left, res)
    // postorderTraversal(root.right, res)
    // res.push(root.val)
    // return res
    // /**
    //  * 迭代：利用栈
    //  * 入栈：左->右
    //  * 出栈：根->右->左 结果翻转
    //  */
    // if (!root) return res
    // let stack = [root]
    // let cur = null
    // do {
    //     // 根节点出栈
    //     cur = stack.pop()
    //     res.push(cur.val)
    //     // 左节点先入栈
    //     cur.left && stack.push(cur.left)
    //     // 右节点再入栈
    //     cur.right && stack.push(cur.right)
    // } while (stack.length)
    // return res.reverse()

    /**
     * 迭代：利用栈
     * 入栈：中->右->左
     * 出栈：左右中
     */
    if (!root) return res
    let stack = [root]
    let cur = null
    while (stack.length) {
        cur = stack.pop()
        if (!cur) {
            // tip:空的情况下，下一个要出栈，就是中
            res.push(stack.pop().val)
            continue
        }
        stack.push(cur)
        stack.push(null)
        cur.right && stack.push(cur.right)
        cur.left && stack.push(cur.left)
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 102. 二叉树的层序遍历
给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

 

示例：
二叉树：[3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
返回其层序遍历结果：
```
[
  [3],
  [9,20],
  [15,7]
]
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
    let res = [],
        queue = [root]
    if (!root) return res
    while (queue.length) {
        // 记录当前层级节点数
        let len = queue.length
        // 存放每一层的节点
        let curLevel = []
        for (let i = 0; i < len; i++) {
            // 出队 当前节点
            let node = queue.shift()
            curLevel.push(node.val)
            // 队列存放当前层的下一层节点
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        // 把每一层的结果放入res
        res.push(curLevel)
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 107. 二叉树的层次遍历 II
给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
例如：
给定二叉树 [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
返回其自底向上的层次遍历为：
```
[
  [15,7],
  [9,20],
  [3]
]
```
1. 先定义queue存储root节点，循环queue的长度，长度为0停止，每次循环，从queue底部出来一个节点crt，将crt放进stack中
2. 如果crt左和右的节点还有值，那就覆盖。
3. 第二个循环stack长度，crt是stack头部出来的值
4. 定义的maxLevel是最大层数，定义maxLevel长度的result数组，将crt值到塞进result

<pre>
/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层次遍历 II
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    
    var queue = [ {node : root, level : 0} ],
        crt,
        stack = [],
        maxLevel,
        result = [];
    
    if(!root)
        return result;
        
    while(queue.length > 0) {
        crt = queue.shift(); // dequeue()
        
        stack.push(crt);
        
        if(crt.node.right)
            queue.push( { node : crt.node.right, level : crt.level + 1 } );
            
        if(crt.node.left)
            queue.push( { node : crt.node.left, level : crt.level + 1 });
        
      maxLevel = crt.level + 1;
    }
    
    while(stack.length > 0) {
        crt = stack.pop();
        if(crt.level < maxLevel) {
            result.push([]);
            maxLevel--;
        }
        result[result.length - 1].push(crt.node.val);
        
    }
    
    return result;
};

</pre>

<pre>
✔ Accepted
  ✔ 34/34 cases passed (92 ms)
  ✔ Your runtime beats 32.74 % of javascript submissions
  ✔ Your memory usage beats 5.59 % of javascript submissions (35.6 MB)
</pre>

> tip:2021-12-1更新

给定一个二叉树，返回其节点值自底向上的层序遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

例如：
给定二叉树 [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
返回其自底向上的层序遍历为：
```
[
  [15,7],
  [9,20],
  [3]
]
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
    let res = [],
        queue = [root]
    if (!root) return res
    while (queue.length) {
        // 记录当前层级节点数
        let len = queue.length
        // 存放每一层的节点
        let curLevel = []
        for (let i = 0; i < len; i++) {
            // 出队 当前节点
            let node = queue.shift()
            curLevel.push(node.val)
            // 队列存放当前层的下一层节点
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        // 把每一层的结果放入res的头部，不需要翻转数组了
        res.unshift(curLevel)
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 199. 二叉树的右视图
给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

 

示例 1:

![avatar](./picture/199.jpg)
```
输入: [1,2,3,null,5,null,4]
输出: [1,3,4]
```
示例 2:
```
输入: [1,null,3]
输出: [1,3]
```
示例 3:
```
输入: []
输出: []
``` 

提示:

二叉树的节点个数的范围是 [0,100]
-100 <= Node.val <= 100 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-right-side-view
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
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
var rightSideView = function (root) {
    // 将当前节点入队
    let res = [],
        queue = [root]
    if (!root) return res
    while (queue.length) {
        let curLevel = []
        let len = queue.length
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            // 将当前节点出队塞入当前层级中
            if (i === len - 1) curLevel.push(node.val)
            // 将当前节点的左右节点入队
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        res.push(curLevel)
    }
    // 返回结果
    return res

};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 637. 二叉树的层平均值
给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。

 

示例 1：
```
输入：
    3
   / \
  9  20
    /  \
   15   7
输出：[3, 14.5, 11]
解释：
第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
``` 

提示：

节点值的范围在32位有符号整数范围内。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/average-of-levels-in-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
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
var averageOfLevels = function (root) {
    // 将当前节点入队
    let res = [],
        queue = [root]
    if (!root) return res
    while (queue.length) {
        let curLevel = []
        // 当前层级的节点个数
        let len = queue.length
        let total = 0
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            // 将当前层级中的节点求平均值
            total += node.val
            // 将当前节点的左右节点入队
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        curLevel.push(total / len)
        res.push(curLevel)
    }
    // 返回结果
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 429. N 叉树的层序遍历
给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。

树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。

 

示例 1：

![avatar](./picture/429.png)

```
输入：root = [1,null,3,2,4,null,5,6]
输出：[[1],[3,2,4],[5,6]]
```
示例 2：
![avatar](./picture/429-1.png)

```
输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
输出：[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
```

提示：

- 树的高度不会超过 1000
- 树的节点总数在 [0, 10^4] 之间

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
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
    // 将当前节点入队
    let res = [],
        queue = [root]
    if (!root) return res
    while (queue.length) {
        let curLevel = []
        // 当前层级的节点个数
        let len = queue.length
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            curLevel.push(node.val)
            // 将当前节点的孩子节点入队
            if (node.children.length) {
                for (let j = 0; j < node.children.length; j++) {
                    queue.push(node.children[j])
                }
            }
        }
        res.push(curLevel)
    }
    // 返回结果
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 515. 在每个树行中找最大值
给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。

 

示例1：
```
输入: root = [1,3,2,5,3,null,9]
输出: [1,3,9]
解释:
          1
         / \
        3   2
       / \   \  
      5   3   9 
```
示例2：
```
输入: root = [1,2,3]
输出: [1,3]
解释:
          1
         / \
        2   3
```
示例3：
```
输入: root = [1]
输出: [1]
```
示例4：
```
输入: root = [1,null,2]
输出: [1,2]
解释:      
           1 
            \
             2     
```
示例5：
```
输入: root = []
输出: []
``

提示：
```
二叉树的节点个数的范围是 [0,104]
-231 <= Node.val <= 231 - 1
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
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
var largestValues = function(root) {
    if (!root) return []
    let queue = [root]
    let maximums = []
  
    while (queue.length) {
      let max = Number.MIN_SAFE_INTEGER
      // 这里需要先缓存length 这个length代表当前层级的所有节点
      // 在循环开始后 会push新的节点 length就不稳定了
      let len = queue.length
      for (let i = 0; i < len; i++) {
        let node = queue[i]
        max = Math.max(node.val, max)
  
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
  
      // 本「层级」处理完毕，截取掉。
      for (let i = 0; i < len; i++) {
        queue.shift()
      }
  
      // 这个for循环结束后 代表当前层级的节点全部处理完毕
      // 直接把计算出来的最大值push到数组里即可。
      maximums.push(max)
    }
  
    return maximums
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 116. 填充每个节点的下一个右侧节点指针
给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

 

进阶：

- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 

示例：

![avatar](./picture/116.png)

```
输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
```

提示：

- 树中节点的数量少于 4096
- -1000 <= node.val <= 1000

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
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
    // 将当前节点入队
    if (!root) return root
    let queue = [root]
    while (queue.length) {
        // 当前层级的节点个数
        let len = queue.length
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            // 当前节点指向队头，最后一个节点指向null
            if (i < len - 1) {
                node.next = queue[0]
            }
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
    }
    // 返回完美二叉树
    return root
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 117. 填充每个节点的下一个右侧节点指针 II
给定一个二叉树
```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

 

进阶：

- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 

示例：
![avatar](./picture/117.png)

```
输入：root = [1,2,3,4,5,null,7]
输出：[1,#,2,3,#,4,5,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化输出按层序遍历顺序（由 next 指针连接），'#' 表示每层的末尾。
``` 

提示：

- 树中的节点数小于 6000
- -100 <= node.val <= 100

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
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
    if (!root) return root
    let queue = [root]
    while (queue.length) {
        let len = queue.length
        for (let i = 0; i < len; i++) {
            // 将该层节点遍历从头到尾出队
            let node = queue.shift()
            // 前一个节点指向后一节点
            if (i < len - 1) node.next = queue[0]
            // 换一层节点
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
    }
    return root
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 104. 二叉树的最大深度
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，
```
    3
   / \
  9  20
    /  \
   15   7
```
返回它的最大深度 3 。


根据题意得知，底层已经实现了TreeNode,只要计算二叉树的最大深度

递归
1. 需要递归每一层root，如果root的left和right没定义或者为空，则返回0
2. 在每次递归过程中，取出左边或者右边的最大值，然后加上1

<pre>
/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (root === undefined || root === null) {
        return 0
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

</pre>
<pre>
√ Accepted
  √ 39/39 cases passed (96 ms)
  √ Your runtime beats 54.83 % of javascript submissions
  √ Your memory usage beats 12.78 % of javascript submissions (37.4 MB)
</pre>

> tip:2021-12-1更新

```js
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
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return root
    let queue = [root],depth=0
    while (queue.length) {
        let len = queue.length
        depth+=1
        for (let i = 0; i < len; i++) {
            // 将该层节点遍历从头到尾出队
            let node = queue.shift()
            // 换一层节点
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
    }
    return depth
};
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 111. 二叉树的最小深度
Category|Difficulty|Likes|Dislikes
algorithms|Easy (39.81%)|148|-

Tags

tree | depth-first-search | breadth-first-search

Companies

Unknown

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
返回它的最小深度  2.
递归，分治，
1. root为空则返回0
2. 左孩子为空，则右孩子最小深度加1
3. 右孩子为空，则左孩子最小深度加1
4. 左右都有，那就是递归，重新执行1，2，3

```js
/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    if (!root) {
        return 0
    }
    if (!root.left) {
        return minDepth(root.right) + 1
    }
    if (!root.right) {
        return minDepth(root.left) + 1
    }
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1

};
```
<pre>
✔ Accepted
  ✔ 41/41 cases passed (88 ms)
  ✔ Your runtime beats 84.4 % of javascript submissions
  ✔ Your memory usage beats 78.39 % of javascript submissions (37 MB)
</pre>

> tip:2021-12-1更新 

```js
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
 * @return {number}
 */
var minDepth = function (root) {
    if (!root) return root
    let queue = [root],
        depth = 0
    while (queue.length) {
        let len = queue.length
        depth += 1
        for (let i = 0; i < len; i++) {
            // 将该层节点遍历从头到尾出队
            let node = queue.shift()
            // 换一层节点
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            // 左右节点都无，找到最小深度了
            if (!node.left && !node.right) return depth
        }
    }
    return depth
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 105. 从前序与中序遍历序列构造二叉树
根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出
```
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
```
返回如下的二叉树：
```
    3
   / \
  9  20
    /  \
   15   7
```


前序遍历：根左右
后序遍历：左根右

![avatar](http://images.qiufeihong.top/105.jpg)

<pre>
/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    p = i = 0
    build = function(stop) {
        if (inorder[i] != stop) {
            var root = new TreeNode(preorder[p++])
            root.left = build(root.val)
            i++
            root.right = build(stop)
            return root
        }
        return null
    }
    return build()
};


</pre>

<pre>
✔ Accepted
  ✔ 203/203 cases passed (108 ms)
  ✔ Your runtime beats 86.27 % of javascript submissions
  ✔ Your memory usage beats 91.53 % of javascript submissions (35.9 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 100. 相同的树
给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:
```
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
```
示例 2:
```
输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
```
示例 3:
```
输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```
根据题意得知，底层已经实现了TreeNode,只要判断是否是相同的树

1. 如果两者都为空，那么返回true
2. 如果两者有一者为空或者值不相同，那么返回false
3. 迭代每一层分支

<pre>
/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    if (!p && !q) return true
    if (!p || !q || p.val !== q.val) return false
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
</pre>

<pre>
✔ Accepted
  ✔ 57/57 cases passed (76 ms)
  ✔ Your runtime beats 72.47 % of javascript submissions
  ✔ Your memory usage beats 39.77 % of javascript submissions (33.7 MB)
</pre>


[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 101. 对称二叉树
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
```
    1
   / \
  2   2
   \   \
   3    3
```
说明:

如果你可以运用递归和迭代两种方法解决这个问题，会很加分。


根据题意得知，底层已经实现了TreeNode,只要判断是否是对称树

迭代

1. 需要迭代每一层p和q，判断p的left和q的right是否相同
2. 迭代中p和q其中只有一个为空，那肯定就是不对称

<pre>
/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    function middle(p, q) {
        if (p == null && q == null) return true
        if (p == null || q == null) return false
        return p.val == q.val && middle(p.left, q.right) && middle(p.right, q.left)
    }
    return middle(root, root)
};
</pre>
<pre>
√ Accepted
  √ 195/195 cases passed (88 ms)
  √ Your runtime beats 74.55 % of javascript submissions
  √ Your memory usage beats 38.91 % of javascript submissions (35.5 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 110. 平衡二叉树
Category|Difficulty|Likes|Dislikes
algorithms|Easy (49.05%)|151|-

Tags

tree | depth-first-search

Companies

bloomberg

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

示例 1:

给定二叉树 [3,9,20,null,null,15,7]
```
    3
   / \
  9  20
    /  \
   15   7
```
返回 true 。

示例 2:

给定二叉树 [1,2,2,3,3,null,null,4,4]
```
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```
返回 false 。

1. 递归
2. 给一个中间函数
3. 判断若是node为空，则返回0
4. 左孩子和右孩子递归
5. 如果左孩子右孩子和深度差大于1，则返回-1，否则返回二叉树的最大深度
6. 最后递归结束，判断是否等于-1

```js
/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    function middle(node) {
        if (!node) {
            return 0
        }
        let left = middle(node.left)
        let right = middle(node.right)
        if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
            return -1
        }
        return Math.max(left, right) + 1
    }
    return middle(root) != -1
};
```

<pre>
√ Accepted
  √ 227/227 cases passed (108 ms)
  √ Your runtime beats 49.74 % of javascript submissions
  √ Your memory usage beats 66.34 % of javascript submissions (37.4 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 226. 翻转二叉树
Category|Difficulty|Likes|Dislikes
--|--|--|--
algorithms|Easy (71.45%)|250|-

Tags

tree


Companies

Unknown


翻转一棵二叉树。

示例：

输入：
```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```
输出：
```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```
备注:
这个问题是受到 Max Howell 的 原问题 启发的 ：

谷歌：我们90％的工程师使用您编写的软件(Homebrew)，但是您却无法在面试时在白板上写出翻转二叉树这道题，这太糟糕了。
<pre>
/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if(root){
      let tmp=root.left
      root.left=root.right
      root.right=tmp
      invertTree(root.left)
      invertTree(root.right)
  }
  return root
};

</pre>

<pre>
✔ Accepted
  ✔ 68/68 cases passed (80 ms)
  ✔ Your runtime beats 52.46 % of javascript submissions
  ✔ Your memory usage beats 26.63 % of javascript submissions (33.8 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 230. 二叉搜索树中第K小的元素
Category|Difficulty|Likes|Dislikes
algorithms|Medium(65.90%)|92|-

Tags

binary-search | tree

Companies

bloomberg | google | uber

给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。

说明：
你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。

示例 1:
```
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 1
```
示例 2:

输入: root = [5,3,6,2,4,null,null,1], k = 3
```       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 3
```
进阶：
如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化 kthSmallest 函数？

递归思路正确

利用中序遍历生成数组，找到数组中第k小的数

但是运行有误
```js
/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    let arr = []
    middle(root, arr)

    if (k > 0 && k <= arr.length) {
        return arr[k - 1]
    }
        return null
  
};

function middle(node, arr) {
    if (node) {
        middle(node.left, arr)
        arr.push(node)
        middle(node.right, arr)
    }
}
```

<pre>
✘ Wrong Answer
  ✘ 0/91 cases passed (N/A)
  ✘ testcase: '[3,1,4,null,2]\n1'
  ✘ answer: NaN
  ✘ expected_answer: 1
  ✘ stdout:
</pre>

递归的正确方式
```js
/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    let res

    function middle(node) {
        if (node) {
            middle(node.left)
            if (--k === 0) {
                res = node.val
            }
            middle(node.right)
        }
    }
    middle(root)

    return res
};
```
<pre>
✔ Accepted
  ✔ 91/91 cases passed (92 ms)
  ✔ Your runtime beats 94.2 % of javascript submissions
  ✔ Your memory usage beats 56.94 % of javascript submissions (39.2 MB)

</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 链表
链表是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。链表由一系列结点（链表中每一个元素称为结点）组成，结点可以在运行时动态生成。每个结点包括两个部分：一个是存储数据元素的数据域，另一个是存储下一个结点地址的指针域。 相比于线性表顺序结构，操作复杂。由于不必须按顺序存储，链表在插入的时候可以达到O(1)的复杂度，比另一种线性表顺序快得多，但是查找一个节点或者访问特定编号的节点则需要O(n)的时间，而线性表和顺序表相应的时间复杂度分别是O(logn)和O(1)。
使用链表结构可以克服数组链表需要预先知道数据大小的缺点，链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。链表最明显的好处就是，常规数组排列关联项目的方式可能不同于这些数据项目在记忆体或磁盘上顺序，数据的存取往往要在不同的排列顺序中转换。链表允许插入和移除表上任意位置上的节点，但是不允许随机存取。链表有很多种不同的类型：单向链表，双向链表以及循环链表。链表可以在多种编程语言中实现。像Lisp和Scheme这样的语言的内建数据类型中就包含了链表的存取和操作。程序语言或面向对象语言，如C,C++和Java依靠易变工具来生成链表。
#### 从尾到头打印链表
题目

输入一个链表，按链表值从尾到头的顺序返回一个ArrayList


要了解链表的数据结构：

val属性存储当前的值，next属性存储下一个节点的引用。

要遍历链表就是不断找到当前节点的next节点，当next节点是null时，说明是最后一个节点，停止遍历。

因为是从尾到头的顺序，使用一个队列来存储打印结果，每次从队列头部插入。

<pre> 
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    const array = [];
    while(head){
        array.unshift(head.val);
        head = head.next;
    }
    return array;
}

</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 2. 两数相加
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

这道题的思路本身也不太难，主要考察的是对链表的操作，要理解链表的组成方式，增删查的方式。另一个就是按位进行加法计算，需要考虑进位（数a+数b+进位cin，返回数c和新的进位cin）。 

<pre> 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // list中放入值为0的链表
    var List = new ListNode(0);
    var head = List;
    var sum = 0;
    var carry = 0;
    // 当l1或l2不为空时或sum大于0
    while (l1 !== null || l2 !== null || sum > 0) {
        // 如果l1不为空
        if (l1 !== null) {
            // sum等于sum加上l1的值
            sum += l1.val;
            // l1转下一个
            l1 = l1.next;
        }
        if (l2 !== null) {
            sum += l2.val;
            l2 = l2.next;
        }
        // 如果总和大于10，那么进位等于1，取余数
        if (sum >= 10) {
            carry = 1;
            sum = sum - 10;
        }
        // head链表的头的下一个是sum
        head.next = new ListNode(sum);
        // 然后现在指向sum
        head = head.next;
        // 进位数放进sum
        sum = carry;
        // 清空进位
        carry = 0;

    }

    return List.next;
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 19. 删除链表的倒数第N个节点
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：
```
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```
说明：

给定的 n 保证是有效的。

进阶：

你能尝试使用一趟扫描实现吗？

<pre> 
/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// var removeNthFromEnd = function(head, n) {
//     let nodes = [],current = head;
//     while(current){
//         nodes.push(current);
//         current = current.next;
//     }
//     let originLen = nodes.length;
//     nodes.splice(nodes.length - n,1);
//     if(nodes.length === 0)
//         return null;
//     if(n === 1){
//         nodes[nodes.length - 1].next = null;
//     }else if(n  < originLen){
//         nodes[nodes.length - n].next = nodes[nodes.length - n + 1];
//     }
//     return nodes[0];
// };

var removeNthFromEnd = function(head, n) {
    let first = head, second = head;
    while (n > 0) {
      first = first.next
      n--
    }
    if (!first) return head.next;     // 删除的是头节点
    while (first.next) {
      first = first.next;
      second = second.next;
    }
    second.next = second.next.next;
    return head
}
</pre> 

> 2022.2.20更新

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // 双指针法
    // 先创建一个虚拟头结点的链表res
    let res=new ListNode(null,head)
    // 声明快慢链表
    let slow=fast=res
    // 循环n--，快指针先走
    while(n--){
        fast=fast.next
    }
    // 快慢指针同时走，当快指针为空就同时停下不走
    while(fast.next){
        slow=slow.next
        fast=fast.next
    }
    // 慢指针就跳过下一个指向下下一个节点
    slow.next=slow.next.next
    // 去掉虚拟头结点
    return res.next
};
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 203. 移除链表元素
给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。
 

示例 1：

![avatar](./picture/203.jpg)

```js
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```
示例 2：
```
输入：head = [], val = 1
输出：[]
```
示例 3：
```
输入：head = [7,7,7,7], val = 7
输出：[]
```

提示：
```
列表中的节点数目在范围 [0, 104] 内
1 <= Node.val <= 50
0 <= val <= 50
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-linked-list-elements
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    // 这里就涉及如下链表操作的两种方式：

    // 1. 直接使用原来的链表来进行删除操作。
    // 2. 设置一个虚拟头结点在进行删除操作。
    // 不用手动管理内存
    let newList = new ListNode(0, head)
    let current = newList
    // 遍历链表，current 表示当前节点
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next
            continue
        }
        current = current.next

    }
    // 最后返回的应该是新链表
    return newList.next
};
```
```
66 / 66 个通过测试用例
状态：通过
执行用时: 92 ms
内存消耗: 42.6 MB
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 206. 反转链表
Category|Difficulty|Likes|Dislikes
algorithms|Easy (63.67%)|553|-

Tags

linked-list

Companies

adobe | amazon | apple | bloomberg | facebook | microsoft | snapchat | twitter | uber | yahoo | yelp | zenefits

反转一个单链表。

示例:
```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```
进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

迭代：
1. 申明临时和最终列表
2. 临时列表头部存放的是起始列表的目前head，而尾部存放的是最终列表

<pre> 
/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    let tmp = null
    let newHead = null
    while (head !== null) {
        tmp = head
        head = head.next
        tmp.next = newHead
        newHead = tmp
    }
    return newHead
};
</pre> 

<pre> 
√ Accepted
  √ 27/27 cases passed (92 ms)
  √ Your runtime beats 40.17 % of javascript submissions
  √ Your memory usage beats 52.52 % of javascript submissions (34.9 MB)
</pre> 

----- 2021/11/25后续

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    // /**
    //  * 1. 双指针
    //  */
    // // 首先定义一个cur指针，指向头结点，再定义一个pre指针，初始化为null。
    // // 然后就要开始反转了，首先要把 cur->next 节点用tmp指针保存一下，也就是保存一下这个节点。
    // // 为什么要保存一下这个节点呢，因为接下来要改变 cur->next 的指向了，将cur->next 指向pre ，此时已经反转了第一个节点了。

    // // 接下来，就是循环走如下代码逻辑了，继续移动pre和cur指针。

    // // 最后，cur 指针已经指向了null，循环结束，链表也反转完毕了。 此时我们return pre指针就可以了，pre指针就指向了新的头结点。
    // let current = head,
    //     pre = null,
    //     temp = null
    // while (current) {
    //     temp = current.next
    //     current.next = pre
    //     // 更新pre 和current 指针
    //     pre = current
    //     current = temp
    // }
    // return pre

    /**
     * 2. 递归
     */
    return reverse(null, head)
};

var reverse = function (pre, head) {
    if (!head) return pre
    let temp = head.next
    head.next = pre
    // 更新pre
    pre = head
    // 一定要有返回值
    return reverse(pre, temp)
}
```
```
28 / 28 个通过测试用例
状态：通过
执行用时: 80 ms
内存消耗: 40 MB
```


> 2022.2.20更新

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let temp = pre = null,
    cur = head
    while (cur) {
        // 将当前指针的下一个节点存放在temp中
        temp = cur.next
        // 将当前指针指向pre
        cur.next = pre
        // 将当前指针赋值给pre
        pre = cur
        // 将temp存储的下一个节点赋值给当前
        cur = temp
    }
    return pre
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 707. 设计链表
设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。

在链表类中实现这些功能：
```
get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
```

示例：
```js
MyLinkedList linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
linkedList.get(1);            //返回2
linkedList.deleteAtIndex(1);  //现在链表是1-> 3
linkedList.get(1);            //返回3
```

提示：
```
所有val值都在 [1, 1000] 之内。
操作次数将在  [1, 1000] 之内。
请不要使用内置的 LinkedList 库。
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/design-linked-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
class LinkNode {
    constructor(val, next) {
        this.val = val
        this.next = next
    }
}
var MyLinkedList = function () {
    this._size = 0
    this._tail = null
    this._head = null
};
/**
 * 
 * @param {*} index 
 * @returns 
 */
MyLinkedList.prototype.getNode = function (index) {
    if (index < 0 || index >= this._size) return null
    // 创建虚拟头结点
    let current = new LinkNode(0, this._head)
    // 遍历找到该节点并返回
    while (index-- >= 0) {
        current = current.next
    }
    return current
}
/**
 * 获取到第index个节点数值，如果index是非法数值直接返回-1， 注意index是从0开始的，第0个节点就是头结点 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    if (index < 0 || index >= this._size) return -1
    // 获取当前节点的值
    return this.getNode(index).val
};

/** 
 * 在链表最前面插入一个节点，插入完成后，新插入的节点为链表的新的头结点
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    let newNode = new LinkNode(val, this._head)
    this._head = newNode
    this._size++
    if (!this._tail) {
        this._tail = newNode
    }
};

/** 
 * 在链表最后面添加一个节点
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    let newNode = new LinkNode(val, null)
    this._size++
    if (this._tail) {
        this._tail.next = newNode
        this._tail = newNode
        return
    }
    this._tail = newNode
    this._head = newNode
};

/** 
 * 
   在第index个节点之前插入一个新节点，例如index为0，那么新插入的节点为链表的新头节点。
    如果index 等于链表的长度，则说明是新插入的节点为链表的尾结点
    如果index大于链表的长度，则返回空
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index > this._size) return
    if (index <= 0) {
        this.addAtHead(val)
        return
    }
    if (index === this._size) {
        this.addAtTail(val)
        return
    }
    // 获取目标的上一个节点
    let node = this.getNode(index - 1)
    node.next = new LinkNode(val, node.next)
    this._size++
};

/**
 * 删除第index个节点，如果index 大于等于链表的长度，直接return，注意index是从0开始的 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index >= this._size) return
    if (index === 0) {
        this._head = this._head.next
        this._size--
        return
    }
    // 获取目标的上一个节点
    let node = this.getNode(index - 1)
    node.next = node.next.next
    // 尾结点
    if (index === this._size - 1) {
        this._tail = node
    }
    this._size--
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```

```
64 / 64 个通过测试用例
状态：通过
执行用时: 128 ms
内存消耗: 45.3 MB
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 数组
所谓数组，是有序的元素序列。若将有限个类型相同的变量的集合命名，那么这个名称为数组名。组成数组的各个变量称为数组的分量，也称为数组的元素，有时也称为下标变量。用于区分数组的各个元素的数字编号称为下标。数组是在程序设计中，为了处理方便， 把具有相同类型的若干元素按无序的形式组织起来的一种形式。这些无序排列的同类数据元素的集合称为数组。
数组是用于储存多个相同类型数据的集合。
#### 100万个成员的数组取第一个和最后一个是否有性能差距
答案显然是没有,因为数组是一块线性连续的内存,我们可以通过寻址公式一步取出对应的成员,这跟成员的位置没有关系.
#### 1. 两数之和
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

 

示例 1：
```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```
示例 2：
```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```
示例 3：
```
输入：nums = [3,3], target = 6
输出：[0,1]
``` 

提示：
```
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
只会存在一个有效答案
```
进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

我的思路很简单，先给一个空对象，再遍历数组中的每一个数字，让目标值和每个值做差，然后判断对象中是否有差，如果有则返回对象的该差的value和i，没有则将该下标对应的值和该下标作为key和value塞进对象中
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let map = {}
    for (let i = 0; i < nums.length; i++) {
        let tep = target - nums[i]
        let val = map.hasOwnProperty(tep)
        if (val) {
            return [map[tep], i]
        }
        map[nums[i]] = i
    }
};
```
方法二：哈希表求解

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    /**
     * 哈希表求解(array、set、map)
     * 这里采用 map，值作为键，索引所谓值
     * set无序，array存储太大不合适
     */
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            return [i, map.get(nums[i])]
        }
        map.set(target - nums[i], i)
    }
    return []
};
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 冒泡排序的方式
```js
function getNum(arr, sum) {
    if (!Array.isArray(arr)) return null;

    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > sum) continue;

        for (var j = 0; j < arr.length; j++) {
            if (arr[j] > sum) continue;

            if (arr[i] + arr[j] == sum) return [arr[i], arr[j]];
        }
    }

    return null;
}
```
#### 查找的方式

最终的结果是要找到和为sum的两个数，那么我们可以转换一种思路：默认第一个num1数已经存在，那么第二个数就是sum - num1，这就转换为从数组中查找的问题了。虽然和第一种方法很像，但是在有序数列中进行查找明显要快于逐个比较。
```js
function getNum(arr, sum) {
    if (!Array.isArray(arr)) return null;

    arr.sort();

    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > sum) continue;

        var restNum = sum - arr[i];

        // 考虑下为什么要 > i
        if (arr.indexOf(restNum) > i) return [arr[i], restNum];
    }

    return null;
}
```
这种解法的前提是需要对数组进行排序（快排），故时间复杂度为O(nlogn)，二分查找的时间复杂度为O(log2n)，最坏的情况是遍历了整个数组，即时间复杂度为O(n)，那么整体的时间复杂度为O(nlog2n)，效果上要优于冒泡排序的方式。

#### - 快排方式
同样需要对数组进行排序（升序），我们知道排序后的数组必然是左边的数不会超过右边的数，因此我们可以把左边的数和右边的数的和作为基准值来和目标值比较，如果该值小于目标值，那么代表两个加数的值不够大，右边的值已经到达顶峰了，那么就从左边取下一个值相加和目标值比较，如果该值比目标值大，那么表示右边的值太大了，需要获取一个小一点的加数，这时需要从右边取倒数第二个数相加后比较，如果此时的值和目标值相等，恭喜你，我的小乖乖，原来你俩在这里！说了这么多感觉还是一头雾水的同学直接看代码吧，毕竟我们都是同一类猿:-)
```js
function getNum(arr, sum) {
    if (!Array.isArray(arr)) return null;

    arr.sort();

    for (var i = 0, j = arr.length - 1; i < j;) {
        if (arr[i] + arr[j] < sum) i++;

        else if (arr[i] + arr[j] > sum) j--;

        else return [arr[i], arr[j]];
    }

    return null;
}
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 4. 寻找两个有序数组的中位数
给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

示例 1:
```
nums1 = [1, 3]
nums2 = [2]
```

则中位数是 2.0
示例 2:
```
nums1 = [1, 2]
nums2 = [3, 4]
```
则中位数是 (2 + 3)/2 = 2.5

这道题的思路本身也不太难，主要是看看你对数组的api熟不熟，比如常见的push，sort等。

1. 先将两个数组塞进第三个数组中，这个数组进行正排或逆排，然后筛选中位数
2. 再取数组长度，判断是偶数还是奇数，奇数则取最中间的数，偶数取最中间的两者的平均数

```js
/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    var nums = new Array()
    var medianVal
    for (let i in nums1) {
        nums.push(nums1[i])
    }
    for (let j in nums2) {
        nums.push(nums2[j])
    }
    nums.sort(function (a, b) {
        return a - b
    })
    var l = nums.length
    if (l % 2 !== 0) {
        medianVal = nums[(l - 1) / 2]
    } else {
        medianVal = (nums[l / 2 - 1] + nums[l / 2]) / 2
    }
    return medianVal
};
```


> 2022/2/21更新

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    let arr = nums1.concat(nums2)
    arr.sort((a, b) => a - b)
    let len = arr.length, mid = Math.floor(len / 2)
    if (len % 2 === 0) {
        // 长度为偶数
        return (arr[mid - 1] + arr[mid]) / 2
    } else {
        return arr[mid]
        // 长度为奇数
    }
};
// @lc code=end
console.log(findMedianSortedArrays([2], []))
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 11. 盛最多水的容器
给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

![avatar](./picture/11.jpg)

图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

示例:
```
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```

Math.min() 返回零个或更多个数值的最小值。

Math.max() 返回零个或更多个数值的最大值。

有图可知，必须两头往中间走，取出最大的面积

1. 定义i和j
2. i从头开始往后走
3. j从后往前走
4. 如果i < j，则可以继续运行
5. 取height[i]和height[j]中的最小值和距离乘
6. 与之前的面积比较，取最大值
7. 判断height[i]和height[j]的大小，哪个大则另一个往大的靠，相等则一起走

<pre> 
/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    // var max = 0
    // var min = 0
    // var arrArea = []
    // for (let i in height) {
    //     for (let j = 1; height.length - j > i; j++) {
    //         min = Math.min(height[height.length - j], height[i])
    //         area = min * (height.length - j - i)
    //         arrArea.push(area)
    //     }
    // }
    // for (let j in arrArea) {
    //     max = Math.max(arrArea[j], max)
    // }
    let maxArea = 0
    let i = 0
    let j = height.length - 1
    while (i < j) {
        maxArea = Math.max(maxArea, Math.min(height[i], height[j]) * (j - i))
        if (height[i] > height[j]) {
            j--
        } else if (height[i] < height[j]) {
            i++
        } else {
            j--
            i++
        }
    }
    return maxArea
};
</pre> 
   
[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 15. 三数之和
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。
```
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

1. 先判断数组长度，小于3则返回空数组
2. 对数组排序（升序）
3. 对数组进行遍历，索引为i变量，如果每个值都大于0，则也返回空数组；
4. 对数组遍历，索引为j变量，是i的后一位，索引为k变量，是数组的最后一位，保持j小于k
5. 如果第i，j，k个值之和为0，则返回i，j，k的数组，然后继续找，j向后移，k向前移
6. 当j小于k并且第j和j-1个值相等，往后移一位
7. 当j小于k并且第k和k+1个值相等，往前移一位
8. 如果之和大于0，则k往前移，否则j往后移 

<pre> 
/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    arr = []
    if (nums.length < 3) {
        return arr
    }
    nums = nums.sort(function (a, b) {
        return a - b
    })
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) {
            return arr
        }
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue
        }

        for (var j = i + 1, k = nums.length - 1; j < k;) {
            if (nums[i] + nums[j] + nums[k] === 0) {
                arr.push([nums[i], nums[j], nums[k]])
                j++;
                k--;
                while (j < k && nums[j] == nums[j - 1]) {
                    j++
                }
                while (j < k && nums[k] == nums[k + 1]) {
                    k--
                }
            } else if (nums[i] + nums[k] + nums[j] > 0) {
                k--
            } else {
                j++
            }
        }
    }
    return arr
};
</pre> 

> 2022.2.20更新

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let res = [],
    len = nums.length
    // 长度小于3返回空数组
    if (len < 3) return []
    // 先排序
    nums.sort((a, b) => a - b) 
    // a从0开始到最后第三个数
    for (let i = 0; i < len - 2; i++) {
        if (nums[i] > 0) break
        // a去重
        if (i > 0 && nums[i] === nums[i - 1]) continue 
        // b从第二个开始，c从最后一个数开始
        let left = i + 1,right = len - 1
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right]
            // 当前值+左边值+右边值>0，那么右边往前移动来缩小和
            if (sum > 0) {
                right--
                continue
            }
            if (sum < 0) {
                // 当前值+左边值+右边值<0，那么左边往后移动来增大和
                left++
                continue
            }
            res.push([nums[i], nums[left], nums[right]])
            // b去重
            // 左边值若相等，往后移去重
            while (left < right && nums[left] === nums[++left]);
            // c去重
            // 右边值若相等，往前移去重
            while (left < right && nums[right] === nums[--right]);
        }
    }
    return res
};
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 16. 最接近的三数之和
给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```

方法有点笨

- a1:原数组三数值和所有可能值的数组
- a2:a1遍历后取距离值的数组
- a3:对a2排序
- a4:a1的模板

1. 先判断数组长度，小于3则直接返回数组和
2. 对数组排序（升序）
3. 双重循环:最外层对数组进行遍历，索引为i变量;最内层对数组遍历，索引为j变量，是i的后一位，索引为k变量，是数组的最后一位，保持j小于k
4. 如果第i，j，k个值之和为target，则返回target
5. 如果第i，j，k个值之和大于target，则和值push进a1,并且k往前移一位
6. 如果第i，j，k个值之和小于target，则和值还是push进a1,并且j往后移一位
7. 然后a1遍历,每个值与target做差和绝对值,获取的值放进a2和a4
8. a3是a2排序后的结果(升序)
9. 在a4中取a3最小值的索引位
10. 最后返回a1中的值  

<pre> 
/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    let sum = 0
    let a1 = []
    let a2 = []
    let a3 = []
    let a4 = []
    let index
    if (nums.length <= 3) {
        sum = nums.reduce((prev, next) => {
            return prev + next
        })
        return sum
    }
    nums = nums.sort((a, b) => {
        return a - b
    })
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1, k = nums.length - 1; j < k;) {
            if ((nums[i] + nums[j] + nums[k]) === target) {
                return target
            } else if ((nums[i] + nums[j] + nums[k]) > target) {
                a1.push(nums[i] + nums[j] + nums[k])
                k--
            } else {
                a1.push(nums[i] + nums[j] + nums[k])
                j++
            }
        }
    }

    a1.forEach(item => {
        a2.push(Math.abs(item - target))
        a4.push(Math.abs(item - target))
    })


    a3 = a2.sort((a, b) => {
        return a - b
    })

    index = a4.indexOf(a3[0])
    return a1[index]

};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 18. 四数之和

给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

示例：
```
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

<pre> 
/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */

// 未成功
// var fourSum = function (nums, target) {
//     let arr = []
//     if (nums.length < 4) {
//         return arr
//     }
//     nums = nums.sort((a, b) => {
//         return a - b
//     })
//     for (let i = 0; i < nums.length - 3; i++) {
//         if (nums[i] > target) {
//             return arr
//         }
//         for (let j = i + 1; j < nums.length - 2; j++) {
//             for (let k = j+1, l = nums.length - 1; k < l;) {
//                 // console.log(i, j, k, l)
//                 // console.log(nums[i] + nums[j] + nums[k] + nums[l])
//                 if ((nums[i] + nums[j] + nums[k] + nums[l]) === target) {
//                     arr.push([nums[i], nums[j], nums[k], nums[l]])
//                     k++;
//                     l--
//                     while (k < l && nums[j] === nums[j - 1]) {
//                         j++
//                     }
//                     while (k < l && nums[k] === nums[k - 1]) {
//                         k++
//                     }
//                     while (k < l && nums[l] === nums[l + 1]) {
//                         l--
//                     }
//                 } else if ((nums[i] + nums[j] + nums[k] + nums[l]) > target) {
//                     l--
//                 } else {
//                     k++
//                 }
//             }
//         }
//     }
//     return arr
// };

// var fourSum = function(nums, target) {
//     const counts = new Map();  // counts of elements in `nums`
//     const aPlusB = new Map();  // sum tuples e.g. 5 => [[2, 3], [1, 4], ... ]
//     for (let i = 0; i < nums.length - 1; i++) {
//         counts.set(nums[i], (counts.get(nums[i]) || 0) + 1);
//         for (let j = i + 1; j < nums.length; j++) {
//             let a = nums[i], b = nums[j];
//             aPlusB.set(a + b, [...aPlusB.get(a + b) || [], [a, b]]);
//         }
//     }
//     counts.set(nums[nums.length - 1], (counts.get(nums[nums.length - 1]) || 0) + 1);
//     const res = new Set();  // Sets are unique, so no worries about duplicates
//     for (let i = 0; i < nums.length - 1; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             let c = nums[i], d = nums[j];
//             if (!aPlusB.has(target - c - d)) continue;  // move on if wrong sum
//             aPlusB.get(target - c - d)
//                 .forEach(ab => {
//                     const abcd = [...ab, c, d];
//                     if (!abcd.some(e => abcd.reduce((qty, a) => qty + (a === e), 0) > counts.get(e))) {
//                         res.add(abcd.sort().join(','));
//                     }
//                 });
//         }
//     }
//     return [...res].map(abcd => abcd.split(',').map(e => parseInt(e)));
// };

var fourSum = function (nums, target) {
    nums = nums.sort(function (a, b) {
        return a - b
    }); //先排序
    var arr = [];
    for (i = 0; i < nums.length - 3; i++) { //第一个
        if (i > 0 && nums[i - 1] == nums[i]) continue
        for (j = i + 1; j < nums.length - 2; j++) { //第二个
            if (j > i + 1 && nums[j - 1] == nums[j]) continue
            var k = nums.length - 1
            var c = j + 1;
            while (c < nums.length - 1 && c != k) { //第三个
                var sum = nums[i] + nums[j] + nums[c] + nums[k]
                if (c > j + 1 && nums[c] == nums[c - 1]) {
                    c++;
                    continue;
                }
                if (k < nums.length - 1 && nums[k] == nums[k + 1]) {
                    k--;
                    continue;
                }
                if (sum == target) {
                    arr.push([nums[i], nums[j], nums[c], nums[k]]);
                    c++
                    k = nums.length - 1
                } else if (sum < target) {
                    c++
                } else {
                    k--
                }
            }
        }
    }
    return arr
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 26. 删除排序数组中的重复项
> 新的版本 2022-1-4
```js
/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */
// @lc code=start
/**
 * @param{number[]}nums
 * @return{number}
 */
varremoveDuplicates = function (nums) {
    // 不要使用额外的数组空间，你必须在 原地 修改输入数组
    /**
     * 双指针法
     * 快慢指针
     */
    letslow = 0
    for (letfast = 0; fast <= nums.length - 1; fast++) {
        // 如果前后值不相等，那就处理，否则就跳过当前重复值
        if (nums[fast] !== nums[fast + 1]) {
            nums[slow++] = nums[fast]
        }
    }
    returnslow
};
// @lc code=end
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))
```

> 旧的版本
给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

示例 1:
```
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。

```
示例 2:
```
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```
说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:
```
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

读题:内部操作十分关键

无需再return

也就是说下面这段类似
```js
var removeDuplicates = function(nums) {
    for (i = 0; i < nums.length; i++) {
        //Next number is identical to current one
        if (nums[i] == nums[i+1]) {
            nums.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < nums; i++) {
    console.log(nums[i]);
}
};
```
<pre> 
/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    for (i = 0; i < nums.length; i++) {
        //Next number is identical to current one
        if (nums[i] == nums[i+1]) {
            nums.splice(i, 1);
            i--;
        }
    }
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 27. 移除元素
> 新的版本 2022-1-4
```js
/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */
// @lc code=start
/**
 * @param{number[]}nums
 * @param{number}val
 * @return{number}
 */
varremoveElement = function (nums, val) {
    // /**
    //  * 1.暴力求解
    //  */
    // let len = nums.length
    // for (let i = 0; i < len; i++) {
    //     if (nums[i] === val) {
    //         // 发现需要移除的元素，就将数组集体向前移动一位
    //         for (let j = i + 1; j < len; j++) {
    //             nums[j - 1] = nums[j]
    //         }
    //         // 因为下表i以后的数值都向前移动了一位，所以i也向前移动一位
    //         i--
    //         // 此时数组的大小-1
    //         len--
    //     }
    // }
    // return len
    /**
     * 2.双指针求解
     */
    letslow = 0,
        len = nums.length
    for (letfast = 0; fast < len; fast++) {
        //如果当前值不需要移除，就原位置的值覆盖
        //  如果当前值需要移除就用后面的值覆盖
        if (nums[fast] !== val) {
            nums[slow++] = nums[fast]
        }
    }
    // 现在有多少就在slow中
    returnslow
    // 现在nums的值，后面三个是没有替换的，符合题目中不能动原数组的意思
    // [
    //     0, 1, 3, 0,
    //     4, 0, 4, 2
    //   ]
};
// @lc code=end
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2))
```

> 旧的版本
给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

示例 1:
```
给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

你不需要考虑数组中超出新长度后面的元素。
```
示例 2:
```
给定 nums = [0,1,2,2,3,0,4,2], val = 2,

函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

注意这五个元素可为任意顺序。

你不需要考虑数组中超出新长度后面的元素。
```
说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:
```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

读题:内部操作十分关键

无需再return

也就是说下面这段类似
```js
var removeDuplicates = function(nums) {
    for (i = 0; i < nums.length; i++) {
        //Next number is identical to current one
        if (nums[i] == nums[i+1]) {
            nums.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < nums; i++) {
    console.log(nums[i]);
}
};
```

找到val值，splice去除，后面的值跟上
```js
/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for(i=0;i<nums.length;i++){
        if(nums[i]===val){
            nums.splice(i,1)
            i--
        }
    }
};
```

> 2021/11/24后续
```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    // /**
    //  * 1.暴力求解
    //  */
    // let len = nums.length
    // for (let i = 0; i < len; i++) {
    //     if (nums[i] === val) {
    //         // 发现需要移除的元素，就将数组集体向前移动一位
    //         for (let j = i + 1; j < len; j++) {
    //             nums[j - 1] = nums[j]
    //         }
    //         // 因为下表i以后的数值都向前移动了一位，所以i也向前移动一位
    //         i--
    //         // 此时数组的大小-1
    //         len--
    //     }
    // }
    // return len
    /**
     * 2.双指针求解
     */
    let slow = 0,
        len = nums.length
    for (let fast = 0; fast < len; fast++) {
        //如果当前值不需要移除，就原位置的值覆盖
        //  如果当前值需要移除就用后面的值覆盖
        if (nums[fast] !== val) {
            nums[slow++] = nums[fast]
        }
    }
    // 现在有多少就在slow中
    return slow
};
```

```
113 / 113 个通过测试用例
状态：通过
执行用时: 72 ms
内存消耗: 37.8 MB
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 33. 搜索旋转排序数组
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1:
```
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```
示例 2:
```
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```

indexOf这个方法正好用的上,返回目标值在数组中的索引
<pre> 
/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return nums.indexOf(target)
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 34. 在排序数组中查找元素的第一个和最后一个位置
> 新的版本 2022-1-4
```js
/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */
// @lc code=start
/**
 * @param{number[]}nums
 * @param{number}target
 * @return{number[]}
 */
varsearchRange = function (nums, target) {
    /**
     * 二分法求解（左闭右闭区间）
     * 1.寻找左边界
     * 2.寻找右边界
     * 3.组合
     */
    //  寻找左边界
    searchLeftBorder = (nums, target) => {
        letleftBorder = -2,
            left = 0,
            right = nums.length - 1
        while (left <= right) {
            letmid = left + Math.floor((right - left) / 2)
            if (nums[mid] >= target) {
                // 中间值大于等于目标值，一直往右找，找到最右边
                right = mid - 1
                leftBorder = right
            } else {
                // 中间值太小，重置左位置left
                left = mid + 1
            }
        }
        returnleftBorder
    }
    // 寻找右边界
    searchRightBorder = (nums, target) => {
        letrightBorder = -2,
            left = 0,
            right = nums.length - 1
        while (left <= right) {
            letmid = left + Math.floor((right - left) / 2)
            if (nums[mid] > target) {
                right = mid - 1
            } else {
                left = mid + 1
                rightBorder = left
            }
        }
        returnrightBorder
    }
    letleftB = searchLeftBorder(nums, target),
        rightB = searchRightBorder(nums, target)
    if (leftB === -2 && rightB === -2) return [-1, -1]
    if (rightB - leftB > 1) return [leftB + 1, rightB - 1]
};
// @lc code=end
console.log(searchRange([5, 7, 7, 8, 8, 10], 8))
```

> 旧的版本
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

示例 1:
```
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```
示例 2:
```
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```

indexOf这个方法正好用的上,返回目标值在数组中的索引

lastIndexOf()从后往前找目标值,与indexOf()恰好相反
```js
/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let arr=[]
    let left=nums.indexOf(target)
    let right=nums.lastIndexOf(target)
    arr.push(left)
    arr.push(right)
    return arr
};
```
<pre>
✔ Accepted
  ✔ 88/88 cases passed (80 ms)
  ✔ Your runtime beats 79.6 % of javascript submissions
  ✔ Your memory usage beats 64.12 % of javascript submissions (34.9 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 35. 搜索插入位置
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-insert-position
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
示例 1:
```
输入: [1,3,5,6], 5
输出: 2
```
示例 2:
```
输入: [1,3,5,6], 2
输出: 1
```
示例 3:
```
输入: [1,3,5,6], 7
输出: 4
```
示例 4:
```
输入: [1,3,5,6], 0
输出: 0
```

indexOf这个方法正好用的上,返回目标值在数组中的索引

如果有则返回索引，否则就插入目标值排序返回索引
```js
/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    if (nums.indexOf(target) >= 0) {
        return nums.indexOf(target)
    }
    nums.push(target)
    return nums.sort(function(a,b){
        return a-b
    }).indexOf(target)
};
```
<pre>
√ Accepted
  √ 62/62 cases passed (108 ms)
  √ Your runtime beats 24.06 % of javascript submissions
  √ Your memory usage beats 5.32 % of javascript submissions (35.9 MB)
</pre> 

> 2021/11/24后续
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    // /**
    //  * 第一种：暴力求解
    //  */
    // let len = nums.length
    // for (let i = 0; i < len; i++) {
    //     if (nums[i] >= target) {
    //         return i
    //     }
    // }
    // // 循环结束没找到说明目标值贼大
    // return len
    /**
     * 第二种：二分法（左闭右闭）
     */
    let left = 0,
        len = nums.length,
        right = len - 1
    // [0,nums-1]
    while (left <= right) {
        let middle = Math.floor((left + right) / 2)
        if (nums[middle] < target) {
            // 中间值比目标值小，目标值要往后找[middle+1,len]
            left = middle + 1
        } else {
            // 中间值比目标值大，目标值要往前找[0,middle-1]
            right = middle - 1
            len = middle
        }
    }
    return len
};
```
```
64 / 64 个通过测试用例
状态：通过
执行用时: 68 ms
内存消耗: 38.6 MB
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 39. 组合总和
给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：
```
所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 
```
示例 1:
```
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
```
示例 2:
```
输入: candidates = [2,3,5], target = 8,
所求解集为:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

1. 迭代 内置search方法，循环start值

<pre> 
/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    candidates.sort((a, b) => a - b)
    let buffer = []
    let res = []
    search(0, target)
    return res

    function search(start, target) {
        if (target === 0) return res.push(buffer.slice())
        if (target < 0) return
        if (start === candidates.length) return
        buffer.push(candidates[start])
        search(start, target - candidates[start])
        buffer.pop()
        search(start + 1, target)
    }
};

✔ Accepted
  ✔ 168/168 cases passed (124 ms)
  ✔ Your runtime beats 55.49 % of javascript submissions
  ✔ Your memory usage beats 99.12 % of javascript submissions (35.8 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 53. 最大子序和
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
示例:
```
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```
进阶:

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

1. 最小数是最大值的负数，就是-Number.MAX_VALUE，现将该值赋值给max、
2. 申明sum
3. 遍历nums
4. 如果sum小于零，重置，因为一个数加上负数肯定变小
5. sum加上nums数组中的每个值
6. 判断max和sum取最大值赋值给max
7. 循环结束返回max

```
方法一：动态规划

/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let max=-Number.MAX_VALUE
    let sum=0

    for(let i of nums){
        if(sum<0){
            sum=0
        }
        sum+=i
        max=Math.max(max,sum)
    }
    return max
};

方法二：分治

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  return divide(nums, 0, nums.length-1);
};
 
var divide = function(nums, l, r) {
  if (l === r) {
    return nums[l];
  }
  if (l === r-1) {
    return Math.max(nums[l], Math.max(nums[r], nums[l] + nums[r]));
  }
  
  let mid = parseInt((l + r) / 2);
  let lmax = divide(nums, l, mid-1);
  let rmax = divide(nums, mid+1, r);
  
  let mmax = nums[mid];  // 从中间开始计算
  let sum = mmax; // 用来求和
  for (let i = mid - 1; i >= l; i--) {
    sum += nums[i];
    mmax = Math.max(mmax, sum);
  }
  
  sum = mmax;
  for (let i = mid + 1; i <= r; i++) {
    sum += nums[i];
    mmax = Math.max(mmax, sum);
  }
  
  return Math.max(lmax, Math.max(rmax, mmax));
};
``` 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 66. 加一
给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:
```
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
```
示例 2:
```
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```
```js
/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    let num=parseInt(digits.join(''))
    num+=1
    let arr=num.toString().split('')
    return arr
};
```
<pre>
× Wrong Answer
  × 69/109 cases passed (N/A)
  × testcase: '[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]'
  × answer: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,0,0,0]
  × expected_answer: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]
  × stdout:
</pre> 
parseInt当数字过大时，精度出错
正确方法：
1. 由于之前转数字错误的示范，这次就要改邪归正了
2. 遍历数组，从尾到头，命中数字加1
3. 和值如果大于等于10，该位置上清0，再来一遍循环，否则就返回目标值
4. 循环结束，所有位置上都大于等于10，那么在目标值头部加1

<pre>

/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        digits[i]++
        if (digits[i] >= 10) {
            digits[i]=0
        } else {
            return digits
        }   
    }
    digits.unshift(1)
    return digits
}

</pre>

<pre>
√ Accepted
  √ 109/109 cases passed (68 ms)
  √ Your runtime beats 96.42 % of javascript submissions
  √ Your memory usage beats 41.65 % of javascript submissions (33.7 MB)
  
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 88. 合并两个有序数组
给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。

说明:
```
初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
```
示例:
```
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```

1. 必须要更改数组本身，所以只能用splice和sort，而不能用slice和concat等api
2. sort要指定升序

<pre>
/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    nums1.splice(m)
    nums2.splice(n)
    for (let i in nums2) {
        nums1.splice(m + i, 0, nums2[i])
    }
    return nums1.sort((a, b) => {
        return a - b
    })
};
</pre>

<pre>
✔ Accepted
  ✔ 59/59 cases passed (92 ms)
  ✔ Your runtime beats 42.32 % of javascript submissions
  ✔ Your memory usage beats 7.67 % of javascript submissions (35.2 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 283.移动零
给一个数组 nums 写一个函数将 0 移动到数组的最后面，非零元素保持原数组的顺序
```
1.必须在原数组上操作
2.最小化操作数
```
样例
例1:
```
输入: nums = [0, 1, 0, 3, 12],
输出: [1, 3, 12, 0, 0].
```
例2:
```
输入: nums = [0, 0, 0, 3, 1],
输出: [3, 1, 0, 0, 0].
```
```js
/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */
// @lc code=start
/**
 * @param{number[]}nums
 * @return{void} Do not return anything, modify nums in-place instead.
 */
varmoveZeroes = function (nums) {
    /**
     * 双指针
     */
    letslow = 0
    for (letfast = 0; fast <= nums.length - 1; fast++) {
        if (nums[fast] !== 0) {
            // 当前不为0的处理
            nums[slow++] = nums[fast]
        }
    }
    // 处理后续的位置
    for (leti = slow; i <= nums.length - 1; i++) {
        nums[i] = 0
    }
    returnnums
};
// @lc code=end
console.log(moveZeroes([0, 1, 0, 3, 12]))
```

#### 118. 杨辉三角
给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

![avatar](./picture/118.png)

在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

输入: 5
输出:
```
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```

1. 先申明一个最终数组
2. 这肯定是需要二重循环，分别是行和列
3. 每一行的头和尾是1,其余的每个位置上的数是前一行的这个位置减一加上这个位置
   
</pre>
/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    if (numRows === 0) {
        return []
    }
    let resArr = []
    for (let i = 0; i < numRows; i++) {
        let currRow = []
        for (j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                currRow.push(1)
            } else {
                currRow.push(resArr[i - 1][j - 1] + resArr[i - 1][j])
            }
        }
        resArr.push(currRow)
    }
    return resArr
};
</pre>

<pre>
✔ Accepted
  ✔ 15/15 cases passed (72 ms)
  ✔ Your runtime beats 84.63 % of javascript submissions
  ✔ Your memory usage beats 23.41 % of javascript submissions (33.8 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 704. 二分查找
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。


示例 1:
```
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```

示例 2:
```
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```

提示：
```
你可以假设 nums 中的所有元素是不重复的。
n 将在 [1, 10000]之间。
nums 的每个元素都将在 [-9999, 9999]之间。
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-search
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    // // 二分法第一种写法——左闭右闭
    // // 第一种写法，我们定义 target 是在一个在左闭右闭的区间里，也就是[left, right] （这个很重要非常重要）。

    // // 区间的定义这就决定了二分法的代码应该如何写，因为定义target在[left, right]区间，所以有如下两点：

    // // while (left <= right) 要使用 <= ，因为left == right是有意义的，所以使用 <=
    // // if (nums[middle] > target) right 要赋值为 middle - 1，因为当前这个nums[middle]一定不是target，那么接下来要查找的左区间结束下标位置就是 middle - 1
    // // 1.找到中间数
    // let left = 0
    // // 定义target在左闭右闭的区间里，[left, right]
    // // tip：一定要-1，这是左闭右闭的关键，左闭右开是不用-1
    // let right = nums.length - 1
    // // 2.循环左边到右边
    // // 一直到遍历结束
    // // 当left==right，区间[left, right]依然有效，所以用 <=
    // while (left <= right) {
    //     //  防止溢出 等同于left + ((right - left) / 2);
    //     let middle = Math.floor((left + right) / 2)
    //     if (nums[middle] > target) {
    //         // target 在左区间，所以[left, middle - 1]
    //         // 中间数>目标值，目标值在左区间
    //         right = middle - 1
    //     } else if (nums[middle] < target) {
    //         //  target 在左区间，所以[left, middle - 1]
    //         // 中间数<目标值，目标值在右区间
    //         left = middle + 1
    //     } else {
    //         // 找到就返回下标
    //         return middle
    //     }
    // }
    // // 没找到就返回-1
    // return -1

    //     二分法第二种写法——左闭右开
    // 如果说定义 target 是在一个在左闭右开的区间里，也就是[left, right) ，那么二分法的边界处理方式则截然不同。

    // 有如下两点：

    // while (left < right)，这里使用 < ,因为left == right在区间[left, right)是没有意义的
    // if (nums[middle] > target) right 更新为
    //  middle，因为当前nums[middle]不等于target，去左区间继续寻找，而寻找区间是左闭右开区间，所以right更新为middle，即：下一个查询区间不会去比较nums[middle]
    let left = 0
    // 定义target在左闭右开的区间里，即：[left, right)
    let right = nums.length 
    // 因为left == right的时候，在[left, right)是无效的空间，所以使用 <
    while (left < right) {
        let middle = Math.floor((left + right) / 2)
        if (nums[middle] > target) {
            // target 在左区间，在[left, middle)中
            right = middle
        } else if (nums[middle] < target) {
            // target 在右区间，在[middle + 1, right)中
            left = middle + 1
        } else {
            // 数组中找到目标值，直接返回下标
            return middle
        }
    }
    return -1
};
```

```
提交记录
47 / 47 个通过测试用例
状态：通过
执行用时: 100 ms
内存消耗: 41.1 MB
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 844. 比较含退格的字符串
给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。
```
1 <= S.length <= 200
1 <= T.length <= 200
```

S 和 T 只含有小写字母以及字符 '#'。

样例

样例 1：
```
输入：S = "ab#c", T = "ad#c"
输出：true
解释：S 和 T 都会变成 “ac”。
```
样例 2：

输入：S = "ab##", T = "c#d#"
输出：true
解释：S 和 T 都会变成 “”。
样例 3：
```
输入：S = "a##c", T = "#a#c"
输出：true
解释：S 和 T 都会变成 “c”。
```
示例 4：
```
输入：S = "a#c", T = "b"
输出：false
```
解释：S 会变成 “c”，但 T 仍然是 “b”。

挑战

你可以在O(N)O(N)的时间复杂度和O(1)O(1)的额外空间复杂度完成吗？
```js
/*
 * @lc app=leetcode.cn id=844 lang=javascript
 *
 * [844] 比较含退格的字符串
 */
// @lc code=start
/**
 * @param{string}s
 * @param{string}t
 * @return{boolean}
 */
varbackspaceCompare = function (s, t) {
    /**
     * 双指针
     * 解题思路
     * https://leetcode-cn.com/problems/backspace-string-compare/solution/shuang-zhi-zhen-bi-jiao-han-tui-ge-de-zi-8fn8/
     * 
     */
    // 从后往前判断
    let
        tArr = t.split(''),
        sArr = s.split(''),
        // 当前位置
        tCurrent = tArr.length - 1,
        sCurrent = sArr.length - 1,
        // 当前需要跳过的步数
        tSkip = 0,
        sSkip = 0
    // 开启大循环
    while (sCurrent >= 0 || tCurrent >= 0) {
        while (sCurrent >= 0) {
            // s开始循环
            if (sArr[sCurrent] === '#') {
                // 遇到退格，记录步数，当前位置往前移
                sSkip++
                sCurrent--
            } elseif (sSkip > 0) {
                // 退格清除字符循环
                sSkip--
                sCurrent--
            } elsebreak
        }
        while (tCurrent >= 0) {
            // t开始循环
            if (tArr[tCurrent] === '#') {
                tSkip++
                tCurrent--
            } elseif (tSkip > 0) {
                tSkip--
                tCurrent--
            } elsebreak
        }
        if (sArr[sCurrent] !== tArr[tCurrent]) {
            returnfalse
        }
        sCurrent--
        tCurrent--
    }
    returntrue
};
// @lc code=end
console.log(backspaceCompare("a##c", "#a#c"))
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 977. 有序数组的平方
```js
/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 */
// @lc code=start
/**
 * @param{number[]}nums
 * @return{number[]}
 */
varsortedSquares = function (nums) {
    for (leti = 0; i < nums.length; i++) {
        nums[i] = nums[i] * nums[i]
    }
    returnnums.sort((a, b) =>a - b)
};
// @lc code=end
console.log(sortedSquares([-7, -3, 2, 3, 11]))
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 209.  长度最小的子数组
```js
/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */
// @lc code=start
/**
 * @param{number}target
 * @param{number[]}nums
 * @return{number}
 */
varminSubArrayLen = function (target, nums) {
    /**
     * 滑动窗口
     * 窗口就是 满足其和 ≥ s 的长度最小的 连续 子数组。
    窗口的起始位置如何移动：如果当前窗口的值大于s了，窗口就要向前移动了（也就是该缩小了）。
    窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针，窗口的起始位置设置为数组的起始位置就可以了。
    可以发现滑动窗口的精妙之处在于根据当前子序列和大小的情况，不断调节子序列的起始位置。从而将O(n^2)的暴力解法降为O(n)。
     */
    letleft = right = sum = 0,
        len = nums.length + 1
    while (right++ <= nums.length) {
        sum += nums[right]
        while (sum >= target) {
            len = Math.min(len, right - left)
            // 窗口右移，和排查左边值
            sum -= nums[left++]
        }
    }
    returnlen
};
// @lc code=end
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---


#### 59.  螺旋矩阵 II
```js
/*



 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 */
// @lc code=start
/**
 * @param{number}n
 * @return{number[][]}
 */
vargenerateMatrix = function (n) {
    /**
     * 二分法求解
     * https://programmercarl.com/0059.%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5II.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC
     */
    // 起始位置
    letstartX = startY = 0,
        // 旋转圈数
        loop = Math.floor(n / 2),
        // 中间位置
        mid = Math.floor(n / 2),
        // 控制每一层填充元素个数
        offset = 1,
        // 更新填充数字
        count = 1,
        // 数组初始化
        res = newArray(n).fill(0).map(() =>newArray(n).fill(0))
    while (loop--) {
        letrow = startX,
            col = startY
        // 上行从左到右（左闭右开）
        for (; col < startY + n - offset; col++) {
            res[row][col] = count++
        }
        // 右列从上到下（左闭右开）
        for (; row < startX + n - offset; row++) {
            res[row][col] = count++
        }
        // 下行从右到左（左闭右开）
        for (; col > startX; col--) {
            res[row][col] = count++
        }
        // 左列做下到上（左闭右开）
        for (; row > startY; row--) {
            res[row][col] = count++
        }
        // 更新起始位置
        startY++
        startX++
        // 更新offset
        offset += 2
    }
    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2 === 1) {
        res[mid][mid] = count
    }
    returnres
};
// @lc code=end
console.log(generateMatrix(4))
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 总结
数组

数组是存放在连续内存空间上的相同类型数据的集合。

数组可以方便的通过下标索引的方式获取到下标下对应的数据。

需要两点注意的是
-  数组下标都是从0开始的。
-  数组内存空间的地址是连续的
正是因为数组的在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，就难免要移动其他元素的地址。

> 二分法

我们讲到了循环不变量原则，只有在循环中坚持对区间的定义，才能清楚的把握循环中的各种细节。
二分法是算法面试中的常考题

> 双指针法

双指针法（快慢指针法）：通过一个快指针和慢指针在一个for循环下完成两个for循环的工作。


>滑动窗口

滑动窗口的精妙之处在于根据当前子序列和大小的情况，不断调节子序列的起始位置。从而将O(n^2)的暴力解法降为O(n)。

> 模拟行为

模拟类的题目在数组中很常见，不涉及到什么算法，就是单纯的模拟，十分考察大家对代码的掌控能力。

在这道题目中，我们再一次介绍到了循环不变量原则，其实这也是写程序中的重要原则。

相信大家又遇到过这种情况： 感觉题目的边界调节超多，一波接着一波的判断，找边界，踩了东墙补西墙，好不容易运行通过了，代码写的十分冗余，毫无章法，其实真正解决题目的代码都是简洁的，或者有原则性的，大家可以在这道题目中体会到这一点。


[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 栈
栈（stack）又名堆栈，它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。
#### 150. 逆波兰表达式求值
根据 逆波兰表示法，求表达式的值。

有效的算符包括 +、-、*、/ 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

 

说明：
```
整数除法只保留整数部分。
给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。
``` 

示例 1：
```
输入：tokens = ["2","1","+","3","*"]
输出：9
解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
```
示例 2：
```
输入：tokens = ["4","13","5","/","+"]
输出：6
解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
```
示例 3：
```
输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
输出：22
解释：
该算式转化为常见的中缀算术表达式为：
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```

提示：
```
1 <= tokens.length <= 104
tokens[i] 要么是一个算符（"+"、"-"、"*" 或 "/"），要么是一个在范围 [-200, 200] 内的整数
``` 

逆波兰表达式：
```
逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。

平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) * ( 3 + 4 ) 。
该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) * ) 。
逆波兰表达式主要有以下两个优点：

去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/evaluate-reverse-polish-notation
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    // 进行map存储运算符和函数，运用高阶函数求值
    /**
     * 无法理解下面这段代码到底哪里有问题
     */
    // let stack = []
    // const map = new Map([
    //     ["+", (a, b) =>
    //         a + b
    //     ],
    //     ["-", (a, b) =>
    //         a - b
    //     ],
    //     ["*", (a, b) =>
    //         a * b
    //     ],
    //     ["/", (a, b) =>
    //         Math.floor(a / b)
    //     ]
    // ])
    // for (let t of tokens) {
    //     if (!map.has(t)) {
    //         stack.push(t)
    //         continue
    //     }
    //     stack.push(map.get(t)(Number(stack.pop()), Number(stack.pop())))
    // }
    // return stack.pop()

    
    const s = new Map([
        ["+", (a, b) => a * 1  + b * 1],
        ["-", (a, b) => b - a],
        ["*", (a, b) => b * a],
        ["/", (a, b) => (b / a) | 0]
    ]);
    const stack = [];
    for (const i of tokens) {
        if(!s.has(i)) {
            stack.push(i);
            continue;
        }
        stack.push(s.get(i)(stack.pop(),stack.pop()))
    }
    return stack.pop();
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 225. 用队列实现栈
请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。

实现 MyStack 类：
```
void push(int x) 将元素 x 压入栈顶。
int pop() 移除并返回栈顶元素。
int top() 返回栈顶元素。
boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。
``` 

注意：
```
你只能使用队列的基本操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。
你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
``` 

示例：
```
输入：
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 2, 2, false]

解释：
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // 返回 2
myStack.pop(); // 返回 2
myStack.empty(); // 返回 False
``` 

提示：
```
1 <= x <= 9
最多调用100 次 push、pop、top 和 empty
每次调用 pop 和 top 都保证栈不为空
``` 

进阶：你能否实现每种操作的均摊时间复杂度为 O(1) 的栈？换句话说，执行 n 个操作的总时间复杂度 O(n) ，尽管其中某个操作可能需要比其他操作更长的时间。你可以使用两个以上的队列。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-stack-using-queues
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js

var MyStack = function () {
    this.queue = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
    this.queue.push(x)
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
    let len = this.queue.length
    while (len-- > 1) {
        // 保留最顶上的，其他都从后往前移
        this.queue.push(this.queue.shift())
    }
    return this.queue.shift()
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
    let num = this.pop()
    this.queue.push(num)
    return num
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
    return this.queue.length === 0
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 1047. 删除字符串中的所有相邻重复项
给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

在 S 上反复执行重复项删除操作，直到无法继续删除。

在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

 

示例：
```
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
```

提示：
```
1 <= S.length <= 20000
S 仅由小写英文字母组成。
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    let stack = [],
        x = null
    for (let num of s) {
        // 如果出栈的数等于num，那就正常出栈，否则不能出栈，该num也得入栈
        if (stack.length && num === (x = stack.pop())) continue
        stack.push(x)
        stack.push(num)
    }
    return stack.join('')
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 队列
队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。

#### 232. 用栈实现队列
请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：
```
void push(int x) 将元素 x 推到队列的末尾
int pop() 从队列的开头移除并返回元素
int peek() 返回队列开头的元素
boolean empty() 如果队列为空，返回 true ；否则，返回 false
``` 

说明：
```
你只能使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
``` 

进阶：
```
你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。
``` 

示例：
```
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
``` 

提示：
```
1 <= x <= 9
最多调用 100 次 push、pop、peek 和 empty
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-queue-using-stacks
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js

var MyQueue = function () {
    // 存储数据
    this.stack1 = []
    // 出数据
    this.stack2 = []
};

/** 
 * 入队Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.stack1.push(x)
};

/**
 * 出队Push element x to the back of queue. 
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    // 如果栈2有值就返回
    if (this.stack2.length) {
        return this.stack2.pop()
    }
    // 如果栈2没有值，栈1就推进去，再返回
    while (this.stack1.length) {
        this.stack2.push(this.stack1.pop())
    }
    return this.stack2.pop()
};

/**
 * 获取最前面的元素
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    let num = this.pop()
    // 栈2中少了这个值，再塞回去
    this.stack2.push(num)
    return num
};

/**
 * 返回队列是否为空
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.stack1.length === 0 && this.stack2.length === 0
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 239. 滑动窗口最大值
给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

 

示例 1：
```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
``` 
示例 2：
```
输入：nums = [1], k = 1
输出：[1]
```
示例 3：
```
输入：nums = [1,-1], k = 1
输出：[1,-1]
```
示例 4：
```
输入：nums = [9,11], k = 2
输出：[11]
```
示例 5：
```
输入：nums = [4,-2], k = 2
输出：[4]
``` 

提示：
```
1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sliding-window-maximum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  // 队列数组（存放的是元素下标，为了取值方便）
  const q = [];
  // 结果数组
  const ans = [];
  for (let i = 0; i < nums.length; i++) {
    // 若队列不为空，且当前元素大于等于队尾所存下标的元素，则弹出队尾
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    // 入队当前元素下标
    q.push(i);
    // 判断当前最大值（即队首元素）是否在窗口中，若不在便将其出队
    if (q[0] <= i - k) {
      q.shift();
    }
    // 当达到窗口大小时便开始向结果中添加数据
    if (i >= k - 1) ans.push(nums[q[0]]);
  }
  return ans;
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 哈希表
散列表（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表。

给定表M，存在函数f(key)，对任意给定的关键字值key，代入函数后若能得到包含该关键字的记录在表中的地址，则称表M为哈希(Hash）表，函数f(key)为哈希(Hash) 函数。
#### 242. 有效的字母异位词
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

示例 1:
```
输入: s = "anagram", t = "nagaram"
输出: true
```
示例 2:
```
输入: s = "rat", t = "car"
输出: false
```

提示:
```
1 <= s.length, t.length <= 5 * 104
s 和 t 仅包含小写字母
``` 

进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-anagram
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    /**
     * 哈希表解决
     */
    // 定义一个数组叫做record用来上记录字符串s里字符出现的次数。

    // 需要把字符映射到数组也就是哈希表的索引下表上， 因为字符a到字符z的ASCII是26个连续的数值， 所以字符a映射为下表0， 相应的字符z映射为下表25。

    // 再遍历 字符串s的时候， 只需要将 s[i] - ‘a’ 所在的元素做 + 1 操作即可， 并不需要记住字符a的ASCII， 只要求出一个相对数值就可以了。 这样就将字符串s中字符出现的次数， 统计出来了。

    // 那看一下如何检查字符串t中是否出现了这些字符， 同样在遍历字符串t的时候， 对t中出现的字符映射哈希表索引上的数值再做 - 1 的操作。

    // 那么最后检查一下， record数组如果有的元素不为零0， 说明字符串s和t一定是谁多了字符或者谁少了字符，
    // return false。

    // 最后如果record数组所有元素都为零0， 说明字符串s和t是字母异位词，
    // return true。

    // charCodeAt()Returns the Unicode value of the character at the specified location.
    if (s.length !== t.length) return false
    const set = new Array(26).fill(0)
    const base = "a".charCodeAt()
    for (let i of s) {
        set[i.charCodeAt() - base]++
    }
    for (let i of t) {
        // 如果在集合中没有找到或者找到为0,那么就不是字母异位词
        if (!set[i.charCodeAt() - base]) return false
        set[i.charCodeAt() - base]--
    }
    return true
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 349. 两个数组的交集
给定两个数组，编写一个函数来计算它们的交集。

示例 1：
```js
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
```
示例 2：
```js
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
```

说明：
```
输出结果中的每个元素一定是唯一的。
我们可以不考虑输出结果的顺序。
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/intersection-of-two-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    // 但是要注意， 使用数组来做哈希的题目， 是因为题目都限制了数值的大小。

    // 而这道题目没有限制数值的大小， 就无法使用数组来做哈希表了。

    // 而且如果哈希值比较少、 特别分散、 跨度非常大， 使用数组就造成空间的极大浪费。

    // 此时就要使用另一种结构体了， set

    // Array.from ()函数的用法. ES6为Array增加了from函数用来将其他对象转换成数组。
    if(nums1.length < nums2.length) {
        let tmp = nums2
        nums2 = nums1
        nums1 = tmp
    }
    let setNums1 = new Set(nums1)
    let setNew = new Set()
    for (let i = 0; i < nums2.length; i++) {
        setNums1.has(nums2[i]) && setNew.add(nums2[i])
    }
    return Array.from(setNew)
};
```
```
55 / 55 个通过测试用例
状态：通过
执行用时: 68 ms
内存消耗: 39.3 MB
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 202. 快乐数
编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」定义为：
```
1. 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
2. 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
3. 如果 可以变为  1，那么这个数就是快乐数。
```
如果 n 是快乐数就返回 true ；不是，则返回 false 。

 

示例 1：
```
输入：n = 19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```
示例 2：
```
输入：n = 2
输出：false
```

提示：
```
1 <= n <= 231 - 1
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/happy-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    /**
     * 哈希表求解（array、set、map）
     */
    // 当我们遇到了要快速判断一个元素是否出现集合里的时候， 就要考虑哈希法了。

    // 所以这道题目使用哈希法， 来判断这个sum是否重复出现， 如果重复了就是return false， 否则一直找到sum为1为止。

    // 判断sum是否重复出现就可以使用set

    // 还有一个难点就是求和的过程，如果对取数值各个位上的单数操作不熟悉的话，做这道题也会比较艰难。
    let set = new Set()
    // 循环查找 sum
    while (true) {
        let sum = getSum(n)
        if (sum === 1) return true
        if (set.has(sum)) {
            return false
        } else {
            set.add(sum)
        }
        n = sum
    }
};
// 获取数字每个位置上的值的平方和
function getSum(n) {
    let sum = 0
    // 遍历
    while (n) {
        sum += Math.pow((n % 10), 2)
        n = Math.floor(n / 10)
    }
    return sum
}
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 454. 四数相加 II
给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
```
0 <= i, j, k, l < n
nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
```

示例 1：
```
输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出：2
解释：
两个元组如下：
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
```
示例 2：
```
输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
输出：1
```

  提示：
```
n == nums1.length
n == nums2.length
n == nums3.length
n == nums4.length
1 <= n <= 200
-228 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 228
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
    /**
     * 哈希表求解
     * 使用map
     */
    // 本题解题步骤：

    // 首先定义 一个map， key放a和b两数之和， value 放a和b两数之和出现的次数。
    // 遍历大A和大B数组， 统计两个数组元素之和， 和出现的次数， 放到map中。
    // 定义int变量count， 用来统计a + b + c + d = 0 出现的次数。
    // 在遍历大C和大D数组， 找到如果 0 - (c + d) 在map中出现过的话， 就用count把map中key对应的value也就是出现次数统计出来。
    // 最后返回统计值 count 就可以了
    let map = new Map()
    for (let i of nums1) {
        for (let j of nums2) {
            let sum = i + j
            // 查找到了就加一，没有默认是1
            map.set(sum, map.has(sum) ? map.get(sum) + 1 : 1)
        }
    }
    let count = 0
    for (let i of nums3) {
        for (let j of nums4) {
            if (map.has(0 - (i + j))) {
                count += map.get(0 - (i + j))
            }
        }
    }
    return count
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 383. 赎金信
为了不在赎金信中暴露字迹，从杂志上搜索各个需要的字母，组成单词来表达意思。

给你一个赎金信 (ransomNote) 字符串和一个杂志(magazine)字符串，判断 ransomNote 能不能由 magazines 里面的字符构成。

如果可以构成，返回 true ；否则返回 false 。

magazine 中的每个字符只能在 ransomNote 中使用一次。

 

示例 1：
```js
输入：ransomNote = "a", magazine = "b"
输出：false
```
示例 2：
```js
输入：ransomNote = "aa", magazine = "ab"
输出：false
```
示例 3：
```js
输入：ransomNote = "aa", magazine = "aab"
输出：true
```

提示：
```
1 <= ransomNote.length, magazine.length <= 105
ransomNote 和 magazine 由小写英文字母组成
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ransom-note
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    /**
     * 1. 暴力求解
     * 双层循环
     */
    // 杂志要在前循环遍历，赎金信在后
    // for (let i = 0; i < magazine.length; i++) {
    //     for (let j = 0; j < ransomNote.length; j++) {
    //         if (ransomNote[j] === magazine[i]) {
    //             if (ransomNote.length === 1) {
    //                 ransomNote = ''
    //             }
    //             ransomNote = ransomNote. substring(0, j) + ransomNote.substring(j + 1, ransomNote.length)
    //             break
    //         }
    //     }
    // }
    // if (ransomNote.length === 0) {
    //     return true
    // }
    // return false


    /**
     * 2. 哈希表求值
     * 使用 数组
     */
    // 26个字母
    let arr = new Array(26).fill(0)
    let base = "a".charCodeAt()
    for (let i of magazine) {
        // 将字母编码作为键，出现次数作为值    
        arr[i.charCodeAt() - base]++
    }
    for (let i of ransomNote) {
        arr[i.charCodeAt() - base]--
        if (arr[i.charCodeAt() - base] < 0) {
            return false
        }
    }
    return true
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 3. 无重复字符的最长子串
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:
```
输入: "abcabcbb"
输出: 3 
```
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:
```
输入: "bbbbb"
输出: 1
```
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:
```
输入: "pwwkew"
输出: 3
```
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

```js
/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // 初始化空map和变量left
    let map = {}
    var left = 0
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
    // 将字符串s分割组装成数组
    // 这个函数返回每个字符最大的索引值
    // 如"abcabcbb"，返回的map就是{'a':3,'b':7,'c':5}
    return s.split('').reduce((max, v, i) => {
        left = map[v] >= left ? map[v] + 1 : left
        map[v] = i
        return Math.max(max, i - left + 1)
    }, 0)
};
```

> 2022/2/21更新

```js


var lengthOfLongestSubstring = function (s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set()
    const n = s.length
    // 右指针，初始值为-1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1))
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断移动右指针
            occ.add(s.charAt(rk + 1))
            ++rk
        }
        // 第i到rk个字符是一个极长的无重复字符字串
        ans = Math.max(ans, rk - i + 1)
    }
    return ans
}
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 36. 有效的数独
判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

上图是一个部分填充的有效的数独。

数独部分空格内已填入了数字，空白格用 '.' 表示。

示例 1:
```

输入:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: true
```

示例 2:
```
输入:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: false
```
解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
     但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
说明:

一个有效的数独（部分已被填充）不一定是可解的。
只需要根据以上规则，验证已经填入的数字是否有效即可。
给定数独序列只包含数字 1-9 和字符 '.' 。
给定数独永远是 9x9 形式的。

从简单入手，每行和每列判断是颠倒下i和j就行了。最难的是九宫格判断，前提时i和j是以3，6，9分割。

举个例子：当i=0；j=4时，此时的board取得是'6'，而不是'.'或者'8',`Math.floor(i/3)*3+Math.floor(j/3)`就是`Math.floor(0/3)*3+Math.floor(4/3)`等于'1',`(i%3)*3+j%3`就是`(0%3)*3+4%3`等于0，那么取得就是board[1][0],就是'6'

```
/*
 * @lc app=leetcode.cn id=36 lang=javascript
 *
 * [36] 有效的数独
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
// Math.floor() 返回小于或等于一个给定数字的最大整数。
var isValidSudoku = function (board) {
    for (let i = 0; i < 9; i++) {
        let row = new Set(),
            col = new Set(),
            sqr = new Set()
        for (let j = 0; j < 9; j++) {
            let rowc = board[i][j]
            let colc = board[j][i]
            let sqrc = board[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + j % 3]
            if (row.has(rowc) || col.has(colc) || sqr.has(sqrc)) return false
            if (rowc !== '.') row.add(rowc)
            if (colc !== '.') col.add(colc)
            if (sqrc !== '.') sqr.add(sqrc)
        }
    }
    return true
};
```

<pre> 
√ Accepted
  √ 504/504 cases passed (148 ms)
  √ Your runtime beats 29.53 % of javascript submissions
  √ Your memory usage beats 96.77 % of javascript submissions (37.2 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 堆
堆(Heap)是计算机科学中一类特殊的数据结构的统称。堆通常是一个可以被看做一棵完全二叉树的数组对象。
### 字符串
字符串主要用于编程，概念说明、函数解释、用法详述见正文，这里补充一点：字符串在存储上类似字符数组，所以它每一位的单个元素都是可以提取的，如s=“abcdefghij”，则s[1]=“b”，s[9]="j"，而字符串的零位正是它的长度，如s[0]=10（※上述功能Ansistring没有。），这可以给我们提供很多方便，如高精度运算时每一位都可以转化为数字存入数组。
#### 5. 剑指Offer 05.替换空格
[力扣题目链接(opens new window)](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1： 
```js
输入：s = "We are happy."
输出："We%20are%20happy."
```

```js
/**
 * 题目： 剑指Offer 05. 替换空格
力扣题目链接(opens new window)
请实现一个函数， 把字符串 s 中的每个空格替换成 "%20"。
示例 1： 输入： s = "We are happy."
输出： "We%20are%20happy."
 */
letrepaceSpace = function (s) {
    /**
     * 双指针
     * 1. 先计算字符串中空格的个数
     * 2. 创造一个新数组，长度是原来字符串长度加空格转化后的长度
     * 3. 快慢指针循环，查找空格替换符号
     * 从后向前遍历时间复杂度为0(N),否则为O(N^2)
     */
    // let arr = Array.from(s) 等同于
    letarr = s.split('')
    letcount = 0
    arr.forEach(element=> {
        element === ' ' ? count += 2 : ''
    });
    letlen = arr.length
    letnewArr = newArray(len + count)
    letleft = len
    letright = newArr.length
    while (--left >= 0) {
        if (arr[left] === ' ') {
            newArr[right] = "0"
            newArr[right - 1] = "2"
            newArr[right - 2] = "%"
            // tip:指针一定要往前3步，毕竟这三步已经替换了
            right -= 3
        } else {
            newArr[right] = arr[left]
            right--
        }
    }
    returnnewArr.join('')
}
console.log(repaceSpace("We are happy."))
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 5. 最长回文子串
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：
```
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```
示例 2：

```
输入: "cbbd"
输出: "bb"
```

遍历字符串s

初始化left

当字符串左边存在并等于字符串右边

left往前挪一位

right往后挪一位

如果右边减去左边大于max的长度

那么max就等于字符串s截取left+1到right

<pre> 
/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */
/**
 * @param {string} s
 * @return {string}
 */
// var longestPalindrome = function (s) {
//     let arr = new Array()
//     let obj = {}
//     arr = s.split('')

//     for (let i in arr) {
//         if (obj.hasOwnProperty(arr[i])) {
//             let s = obj[arr[i]]
//             let e = (parseInt(i) + 1)
//             // slice() 方法返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变。
//             let endVal = arr.slice(s, e).join('')
//             return endVal
//         } else {
//             obj[arr[i]] = i
//         }
//     }
// };

// 遍历字符串s
// 初始化left
// 当字符串左边存在并等于字符串右边
// left往前挪一位
// right往后挪一位
// 如果右边减去左边大于max的长度
// 那么max就等于字符串s截取left+1到right
var longestPalindrome = function(s) {
    var max = '';
    for (var i = 0; i < s.length; i++) {
      for (var j = 0; j < 2; j++) {
        var left = i;
        var right = i + j;
        while (s[left] && s[left] === s[right]) {
          left--;
          right++;
        }
        if ((right - left - 1) > max.length) {
          max = s.substring(left + 1, right);
        }
      }
    }
    return max;
  };

</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 6. Z 字形变换
将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。
比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：
```
L   C   I   R
E T O E S I I G
E   D   H   N
```
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：
```
string convert(string s, int numRows);
```
示例 1:
```
输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
```
示例 2:
```
输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:

L     D     R
E   O E   I I
E C   I H   N
T     S     G
```

如果行数等于1或者字符串长度小于行数，那就返回字符串

申明行数、变换、翻转、计数

遍历行数，为每一行申明一个数组

遍历字符串

每一行塞进字符串值


翻转是真的,则计数自增，否则自减

如果计数等于行数-1或者计数等于0，则翻转真假替换

reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
<pre> 
/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
// 如果行数等于1或者字符串长度小于行数，那就返回字符串
// 申明行数、变换、翻转、计数
// 遍历行数，为每一行申明一个数组
// 遍历字符串
// 每一行塞进字符串值
// 翻转是真的,则计数自增，否则自减
// 如果计数等于行数-1或者计数等于0，则翻转真假替换
// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

var convert = function(s, numRows) {
        // return original string if can't zigzag
        if (numRows === 1 || s.length < numRows) return s;

        let rows = []
        let converted = '';
        let reverse = false;
        let count = 0
    
        // prepare rows
        for (let i = 0; i < numRows; i++) rows[i] = [];
        // reverse the push flow when reaching turning points
        for (let i = 0; i < s.length; i++) {
            rows[count].push(s[i]);
            reverse ? count-- : count++;
            if (count === numRows - 1 || count === 0) reverse = !reverse;
        }
        // put together converted string
        return rows.reduce((converted, cur) => converted + cur.join(''), '');
};
console.log(convert('LEETCODEISHIRING',4))
</pre> 
   
[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 8. 字符串转换整数 (atoi)
请你来实现一个 atoi 函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。
说明：
假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，qing返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
示例 1:
```
输入: "42"
输出: 42
```
示例 2:
```
输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
```
示例 3:
```
输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
```
示例 4:
```
输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
```
示例 5:
```
输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。
```
Math.min() 返回零个或更多个数值的最小值。
Math.max() 返回零个或更多个数值的最大值。

1. 我们要用parseInt取整过滤字符串
2. 取不大于2^31 − 1的数
3. 取不小于−2^31的数

<pre> 
/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */
/**
 * @param {string} str
 * @return {number}
 */

var myAtoi = function (str) {
    let intStr = parseInt(str) || 0
    let minStr = Math.min(intStr, 2147483647)
    return Math.max(minStr, -2147483648)
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 10.  正则表达式匹配
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
```
'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
```
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
说明:

- s 可能为空，且只包含从 a-z 的小写字母。
- p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
  
示例 1:
```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```
示例 2:
```
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```
示例 3:
```
输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
```
示例 4:
```
输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
```
示例 5:
```
输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
```

[正则表达式匹配](https://blog.csdn.net/softwareX4/article/details/90761502)
[正则表达式匹配](https://www.cnblogs.com/wangshaowei/p/11015383.html)

<pre> 
/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    var lenS = s.length;
    var lenP = p.length;
    var map = {};

    return check(0, 0);

    function check(idxS, idxP) {
        if (map[idxS + ':' + idxP] !== undefined) return map[idxS + ':' + idxP];

        if (idxS > lenS) return false;
        if (idxS === lenS && idxP === lenP) return true;

        if (p[idxP] === '.' || p[idxP] === s[idxS]) {
            map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
                check(idxS + 1, idxP) || check(idxS, idxP + 2) :
                check(idxS + 1, idxP + 1);
        } else {
            map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
                check(idxS, idxP + 2) : false;
        }
        return map[idxS + ':' + idxP];
    }
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 14.  最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。
示例 1:
```
输入: ["flower","flow","flight"]
输出: "fl"
```
示例 2:
```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```
说明:
所有输入只包含小写字母 a-z 。

- reduce：这个方法对数组中的每个元素执行一个自定义的函数，并将结果汇总
- slice：这个方法对字符串截取

1. 使用reduce方法对字符串数组进行遍历
2. 判断前后字符串每个位子上的值是否相等，循环中相等i+1,否则跳出循环
3. slice按照索引截取公共前缀
   
<pre> 
/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length === 0) {
        return ''
    }
    return strs.reduce((former, latter) => {
        let i = 0

        while (former[i] && latter[i] && former[i] === latter[i]) {
            i++
        }
        return former.slice(0, i)

    })
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
1.  最后一个单词的长度
给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指由字母组成，但不包含任何空格的字符串。

示例:
```
输入: "Hello World"
输出: 5
```
关键就是切分字符串

1. 判断字符串是否为空，空的就为0
2. 分割字符串
3. 过滤字符串数组，空的丢弃
4. 取字符串最后一个单词，如果index小于0，返回0，否则返回最后一个字符串长度。因为" "，中间有空格的是还没去掉。

```
/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    if (s === '') {
        return 0
    }
    let last = s.split(' ')
    last = last.filter(item => {
        return item !== ''
    })
    let index = last.length - 1
    if (index >= 0) {
        return last[index].length
    }else{
        return 0
    }
};
```
<pre>
√ Accepted
  √ 59/59 cases passed (64 ms)
  √ Your runtime beats 98.61 % of javascript submissions
  √ Your memory usage beats 21.66 % of javascript submissions (33.8 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 17. 电话号码的字母组合
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
![avatar](./picture/17.png)
示例:

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

- substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符。
- split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。 
- concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
- undefined 一个声明未定义的变量的初始值，或没有实际参数的形式参数。
- Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。

1. 首先用map映射出电话号码和字母
2. 将第一个字符串的字母放进数组arr
3. 原字符串去掉第一个
4. 将字符串分割成字符串数组,并对该数组遍历
5. 根据每一个字符串digit,从map取出对应的字母数组,并对字母数组遍历
6. 遍历arr,返回其中的item拼接letter的值
7. 然后用t合并所有的返回值数组
8. 最后返回arr

<pre> 
/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    var map = {
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"]
    };
    var arr = map[digits[0]];
    digits = digits.substr(1);
    digits.split("").forEach((digit) => {
        let t = [];
        map[digit].forEach((letter) => {
            t = t.concat(arr.map((item) => {
                return item + letter;
            }));
        });
        arr = t;
    });
    return arr === undefined ? [] : arr;
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 20. 有效的括号
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

```
示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true
```
1. 先申明一个空的临时数组tmp
2. 循环s
3. 如果在“({[]})”中有的话进入下一个判断，并记下位置i
4. 如果在tmp中的最后一个数加上i等于5的话，tmp中长度-1
5. 否则将i塞进tmp中
6. 最后判断tmp的长度，等于0则为有效括号，返回true
7. 如果是有效括号，那么前面push进去的，后面都能消掉。这就是这个算法的神奇之处。
```js
/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */
/**
 * @param {tmpring} s
 * @return {boolean}
 */

var isValid = function(s) {
    var tmp = []
    for(var l of s)
        if ((i="({[]})".indexOf(l))>-1)
            if (tmp[tmp.length-1]+i===5)
                tmp.length--;
            else
                tmp.push(i);
    return tmp.length===0
};

```

> tip:2021-11-30更新

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    // /**
    //  * 典型的栈问题 switch求解
    //  */
    // let stack = []
    // for (let num of s) {
    //     switch (num) {
    //         case '(':
    //             stack.push(')')
    //             break

    //         case '[':
    //             stack.push(']')
    //             break

    //         case '{':
    //             stack.push('}')
    //             break
    //         default:
    //             if (stack.pop() !== num) return false
    //     }
    // }
    // return !stack.length
    /*
    简化：    map求解
     */
    let stack = []
    let map = {
        "(": ")",
        "[": "]",
        "{": "}"
    }
    for (let num of s) {
        // 如果有找到，塞进栈中，并继续
        if (map[num]) {
            stack.push(num)
            continue
        }
        if (map[stack.pop()] !== num) return false
    }
    return !stack.length
};
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 22. 括号生成
给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
例如，给出 n = 3，生成结果为：
```
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```


<pre> 
/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */
/**
 * @param {number} n
 * @return {string[]}
 */

var generateParenthesis = function(n) {
    var arr = [];
    compose(n, n, '');
    return arr;
  
    function compose(left, right, str) {
      if (!left && !right && str.length) return arr.push(str);
      if (left) compose(left - 1, right, str + '(');
      if (right > left) compose(left, right - 1, str + ')');
    }
  };
  
</pre> 


[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 28. 实现strStr()
实现 strStr() 函数。
给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
示例 1:
```
输入: haystack = "hello", needle = "ll"
输出: 2
```
示例 2:
```
输入: haystack = "aaaaa", needle = "bba"
输出: -1
```
说明:

当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。

很简单的,调用indexOf就行了
<pre> 
/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现strStr()
 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    if (needle === '') {
        return 0
    }
    let index = ''
    index = haystack.indexOf(needle)
    return index
};

</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 38. 报数
报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

```js
1.     1
2.     11
3.     21
4.     1211
5.     111221
```
1 被读作  "one 1"  ("一个一") , 即 11。
11 被读作 "two 1s" ("两个一"）, 即 21。
21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。

注意：整数顺序将表示为一个字符串。

示例 1:

```
输入: 1
输出: "1"
```

示例 2:

```
输入: 4
输出: "1211"
```
1. 申明start存储来作为返回值，result为过渡值，tmp计算重复值
2. 双层循环，外层遍历n-1,内层遍历start值
3. 判断start字符串中前后值是否相等，如果相等那么tmp+1,如果不等那么result=result+tmp+start循环上的值
4. 最后循环结束得出start值 

<pre> 
/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 报数
 */
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let start = '1',
        result = '',
        tmp = 1
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < start.length; j++) {
            if (start[j] !== start[j + 1] || j == start.length - 1) {
                result +=tmp +  start[j]
                tmp = 1
            } else {
                tmp += 1
            }
        }
        start = result
        result = ''
    }
    return start
};


✔ Accepted
  ✔ 18/18 cases passed (80 ms)
  ✔ Your runtime beats 82.46 % of javascript submissions
  ✔ Your memory usage beats 40.19 % of javascript submissions (35.5 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 344. 反转字符串
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

 

示例 1：
```
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```
示例 2：
```
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
``` 

提示：
```
1 <= s.length <= 105
s[i] 都是 ASCII 码表中的可打印字符
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    // 切记不可以调用 js 库 数组 函数 reverse()
    /**
     * 双指针
     */
    // 不知道为啥总是报错
    // for (let i = 0, j = s.length - 1; i <= Math.floor(s.length / 2); i++, j--) {
    //     let tmp = s[j]
    //     s[j] = s[i]
    //     s[i] = tmp
    // }
    // return s

    let left = -1,
        right = s.length
    while (++left < --right) {
        let tmp = s[left]
        s[left] = s[right]
        s[right] = tmp
    }
    return s
};

console.log(reverseString(["A", " ", "m", "a", "n", ",", " ", "a", " ", "p", "l", "a", "n", ",", " ", "a", " ", "c", "a", "n", "a", "l", ":", " ", "P", "a", "n", "a", "m", "a"]))
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 541. 反转字符串 II
给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。
```
如果剩余字符少于 k 个，则将剩余字符全部反转。
如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
```

示例 1：
```js
输入：s = "abcdefg", k = 2
输出："bacdfeg"
```
示例 2：
```js
输入：s = "abcd", k = 2
输出："bacd"
``` 

提示：
```
1 <= s.length <= 104
s 仅由小写英文组成
1 <= k <= 104
```

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
    /**
     * 
     * 1.for循环步长为2k（跨过2k去反转k个字符）
     * 2.运用双指针反转字符串1
     */
    s = s.split('')
    let len = s.length
    for (let i = 0; i < len; i += 2 * k) {
        let left = i,
            right = i + k - 1
        while (left < right) {
            let temp = s[left]
            s[left] = s[right]
            s[right] = temp
            // tip:转换完后 一个递增 一个递减
            left++
            right--
        }
    }
    return s.join('')
};
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-string-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    // 切记不可以调用 js 库 数组 函数 reverse()
    /**
     * 双指针
     */
    // 不知道为啥总是报错
    // for (let i = 0, j = s.length - 1; i <= Math.floor(s.length / 2); i++, j--) {
    //     let tmp = s[j]
    //     s[j] = s[i]
    //     s[i] = tmp
    // }
    // return s

    let left = -1,
        right = s.length
    while (++left < --right) {
        let tmp = s[left]
        s[left] = s[right]
        s[right] = tmp
    }
    return s
};

console.log(reverseString(["A", " ", "m", "a", "n", ",", " ", "a", " ", "p", "l", "a", "n", ",", " ", "a", " ", "c", "a", "n", "a", "l", ":", " ", "P", "a", "n", "a", "m", "a"]))
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 459. 重复的子字符串
给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

示例 1:
```
输入: s = "abab"
输出: true
```
解释: 可由子串 "ab" 重复两次构成。

示例 2:
```
输入: s = "aba"
输出: false
```
示例 3:
```
输入: s = "abcabcabcabc"
输出: true
```
解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/repeated-substring-pattern
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
if(s.length===0)return false
const getNext=(s)=>{
    let next=[]
    let j=-1
    next.push(j)
    // 构造next数组
    for(let i=1;i<s.length;++i){
        // 匹配不成功，j回到前一位置next数组所对应的值
        while(j>=0&&s[i]!==s[j+1])
        j=next[j]
        // 匹配成功，j往后移
        if(s[i]===s[j+1])j++
        // 更新next数组的值
        next.push(j)
    }
    return next
}
let next=getNext(s)
// 说明（数组长度-最长相等前后缀的长度）正好可以被数组的长度整除，说明有该字符串有重复的子字符串。
// 数组长度减去最长相同的长度相当于是第一个周期的长度，也就是一个周期的长度，如果这个周期可以被整除，就说明整个数组就是这个周期的循环。
if(next[next.length-1]!==-1&&s.length%(s.length-(next[next.length-1]+1))===0)return true
return false
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 151. 翻转字符串里的单词
给你一个字符串 s ，逐个翻转字符串中的所有 单词 。

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

请你返回一个翻转 s 中单词顺序并用单个空格相连的字符串。

说明：
```
输入字符串 s 可以在前面、后面或者单词间包含多余的空格。
翻转后单词间应当仅用一个空格分隔。
翻转后的字符串中不应包含额外的空格。
``` 

示例 1：
```
输入：s = "the sky is blue"
输出："blue is sky the"
```
示例 2：
```
输入：s = "  hello world  "
输出："world hello"
解释：输入字符串可以在前面或者后面包含多余的空格，但是翻转后的字符不能包括。
```
示例 3：
```
输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，将翻转后单词间的空格减少到只含一个。
```
示例 4：
```
输入：s = "  Bob    Loves  Alice   "
输出："Alice Loves Bob"
```
示例 5：
```
输入：s = "Alice does not even like bob"
输出："bob like even not does Alice"
``` 

提示：
```
1 <= s.length <= 104
s 包含英文大小写字母、数字和空格 ' '
s 中 至少存在一个 单词
``` 

进阶：
```
请尝试使用 O(1) 额外空间复杂度的原地解法。
```

> tip:2021-11-29

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    /**
     * 双指针求解
     * 1. 去除多余空格
     * 2. 翻转字符串
     * 3. 翻转单词
     */
    let arr = s.split('')
    // len = arr.length
    removeSpace(arr)
    // tip 不能使用 len，会缓存
    reverse(arr, 0, arr.length - 1)
    let start = 0
    for (let i = 0; i <= arr.length; i++) {
        // 是否是单词的标识,空格前后是单词
        if (arr[i] === " " || i === arr.length) {
            // 翻转长度的末尾是当前索引长度减一
            reverse(arr, start, i - 1)
            start = i + 1
        }
    }
    return arr.join('')
};
var reverse = function (arr, start, end) {
    let left = start
    let right = end
    while (left < right) {
        // [0,1]=[1,0]
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }
}
var removeSpace = function (arr) {
    let slow = 0,
        fast = 0,
        len = arr.length
    while (fast < len) {
        // 1.当前为空，并且前面值为空
        // 2.当前为空，并且是第一个值
        if (arr[fast] === ' ' && (fast === 0 || arr[fast - 1] === ' ')) {
            // 越过当前值
            fast++
        } else {
            // 赋值，往后走
            arr[slow] = arr[fast]
            slow++
            fast++
        }
    }
    // 慢指针判断末尾空格 慢指针是有效数值
    arr.length = arr[slow - 1] === ' ' ? slow - 1 : slow
}
console.log(reverseWords("  like bob"))
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-words-in-a-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 剑指Offer58-II.左旋转字符串
```js
// 题目：剑指Offer58-II.左旋转字符串


// 力扣题目链接(opens new window)
// 字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。
// 示例 1：
// 输入: s = "abcdefg", k = 2
// 输出: "cdefgab"
// 示例 2：
// 输入: s = "lrloseumgh", k = 6
// 输出: "umghlrlose"
// 限制：
// 1 <= k < s.length <= 10000
varreverseLeftWords = function (s, n) {
    // /**
    //  * 使用额外的空间
    //  */
    // let leftStr = s.slice(0, n),
    //     rightStr = s.slice(n)
    // return rightStr + leftStr
    /**
     *  不适用额外空间
     */
    constlen = s.length
    leti = 0
    // 循环i 小于 需要左移的长度
    while (i < len - n) {
        // 拼接字符串
        s = s[len - 1] + s
        i++
    }
    returns.slice(0, len)
};
console.log(reverseLeftWords("abcdefg", 2))
```


[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 总结
> 什么是字符串

字符串是若干字符组成的有限序列，也可以理解为是一个字符数组

> 要不要使用库函数
在文章344.反转字符串(opens new window)中强调了打基础的时候，不要太迷恋于库函数。

甚至一些同学习惯于调用substr，split，reverse之类的库函数，却不知道其实现原理，也不知道其时间复杂度，这样实现出来的代码，如果在面试现场，面试官问：“分析其时间复杂度”的话，一定会一脸懵逼！

所以建议如果题目关键的部分直接用库函数就可以解决，建议不要使用库函数。

如果库函数仅仅是 解题过程中的一小部分，并且你已经很清楚这个库函数的内部实现原理的话，可以考虑使用库函数。

> 双指针法

在344.反转字符串(opens new window)，我们使用双指针法实现了反转字符串的操作，双指针法在数组，链表和字符串中很常用。

接着在字符串：替换空格(opens new window)，同样还是使用双指针法在时间复杂度$O(n)$的情况下完成替换空格。

其实很多数组填充类的问题，都可以先预先给数组扩容带填充后的大小，然后在从后向前进行操作。

那么针对数组删除操作的问题，其实在27. 移除元素(opens new window)中就已经提到了使用双指针法进行移除操作。

同样的道理在151.翻转字符串里的单词(opens new window)中我们使用$O(n)$的时间复杂度，完成了删除冗余空格。

一些同学会使用for循环里调用库函数erase来移除元素，这其实是$O(n^2)$的操作，因为erase就是$O(n)$的操作，所以这也是典型的不知道库函数的时间复杂度，上来就用的案例了。

> 反转系列
在反转上还可以在加一些玩法，其实考察的是对代码的掌控能力。

541. 反转字符串II(opens new window)中，一些同学可能为了处理逻辑：每隔2k个字符的前k的字符，写了一堆逻辑代码或者再搞一个计数器，来统计2k，再统计前k个字符。

其实当需要固定规律一段一段去处理字符串的时候，要想想在在for循环的表达式上做做文章。

只要让 i += (2 * k)，i 每次移动 2 * k 就可以了，然后判断是否需要有反转的区间。

因为要找的也就是每2 * k 区间的起点，这样写程序会高效很多。

在151.翻转字符串里的单词(opens new window)中要求翻转字符串里的单词，这道题目可以说是综合考察了字符串的多种操作。是考察字符串的好题。

这道题目通过 先整体反转再局部反转，实现了反转字符串里的单词。

后来发现反转字符串还有一个牛逼的用处，就是达到左旋的效果。

在字符串：反转个字符串还有这个用处？(opens new window)中，我们通过先局部反转再整体反转达到了左旋的效果。

> KMP
KMP的主要思想是当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配了。

KMP的精髓所在就是前缀表，在KMP精讲(opens new window)中提到了，什么是KMP，什么是前缀表，以及为什么要用前缀表。

前缀表：起始位置到下标i之前（包括i）的子串中，有多大长度的相同前缀后缀。

那么使用KMP可以解决两类经典问题：
1. 匹配问题：28. 实现 strStr()(opens new window)
2. 重复子串问题：459.重复的子字符串(opens new window)

再一次强调了什么是前缀，什么是后缀，什么又是最长相等前后缀。

前缀：指不包含最后一个字符的所有以第一个字符开头的连续子串。

后缀：指不包含第一个字符的所有以最后一个字符结尾的连续子串。

然后针对前缀表到底要不要减一，这其实是不同KMP实现的方式，我们在KMP精讲(opens new window)中针对之前两个问题，分别给出了两个不同版本的的KMP实现。

其中主要理解j=next[x]这一步最为关键！

字符串类类型的题目，往往想法比较简单，但是实现起来并不容易，复杂的字符串题目非常考验对代码的掌控能力。
双指针法是字符串处理的常客。

KMP算法是字符串查找最重要的算法，但彻底理解KMP并不容易，我们已经写了五篇KMP的文章，不断总结和完善，最终才把KMP讲清楚。

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 全排列
从n个不同元素中任取m（m≤n）个元素，按照一定的顺序排列起来，叫做从n个不同元素中取出m个元素的一个排列。当m=n时所有的排列情况叫全排列。
公式：全排列数f(n)=n!(定义0!=1)
#### 46. 全排列
给定一个没有重复数字的序列，返回其所有可能的全排列。

示例:
```

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```
```js
/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// remaining:剩下的
var permute = function (nums) {
    let res = []
    let permutations = (current, remaining) => {
        if (remaining.length <= 0) res.push(current.slice())
        else {
            for (let i = 0; i < remaining.length; i++) {
                current.push(remaining[i])
                permutations(current.slice(), remaining.slice(0, i).concat(remaining.slice(i + 1)))
                current.pop()
            }
        }
    }
    permutations([], nums)
    return res
};
```
<pre>
✔ Accepted
  ✔ 25/25 cases passed (96 ms)
  ✔ Your runtime beats 90.73 % of javascript submissions
  ✔ Your memory usage beats 24.34 % of javascript submissions (37.3 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 二进制索引树
树状数组是一个优美小巧的数据结构，在很多时候可以代替线段树。一句话概括就是，凡是树状数组可以解决的问题，线段树都可以解决，反过来线段树可以解决的问题，树状数组不一定能解决。

树状数组英文名称为Binary Index Tree，直译过来就是二进制索引树，我觉得二进制索引树更能说明其本质。树状数组的本质就是一种通过二进制位来维护一个序列前i和的数据结构。

对于维护的序列A，定义C[i]=A[j+1]+...+A[i]，其中j为i的二进制表示中把最右边的1换成0的值。j的值可以通过lowbit求出，即i-lowbit(i)。

lowbit(a)为2^(a的二进制表示末尾0的个数)。
### 几何
几何，就是研究空间结构及性质的一门学科。它是数学中最基本的研究内容之一，与分析、代数等等具有同样重要的地位，并且关系极为密切。几何学发展历史悠长，内容丰富。它和代数、分析、数论等等关系极其密切。几何思想是数学中最重要的一类思想。暂时的数学各分支发展都有几何化趋向，即用几何观点及思想方法去探讨各数学理论。常见定理有勾股定理，欧拉定理，斯图尔特定理等。
### 图表
### 数学
#### 7. 整数反转
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
示例 1:
```
输入: 123
输出: 321
```
 示例 2:
```
输入: -123
输出: -321
```
示例 3:
```
输入: 120
输出: 21
```
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

如果行数等于1或者字符串长度小于行数，那就返回字符串


申明行数、变换、翻转、计数


遍历行数，为每一行申明一个数组

遍历字符串

每一行塞进字符串值

翻转是真的,则计数自增，否则自减

如果计数等于行数-1或者计数等于0，则翻转真假替换

reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
<pre> 
/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */
/**
 * @param {number} x
 * @return {number}
 */
// 在JavaScript中模拟溢出真的有意义吗?JS中没有int。Number类型是浮点类型。如果必须模拟溢出，“整数”单元格大小应该定义为任务中的某个值，例如双单词。
var reverse = function (x) {
    if (x > 0) {
        let arr = x.split('')
        arr.reverse()
        let str = arr.join('')
        return str
    } else {
        let arr = x.replace('-', '').split('')
        arr.reverse()
        let str = arr.join('')
        return '-' + str
    }
};


</pre> 
   
[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 9. 回文数
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
示例 1:
```
输入: 121
输出: true
```
示例 2:
```
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```
示例 3:
```
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```
进阶:
你能不将整数转为字符串来解决这个问题吗？
初级版：
1. 将整数转化为字符串
2. 将字符串分割成数组
3. 将数组反转
4. 将数组变为字符串
5. 比较前后字符串
进阶版：
Math.pow(10, i)：返回10的i次幂
1. 小于0和10的先判断
2. length是整数长度
3. isLengthOdd整数长度是否为奇数
4. halfIndex是整数长度除于二
5. maxIndex是整数的长度减一
6. calcX是整数截取后还剩的部分
7. currentNum从头取
8. result是正确的回文数
9.  result和x比对

<pre> 
/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let str = x.toString().split('').reverse().join('')

    if (x.toString() === str) {
        return true
    } else {
        return false
    }
};
</pre> 
<pre>
var isPalindrome = function(x) {
    if (x < 0) return false
    if (x < 10) return true
    let result = 0
    
    for (let i = 2; i <= 15; i++) {
        if (x < Math.pow(10, i)) {
            const length = i
            const isLengthOdd = length % 2 !== 0
            const maxIndex = length - 1
            const halfIndex = Math.floor(length / 2)
            let calcX = x
            
            for (let j = maxIndex; j >= halfIndex; j--) {
                const edge = Math.pow(10, j)
                if (calcX < edge) continue  // e.g. 101, '0' no need calculate
                
                const currentNum = parseInt(calcX / edge)
                
                if (j === halfIndex && isLengthOdd) {
                   result += currentNum * edge
                } else {
                   result += currentNum * edge + currentNum * Math.pow(10, length - 1 - j) 
                }
                
                calcX = calcX - currentNum * edge
            }
            
            break
        }
    }
    
    return result === x
};

// 99  length = 2，max = 1, half = 1, first loop edge = 10,  first loop currentNum = parseInt(99 / 10) = 9
// 99 = 9 * 10 ** 1 + 9 * 10 ** 0

// 121 length = 3，isLengthOdd = true, max = 2, half = 1, first loop edge = 100, first loop currentNum = parseInt(121 / 100) = 1
// 121 = 1 * 10 ** 2 + 1 * 10 ** 0 + 2 * 10 ** 1
</pre>
  
[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 12. 整数转罗马数字
罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

- I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
- X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
- C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

示例 1:
```
输入: 3
输出: "III"
```
示例 2:
```
输入: 4
输出: "IV"
```
示例 3:
```
输入: 9
输出: "IX"
```
示例 4:
```
输入: 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
```
示例 5:
```
输入: 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

整数转罗马数字，千万不要一个个if/else去判断，要学聪明。

1. 将关键节点列出来，分别是整数数组和罗马数组，做到一一映射

2. 申明一个初始值等于num的值res

3. 全局监听res的变化，如果res！==0，那就继续循环

4. 申明valRoman值，这是一个最终结果值

5. 遍历整数数组，如果res大于当前整数组，那就将valRoman添加进罗马数组中的对应值，相应的res要减去对应整数值
<pre> 
/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */
/**
 * @param {number} num
 * @return {string}
 */

var intToRoman = function (num) {
    var arrRoman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    var arrInt = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    var res = num
    var valRoman = ''
    while (res !== 0) {
        for (let i = 0; i < arrInt.length; i++) {
            if (res >= arrInt[i]) {
                valRoman += arrRoman[i]
                res -= arrInt[i]
                break
            }
        }
    }
    return valRoman
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 13. 罗马数字转整数
罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

- I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
- X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
- C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

示例 1:
```
输入: "III"
输出: 3
```
示例 2:
```
输入: "IV"
输出: 4
```
示例 3:
```
输入: "IX"
输出: 9
```
示例 4:
```
输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
```
示例 5:
```
输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```
罗马数字转整数还是很简单的
1. 将s遍历，去跟罗马数字匹配，找到对应的索引
2. 将索引对应的整数相加
3. 但是要减去多加的部分，根据规律发现：只要前者比后者小，那就是多加的，而且还要减去2倍

<pre> 
/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    var arrRoman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    var arrInt = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    var res = 0
    var arrRes = []
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < arrRoman.length; j++) {
            if (s[i] === arrRoman[j]) {
                res += arrInt[j]
                arrRes.push(arrInt[j])
            }
        }
    }
    for (let i = 0; i < arrRes.length; i++) {
        if (arrRes[i] < arrRes[i + 1]) {
            res -= 2 * arrRes[i]
        }
    }
    return res
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 29. 两数相除
给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

示例 1:
```
输入: dividend = 10, divisor = 3
输出: 3
```
示例 2:
```
输入: dividend = 7, divisor = -3
输出: -2
```
说明:

被除数和除数均为 32 位有符号整数。
除数不为 0。
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。

方法一:

最蠢的方法,也就是用上除法运算符了,但是能解决问题,判断除数和被除数的正负,对其做绝对值,然后就是除法,最后考虑边界

方法二:

左移运算符（<<）

表示将一个数的二进制值向左移动指定的位数，尾部补0，即乘以2的指定次方（最高位即符号位不参与移动）。

右移运算符（>>）

表示将一个数的二进制值向右移动指定的位数，头部补0，即除以2的指定次方（最高位即符号位不参与移动）。
<pre> 
方法一:

/*
 * @lc app=leetcode.cn id=29 lang=javascript
 *
 * [29] 两数相除
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    let res = ''
    if (divisor < 0 && dividend > 0) {
        divisor = -divisor
        res = -(Math.floor(dividend / divisor))
        if (res <= -2147483648) {
            return -2147483648
        }
        if (res >= 2147483647) {
            return 2147483647
        }
        return res
    }
    if (divisor > 0 && dividend < 0) {
        dividend = -dividend
        res = -(Math.floor(dividend / divisor))
        if (res <= -2147483648) {
            return -2147483648
        }
        if (res >= 2147483647) {
            return 2147483647
        }
        return res
    }
    if (divisor < 0 && dividend < 0) {
        divisor = -divisor
        dividend = -dividend
        res = Math.floor(dividend / divisor)
        if (res <= -2147483648) {
            return -2147483648
        }
        if (res >= 2147483647) {
            return 2147483647
        }
        return res
    }

    res = Math.floor(dividend / divisor)

    if (res <= -2147483648) {
        return -2147483648
    }
    if (res >= 2147483647) {
        return 2147483647
    }

    return res
};

方法二:
/*
 * @lc app=leetcode.cn id=29 lang=javascript
 *
 * [29] 两数相除
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    if (divisor === 0) return 0;
    if (dividend === 0) return 0;
    if (dividend === -2147483648 && divisor === -1) return 2147483647;

    var isPositive = true;
    if (dividend > 0 !== divisor > 0) isPositive = false;

    divisor = Math.abs(divisor);
    dividend = Math.abs(dividend);

    var count = 1,
        result = 0,
        base = divisor;

    while (dividend >= divisor) {
        count = 1;
        base = divisor;
        while (base <= (dividend >> 1)) {
            base = base << 1;
            count = count << 1;
        }
        result += count;
        dividend -= base;
    }

    if (!isPositive) result = -result;
    return result;
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 67. 二进制求和
给定两个二进制字符串，返回他们的和（用二进制表示）。
输入为非空字符串且只包含数字 1 和 0。
示例 1:
```
输入: a = "11", b = "1"
输出: "100"
```
示例 2:
```
输入: a = "1010", b = "1011"
输出: "10101"
```
<pre> 
/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    // 精度不够
    // 1. 
    let suma = 0,
        sumb = 0,
        sum = 0
    for (let i = a.length - 1; i >= 0; i--) {
        suma += a[i] * Math.pow(2, a.length - 1 - i)
    }
    for (let i = b.length - 1; i >= 0; i--) {
        sumb += b[i] * Math.pow(2, b.length - 1 - i)
    }
    sum = suma + sumb
    console.log(sum)

    return sum.toString(2)

    // 2.
    suma = parseInt(a, 2)
    sumb = parseInt(b, 2)
    sum = suma + sumb
    return sum.toString(2)

};
console.log(addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101", "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"))
</pre> 
提供的API当数字过大时，精度出错
正确方法：
前提:字符串必须转化为数字
1. 将a和b都倒置
2. 取出两者中的最长长度
3. 申明一个空数组
4. 循环最长长度,当前a和b和res之和等于一个当前值
5. 如果当前值大于等于2,取模,该位置清0,res最后塞进1,否则res当前位置上的值就等于当前值
6. 跳出循环,返回倒置之后的2进制数

<pre>
/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    a = a.split('').reverse().join('')
    b = b.split('').reverse().join('')
    let length = a.length > b.length ? a.length : b.length
    let res = []
    for (let i = 0; i < length; i++) {
        numa = Number(a[i] || 0)
        numb = Number(b[i] || 0)

        let current = Number(res[i] || 0) + numa + numb
        if (current >= 2) {
            res[i] = current % 2
            res.push(1)
        } else {
            res[i] = current
        }
    }
    return res.reverse().join('')
};
</pre>
<pre>
✔ Accepted
  ✔ 294/294 cases passed (104 ms)
  ✔ Your runtime beats 48.91 % of javascript submissions
  ✔ Your memory usage beats 50.21 % of javascript submissions (35.7 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### 69. x 的平方根
> 新的版本 2022-1-4

```js
/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] Sqrt(x)
 */
// @lc code=start
/**
 * @param{number}x
 * @return{number}
 */
varmySqrt = function (x) {
    /**
     * 二分法求解（左闭右闭区间）
     */
    let left = 0,
        right = x
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2)
        letji = mid * mid
        // 积大的情况下
        if (ji > x) {
            right = mid - 1
        } elseif (ji < x) {
            // 积小的情况下
            left = mid + 1
        } else {
            return mid
        }
    }
    // 查找无果返回最大值
    return right
};
// @lc code=end
console.log(mySqrt(8))
```

> 旧的版本
实现 int sqrt(int x) 函数。
计算并返回 x 的平方根，其中 x 是非负整数。
由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
示例 1:
```
输入: 4
输出: 2
```
示例 2:
```
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
```
耗时太长,千万不要这要弄
```js
/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    x=Number(x)
    if (x === 0) {
        return 0
    }
    Array.prototype.max = function () {
        return Math.max.apply({}, this)
    }
    let minArr = []
    for (let i = 0; i <= x; i++) {
        let s = i*i
        if (s === x) {
            return i
        } else if (s < x) {
            minArr.push(i)
        }
    }
    return minArr.max()

};
console.log(mySqrt('1978959248'))
```

采用二分法才是王道
1.  定义两个边界left和right,right就是x的一半加一,结果值为mid
2.  左边小于右边一直循环
3.  mid等于left和right的一半
4.  如果mid的平方大于x,那么right等于mid减一
5.  如果小于x,那么left加一
6.  否则,结果就是mid值
7.  如果循环结束没有匹配到,那结果就是right值

```js
/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    x = Number(x)
    let left = 1,
        right = Math.floor((x / 2)) + 1,
        mid = 0
    while (left <= right) {
        mid = Math.floor((left + right) / 2)

        if (mid * mid > x) {
            right = mid - 1
        } else if (mid * mid < x) {
            left += 1
        } else {
            return mid
        }
    }
    return right
};
```

<pre>
✔ Accepted
  ✔ 1017/1017 cases passed (240 ms)
  ✔ Your runtime beats 5.25 % of javascript submissions
  ✔ Your memory usage beats 32.03 % of javascript submissions (35.7 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

#### 367. 有效的完全平方数
```js
/*
 * @lc app=leetcode.cn id=367 lang=javascript
 *
 * [367] 有效的完全平方数
 */
// @lc code=start
/**
 * @param{number}num
 * @return{boolean}
 */
varisPerfectSquare = function (num) {
    /**
     * 二分法求解（左闭右闭区间）
     */
    let [left, right] = [0, num]
    while (left <= right) {
        letmid = left + Math.floor((right - left) / 2)
        letji = mid * mid
        if (ji === num) {
            returntrue
        } elseif (ji > num) {
            // 积太大，mid要变小
            right = mid - 1
        } else {
            // 积太小，mid要变大
            left = mid + 1
        }
    }
    // 循环后找不到那就不是完全平方数
    returnfalse
};
// @lc code=end
console.log(isPerfectSquare(16))
```
### 线段树
线段树是一种二叉搜索树，与区间树相似，它将一个区间划分成一些单元区间，每个单元区间对应线段树中的一个叶结点。
使用线段树可以快速的查找某一个节点在若干条线段中出现的次数，时间复杂度为O(logN)。而未优化的空间复杂度为2N，实际应用时一般还要开4N的数组以免越界，因此有时需要离散化让空间压缩。
### 前缀树
又称单词查找树，Trie树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。
